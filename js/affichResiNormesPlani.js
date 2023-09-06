function affichResiNormesPlani(xml, pts){

    // Elements du fichier HTML
    const planiAbriss = xml.getElementsByTagName('planimetricAbriss')[0];
    const stations = planiAbriss.getElementsByTagName('station');


    // Récupération des balises avec la limite du wi par l'utilisateur lors du calcul LTOP
    let biggestWi = planiAbriss.getElementsByTagName("biggestWi");
    let limitWi = parseFloat(biggestWi[0].getAttribute("biggerThan"));
    let limitInf = limitWi - 0.2; // pour paliers

    // Display legend
    document.getElementById("palierPlaniWi1").innerText = `- ${limitWi} à ∞`;
    document.getElementById("palierPlaniWi2").innerText = `- ${limitInf} à ${limitWi}`;
    document.getElementById("palierPlaniWi3").innerText = `- 0.0 à ${limitInf}`;

    // Create source
    const planiResiDir_source = new ol.source.Vector({});
    const planiResiDis_source = new ol.source.Vector({});
    const planiResiCoordE_source = new ol.source.Vector({});
    const planiResiCoordN_source = new ol.source.Vector({})
    const planiResiGNSS_source = new ol.source.Vector({});
    let planiGNSS_sessionID = 1;
    const list_radius = [0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40];
    
    // Parcours de la liste des observations
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');

        switch(sta_type){
            case 'direction':
                // Display checkbox
                htmlAddCheckboxResiPlani('direction');

                // Station
                const sta_name = station.getAttribute('name');
                
                // Lister les observations
                const list_obsDir = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDir.length; j++){
                    const pt_name = list_obsDir[j].getAttribute('target');
                    const pt_obsNr = list_obsDir[j].getAttribute('obsNr');
                    if (pt_obsNr != ''){
                        const pt_wi = Math.abs(parseFloat(list_obsDir[j].getAttribute('wi')));
                        const [colorResi, widthResi] = getParameterFeature_wi(pt_wi, limitWi, limitInf);
                        
                        // Feature line
                        const planiDir_feature = new ol.Feature({
                            geometry: new ol.geom.LineString([ 
                                [ pts.get(sta_name)['east'], pts.get(sta_name)['north'] ], 
                                [ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ] 
                            ]),
                        });
                        planiDir_feature.setStyle( new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: colorResi,
                                width: widthResi,
                            }),
                        }));
                        planiResiDir_source.addFeature(planiDir_feature);

                        // Feature symbole
                        const east_symbol = pts.get(sta_name)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name)['east'])*0.1;
                        const north_symbol = pts.get(sta_name)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name)['north'])*0.1;
                        const gis = gisement(pts.get(sta_name)['east']-east_symbol, pts.get(sta_name)['north']-north_symbol);              

                        const planiDir_featureSymbol = new ol.Feature({
                            geometry: new ol.geom.Point([ 
                                east_symbol, 
                                north_symbol 
                            ]),
                        });
                        planiDir_featureSymbol.setStyle( new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-svgrepo-com.png',
                                scale:'0.05',
                                color: colorResi,
                                rotation: gis
                            }),
                        }));
                        planiResiDir_source.addFeature(planiDir_featureSymbol);
                    };
                };
                break;
            
            case 'distance':
                // display checkbox
                htmlAddCheckboxResiPlani('distance');

                // Station
                const station_name = station.getAttribute('name');
                
                // Lister les observations
                const list_obsDis = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDis.length; j++){
                    const obs_name = list_obsDis[j].getAttribute('target');
                    const obs_obsNr = list_obsDis[j].getAttribute('obsNr');
                    if (obs_obsNr != ''){
                        const obsDir_wi = Math.abs(parseFloat(list_obsDis[j].getAttribute('wi')));
                        const [colorResi2, widthResi2] = getParameterFeature_wi(obsDir_wi, limitWi, limitInf);
                        
                        // Feature line
                        const planiDis_feature = new ol.Feature({
                            geometry: new ol.geom.LineString([ 
                                [ pts.get(station_name)['east'], pts.get(station_name)['north'] ], 
                                [ pts.get(obs_name)['east'], pts.get(obs_name)['north'] ] 
                            ]),
                        });
                        planiDis_feature.setStyle( new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: colorResi2,
                                width: widthResi2
                            }),
                        }));
                        planiResiDis_source.addFeature(planiDis_feature);

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
                        });
                        planiDis_featureSymbol.setStyle( new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: colorResi2,
                                width: widthResi2+6,
                                lineCap: 'square'
                            }),
                        }));
                        planiResiDis_source.addFeature(planiDis_featureSymbol);
                    };
                };
                break;
            
            case 'gpsSession':
                // display checkbox 
                htmlAddCheckboxResiPlani('gnss');
                
                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const pt_name = targets[j].getAttribute('name');

                    const obs = targets[j].getElementsByTagName('obs');
                    if (obs.length === 2){

                        const obs1 = obs[0];
                        if (obs1.getAttribute('obsNr') != ''){
                            const obs1_wi = Math.abs(parseFloat(obs1.getAttribute('wi')));
                            const [colorFiab, widthFiab] = getParameterFeature_wi(obs1_wi, limitWi, limitInf);
                            
                            const planiResi1_feature = new ol.Feature({ 
                                geometry: new ol.geom.Point([ 
                                    pts.get(pt_name)['east'], 
                                    pts.get(pt_name)['north'] 
                                ]),
                            });
                            planiResi1_feature.setStyle( new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: './img/hexagon_half1_svgrepo-com.png',
                                    scale: list_radius[planiGNSS_sessionID]/2,
                                    color: colorFiab,
                                }),
                            }) );
                            planiResiGNSS_source.addFeature(planiResi1_feature);
                        };

                        const obs2 = obs[1];
                        if (obs2.getAttribute('obsNr') != ''){
                            const obs2_wi = Math.abs(parseFloat(obs2.getAttribute('wi')));
                            const [colorFiab, widthFiab] = getParameterFeature_wi(obs2_wi, limitWi, limitInf);
                            
                            const planiResi2_feature = new ol.Feature({ 
                                geometry: new ol.geom.Point([ 
                                    pts.get(pt_name)['east'], 
                                    pts.get(pt_name)['north'] 
                                ]),
                            });
                            planiResi2_feature.setStyle( new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: './img/hexagon_half2_svgrepo-com.png',
                                    scale: list_radius[planiGNSS_sessionID]/2,
                                    color: colorFiab,
                                }),
                            }) );
                            planiResiGNSS_source.addFeature(planiResi2_feature);
                        }
                    }
                };
                planiGNSS_sessionID++ ;
                break;

            case 'coordinate':
                
                // display checkbox
                htmlAddCheckboxResiPlani('coord_E');
                htmlAddCheckboxResiPlani('coord_N');

                // Display checkbox
                htmlAddCheckboxFiabilitePlani_CoordE();
                htmlAddCheckboxFiabilitePlani_CoordN();

                // List "targets"
                const targets_coordPlani = station.getElementsByTagName('target');
                for (let j=0; j<targets_coordPlani.length; j++){
                    
                    const point_name = targets_coordPlani[j].getAttribute('name');
                    const obs = targets_coordPlani[j].getElementsByTagName('obs');

                    if (obs.length === 2){

                        const obs1 = obs[0];
                        if (obs1.getAttribute('obsNr') != ''){
                            const obs1_wi = Math.abs(parseFloat(obs1.getAttribute('wi')));
                            const [colorFiab, widthFiab] = getParameterFeature_wi(obs1_wi, limitWi, limitInf);
                            
                            const planiResi_CoordE_feature = new ol.Feature({ 
                                geometry: new ol.geom.Point([ 
                                    pts.get(point_name)['east'], 
                                    pts.get(point_name)['north'] 
                                ]) 
                            });
                            const planiResi_CoordE_style = new ol.style.Style({
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
                                        color: '#fff', 
                                        width: 3
                                    }),
                                    offsetX: 20,
                                    offsetY: -20,
                                    rotation: 0,
                                    placement: "point"
                                })
                            });
                            planiResi_CoordE_feature.setStyle(planiResi_CoordE_style);
                            planiResiCoordE_source.addFeature(planiResi_CoordE_feature);
                        };


                        const obs2 = obs[1];
                        if (obs2.getAttribute('obsNr') != ''){
                            const obs2_wi = Math.abs(parseFloat(obs2.getAttribute('wi')));
                            const [colorFiab, widthFiab] = getParameterFeature_wi(obs2_wi, limitWi, limitInf);
                            
                            const planiResi_CoordN_feature = new ol.Feature({ 
                                geometry: new ol.geom.Point([ 
                                    pts.get(point_name)['east'], 
                                    pts.get(point_name)['north'] 
                                ]) 
                            });
                            const planiResi_CoordN_style = new ol.style.Style({
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
                                        color: '#fff', 
                                        width: 3
                                    }),
                                    offsetX: 20,
                                    offsetY: -20,
                                    rotation: 0,
                                    placement: "point"
                                })
                            });
                            planiResi_CoordN_feature.setStyle(planiResi_CoordN_style);
                            planiResiCoordN_source.addFeature(planiResi_CoordN_feature);
                        }
                    }
                }
        }
    };

    // Layers
    if (planiResiDir_source.getFeatures().length >= 1){
        planiResiDir_layer.setSource(planiResiDir_source);
        changeLayerVisibility('plani_resi_dir');
    };

    if (planiResiDis_source.getFeatures().length >= 1){
        planiResiDis_layer.setSource(planiResiDis_source);
        changeLayerVisibility('plani_resi_dis');
    };

    if (planiResiGNSS_source.getFeatures().length >= 1){
        planiResiGNSS_layer.setSource(planiResiGNSS_source);
        changeLayerVisibility('plani_resi_GNSS');
    };

    if (planiResiCoordE_source.getFeatures().length >= 1){
        planiResiCoordE_layer.setSource(planiResiCoordE_source);
        changeLayerVisibility('plani_resi_coordE');
    };

    if (planiResiCoordN_source.getFeatures().length >= 1){
        planiResiCoordN_layer.setSource(planiResiCoordN_source);
        changeLayerVisibility('plani_resi_coordN');
    }        
};