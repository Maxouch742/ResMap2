function affichFiabLocPlani(xml, pts, visee = false, matricule_station = false){

    // Create source
    const planiFiabLocDir_source = new ol.source.Vector({});
    const planiFiabLocDis_source = new ol.source.Vector({});
    const planiFiabLocCoordE_source = new ol.source.Vector({});
    const planiFiabLocCoordN_source = new ol.source.Vector({});
    const planiFiabLocGNSS_source = new ol.source.Vector({});
    let planiGNSS_sessionID = 1;
    const list_radius = [0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40];
    
    // Elements du fichier HTML
    const planiAbriss = xml.getElementsByTagName('planimetricAbriss')[0];
    const stations = planiAbriss.getElementsByTagName('station');

    // Parcours de la liste des observations
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');

        switch(sta_type){
            case 'gpsSession':
                // Display checkbox
                htmlAddCheckboxFiabilitePlani('gnss');
                
                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const pt_name = targets[j].getAttribute('name');

                    const obs = targets[j].getElementsByTagName('obs');
                    if (obs.length === 2){

                        const obs1 = obs[0];
                        if (obs1.getAttribute('obsNr') != ''){
                            const obs1_zi = parseFloat(obs1.getAttribute('zi'));
                            const [colorFiab, widthFiab] = getParameterFeature_zi(obs1_zi);
                            
                            if(pts.has(pt_name)){
                                if (visee === false || (visee !== false && pt_name === visee)){

                                    const planiFiabLoc_feature = new ol.Feature({ 
                                        geometry: new ol.geom.Point([ 
                                            pts.get(pt_name)['east'], 
                                            pts.get(pt_name)['north'] 
                                        ]),
                                        station: pt_name,
                                        visee: pt_name
                                    });
                                    const planiFiabLoc_style = new ol.style.Style({
                                        image: new ol.style.Icon({
                                            src: './img/hexagon_half1_svgrepo-com.png',
                                            scale: list_radius[planiGNSS_sessionID]/2,
                                            color: colorFiab,
                                        }),
                                    });
                                    planiFiabLoc_feature.setStyle(planiFiabLoc_style);
                                    planiFiabLocGNSS_source.addFeature(planiFiabLoc_feature);
                                };
                            };
                        };

                        const obs2 = obs[1];
                        if (obs2.getAttribute('obsNr') != ''){
                            const obs2_zi = parseFloat(obs2.getAttribute('zi'));
                            const [colorFiab, widthFiab] = getParameterFeature_zi(obs2_zi);

                            if (pts.has(pt_name)){
                                if (visee === false || (visee !== false && pt_name === visee)){
                                    const planiFiabLoc_feature = new ol.Feature({ 
                                        geometry: new ol.geom.Point([ 
                                            pts.get(pt_name)['east'], 
                                            pts.get(pt_name)['north'] 
                                        ]),
                                        station: pt_name,
                                        visee: pt_name
                                    });
                                    const planiFiabLoc_style = new ol.style.Style({
                                        image: new ol.style.Icon({
                                            src: './img/hexagon_half2_svgrepo-com.png',
                                            scale: list_radius[planiGNSS_sessionID]/2,
                                            color: colorFiab,
                                        }),
                                    });
                                    planiFiabLoc_feature.setStyle(planiFiabLoc_style);
                                    planiFiabLocGNSS_source.addFeature(planiFiabLoc_feature);
                                };
                            };
                        };
                    }
                    // TODO : traiter les cas où il y a une seule coordonnée
                };
                planiGNSS_sessionID++ ;
                break;

            case 'direction':

                // Display checkbox
                htmlAddCheckboxFiabilitePlani('direction');

                // Station
                const sta_name = station.getAttribute('name');

                // Lister les observations
                const list_obsDir = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDir.length; j++){
                    const pt_name = list_obsDir[j].getAttribute('target');
                    const pt_obsNr = list_obsDir[j].getAttribute('obsNr');
                    const pt_zi = parseFloat(list_obsDir[j].getAttribute('zi'));
                    
                    if (pt_obsNr != ""){
                        const [colorFiab, widthFiab, zIndexFiab] = getParameterFeature_zi(pt_zi);

                        if (pts.has(sta_name) && pts.has(pt_name)){

                            if ((visee === false && matricule_station === false) || 
                                (visee !== false && matricule_station === false && visee === pt_name) ||
                                (visee === false && matricule_station !== false && matricule_station === sta_name)){
                                // Feature line
                                const planiDir_feature = new ol.Feature({
                                    geometry: new ol.geom.LineString([ 
                                        [ pts.get(sta_name)['east'], pts.get(sta_name)['north'] ], 
                                        [ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ] 
                                    ]),
                                    station: sta_name,
                                    visee: pt_name
                                });
                                planiDir_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: colorFiab,
                                        width: widthFiab
                                    })
                                }));
                                planiFiabLocDir_source.addFeature(planiDir_feature);

                                // Feature symbole
                                const east_symbol = pts.get(sta_name)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name)['east'])*0.1;
                                const north_symbol = pts.get(sta_name)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name)['north'])*0.1;
                                const gis = gisement(pts.get(sta_name)['east']-east_symbol, pts.get(sta_name)['north']-north_symbol);              

                                const planiDir_featureSymbol = new ol.Feature({
                                    geometry: new ol.geom.Point([ 
                                        east_symbol, 
                                        north_symbol
                                    ]),
                                    station: sta_name,
                                    visee: pt_name
                                });
                                planiDir_featureSymbol.setStyle( new ol.style.Style({
                                    image: new ol.style.Icon({
                                        src: './img/triangle-svgrepo-com.png',
                                        scale:'0.05',
                                        color: colorFiab,
                                        rotation: gis
                                    })
                                }));
                                planiFiabLocDir_source.addFeature(planiDir_featureSymbol);
                            };
                        };
                    };
                };
                break;

            case 'distance':

                // display checkbox
                htmlAddCheckboxFiabilitePlani('distance');

                // list stations
                const station_name = station.getAttribute('name');
                const list_ObsDis = station.getElementsByTagName('obs');
                for (let j=0; j<list_ObsDis.length; j++){
                    const obs = list_ObsDis[j];
                    const obs_name = obs.getAttribute('target');
                    const obs_Nr = obs.getAttribute('obsNr');

                    if (obs_Nr != ""){

                        const obs_zi = parseFloat(obs.getAttribute('zi'));
                        const [colorFiab, widthFiab] = getParameterFeature_zi(obs_zi);

                        if (pts.has(station_name) && pts.has(obs_name)){

                            if ((visee === false && matricule_station === false) || 
                                (visee !== false && matricule_station === false && obs_name === visee) ||
                                (visee === false && matricule_station !== false && matricule_station === station_name)){
                                const planiDis_feature = new ol.Feature({
                                    geometry: new ol.geom.LineString([
                                        [ pts.get(station_name)['east'], pts.get(station_name)['north'] ],
                                        [ pts.get(obs_name)['east'], pts.get(obs_name)['north'] ] 
                                    ]),
                                    station: station_name,
                                    visee: obs_name
                                });
                                planiDis_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: colorFiab,
                                        width: widthFiab,
                                    })
                                }));
                                planiFiabLocDis_source.addFeature(planiDis_feature);
                                
                                // Feature symbol
                                const east_symbol1 = pts.get(station_name)['east'] + (pts.get(obs_name)['east'] - pts.get(station_name)['east'])*0.12;
                                const north_symbol1 = pts.get(station_name)['north'] + (pts.get(obs_name)['north'] - pts.get(station_name)['north'])*0.12;
                                const east_symbol2 = pts.get(station_name)['east'] + (pts.get(obs_name)['east'] - pts.get(station_name)['east'])*0.22;
                                const north_symbol2 = pts.get(station_name)['north'] + (pts.get(obs_name)['north'] - pts.get(station_name)['north'])*0.22;
                                const planiDis_featureSymbol = new ol.Feature({
                                    geometry: new ol.geom.LineString([
                                        [east_symbol1, north_symbol1],
                                        [east_symbol2, north_symbol2]
                                    ]),
                                    station: station_name,
                                    visee: obs_name
                                });
                                planiDis_featureSymbol.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: colorFiab,
                                        width: widthFiab+6,
                                        lineCap: 'square'
                                    })
                                }));
                                planiFiabLocDis_source.addFeature(planiDis_featureSymbol);
                            }
                        }
                    }
                };
                break;
            
            case 'coordinate':
                // Display checkbox
                htmlAddCheckboxFiabilitePlani('coord_E');
                htmlAddCheckboxFiabilitePlani('coord_N');

                // List "targets"
                const targets_coordPlani = station.getElementsByTagName('target');
                for (let j=0; j<targets_coordPlani.length; j++){
                    
                    const point_name = targets_coordPlani[j].getAttribute('name');
                    const obs = targets_coordPlani[j].getElementsByTagName('obs');

                    if (obs.length === 2){

                        const obs1 = obs[0];
                        if (obs1.getAttribute('obsNr') != ''){
                            const obs1_zi = parseFloat(obs1.getAttribute('zi'));
                            const [colorFiab, widthFiab] = getParameterFeature_zi(obs1_zi);

                            if (pts.has(point_name)){

                                if ((visee === false && matricule_station === false) || 
                                    (visee !== false && matricule_station === false && visee === point_name) ||
                                    (visee === false && matricule_station !== false && matricule_station === point_name)){
                            
                                    const planiFiabLoc_CoordE_feature = new ol.Feature({ 
                                        geometry: new ol.geom.Point([ 
                                            pts.get(point_name)['east'], 
                                            pts.get(point_name)['north'] 
                                        ]),
                                        station: point_name,
                                        visee: point_name,
                                    });
                                    const planiFiabLoc_CoordE_style = new ol.style.Style({
                                        image: new ol.style.Icon({
                                            src: './img/Est.svg',
                                            scale: String(0.02*widthFiab),
                                            color: String(colorFiab),
                                        }),
                                        text: new ol.style.Text({
                                            text: point_name,
                                            textAlign: "center",
                                            textBaseline: "middle",
                                            font: "italic 15px Calibri",
                                            fill: new ol.style.Fill({
                                                color: String(colorFiab)
                                            }),
                                            stroke: new ol.style.Stroke({
                                                color: '#000', 
                                                width: 3
                                            }),
                                            offsetX: 10,
                                            offsetY: -10,
                                            rotation: 0,
                                            placement: "point"
                                        })
                                    });
                                    planiFiabLoc_CoordE_feature.setStyle(planiFiabLoc_CoordE_style);
                                    planiFiabLocCoordE_source.addFeature(planiFiabLoc_CoordE_feature);
                                };
                            };
                        };


                        const obs2 = obs[1];
                        if (obs2.getAttribute('obsNr') != ''){
                            const obs2_zi = parseFloat(obs1.getAttribute('zi'));
                            const [colorFiab, widthFiab] = getParameterFeature_zi(obs2_zi);
                            
                            if (pts.has(point_name)){
                                
                                if ((visee === false && matricule_station === false) || 
                                    (visee !== false && matricule_station === false && visee === point_name) ||
                                    (visee === false && matricule_station !== false && matricule_station === point_name)){

                                    const planiFiabLoc_CoordN_feature = new ol.Feature({ 
                                        geometry: new ol.geom.Point([ 
                                            pts.get(point_name)['east'], 
                                            pts.get(point_name)['north'] 
                                        ]),
                                        station: point_name,
                                        visee: point_name
                                    });
                                    const planiFiabLoc_CoordN_style = new ol.style.Style({
                                        image: new ol.style.Icon({
                                            src: './img/Nord.svg',
                                            scale: String(0.02*widthFiab),
                                            color: String(colorFiab),
                                        }),
                                        text: new ol.style.Text({
                                            text: point_name,
                                            textAlign: "center",
                                            textBaseline: "middle",
                                            font: "italic 15px Calibri",
                                            fill: new ol.style.Fill({
                                                color: String(colorFiab)
                                            }),
                                            stroke: new ol.style.Stroke({
                                                color: '#000', 
                                                width: 3
                                            }),
                                            offsetX: 10,
                                            offsetY: 10,
                                            rotation: 0,
                                            placement: "point"
                                        })
                                    });
                                    planiFiabLoc_CoordN_feature.setStyle(planiFiabLoc_CoordN_style);
                                    planiFiabLocCoordN_source.addFeature(planiFiabLoc_CoordN_feature);
                                };
                            };
                        };
                    }
                }
            
        }
    }

    // Add to map
    if (planiFiabLocGNSS_source.getFeatures().length >= 1){
        planiFiabLocGNSS_layer.setSource(planiFiabLocGNSS_source);
        changeLayerVisibility('plani_fiabLoc_GNSS');
    };

    if (planiFiabLocDir_source.getFeatures().length >= 1){
        planiFiabLocDir_layer.setSource(planiFiabLocDir_source);
        changeLayerVisibility('plani_fiabLoc_dir');
    };

    if (planiFiabLocDis_source.getFeatures().length >= 1){
        planiFiabLocDis_layer.setSource(planiFiabLocDis_source);
        changeLayerVisibility('plani_fiabLoc_dis');
    };

    if (planiFiabLocCoordE_source.getFeatures().length >= 1){
        planiFiabLocCoordE_layer.setSource(planiFiabLocCoordE_source);
        changeLayerVisibility('plani_fiabLoc_coordE');
    };

    if (planiFiabLocCoordN_source.getFeatures().length >= 1){
        planiFiabLocCoordN_layer.setSource(planiFiabLocCoordN_source);
        changeLayerVisibility('plani_fiabLoc_coordN');
    }
};
