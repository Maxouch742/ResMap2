function affichMeasPlani(xml, pts, visee = false, station_matricule = false){

    // Elements du fichier HTML
    const planiAbriss = xml.getElementsByTagName('planimetricAbriss')[0];
    const stations = planiAbriss.getElementsByTagName('station');

    // Definition des sources des layers
    const planiDir_source = new ol.source.Vector({});
    const planiDis_source = new ol.source.Vector({});
    
    const planiCoordE_source = new ol.source.Vector({});
    const planiCoordN_source = new ol.source.Vector({});
    
    const planiGNSS_source = new ol.source.Vector({});
    let planiGNSS_sessionID = 1;
    const list_radius = [0.10, 0.13, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31, 0.34];
    const list_colors = ["#FF7C3F", "#00CEF7", "#3FFF67", "#6900F7", "#F700F6", "#F7F300", "#FFF33F", "#FF3FF0", "#FFC23F"];
    

    // Parcours de la liste des observations
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');

        switch(sta_type){
            case 'gpsSession':
                htmlAddCheckboxObservationsPlani('gnss');

                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const pt_name = targets[j].getAttribute('name');

                    if (pts.has(pt_name)){
                        if (visee === false || (visee !== false && visee === pt_name)){

                            const planiGNSS_feature = new ol.Feature({
                                geometry: new ol.geom.Point([
                                    pts.get(pt_name)['east'],
                                    pts.get(pt_name)['north']
                                ]),
                                name: station.getAttribute('name'),
                                session_number: String(planiGNSS_sessionID),
                                id: targets[j].getAttribute('obsNr'),
                                obs: targets[j].getAttribute('target'),
                                value: parseFloat(targets[j].getAttribute('value')),
                                group: parseFloat(targets[j].getAttribute('group')),
                                zi: parseFloat(targets[j].getAttribute('zi')),
                                wi: parseFloat(targets[j].getAttribute('wi')),
                                nabla: parseFloat(targets[j].getAttribute('nabla_rzi')),
                                corr: parseFloat(targets[j].getAttribute('corr')),
                            });
                            const planiGNSS_style = new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: './img/pentagon-svgrepo-com.png',
                                    scale: list_radius[planiGNSS_sessionID],
                                    color: list_colors[planiGNSS_sessionID]
                                })
                            });
                            planiGNSS_feature.setStyle(planiGNSS_style);
                            planiGNSS_source.addFeature(planiGNSS_feature);
                        };
                    };
                };
                planiGNSS_sessionID++ ;
                break;

            case 'direction':
                htmlAddCheckboxObservationsPlani('dir');

                // Station
                const sta_name = station.getAttribute('name');
                
                // Lister les observations
                const list_obsDir = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDir.length; j++){
                    const pt_name = list_obsDir[j].getAttribute('target');
                    const pt_obsNr = list_obsDir[j].getAttribute('obsNr');

                    if (pts.has(sta_name) && pts.has(pt_name)) {
                        if ((visee === false && station_matricule === false) || 
                            (station_matricule === false && visee !== false && pt_name === visee) ||
                            (station_matricule !== false && visee === false && sta_name === station_matricule)){
                    
                            // Feature line
                            const planiDir_feature = new ol.Feature({
                                geometry: new ol.geom.LineString([
                                    [ pts.get(sta_name)['east'], pts.get(sta_name)['north'] ],
                                    [ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ]
                                ]),
                                id: pt_obsNr,
                                station: sta_name,
                                visee: pt_name,
                                obs: sta_type,
                                value: parseFloat(list_obsDir[j].getAttribute('value')),
                                group: parseFloat(list_obsDir[j].getAttribute('group')),
                                zi: parseFloat(list_obsDir[j].getAttribute('zi')),
                                wi: parseFloat(list_obsDir[j].getAttribute('wi')),
                                nabla: parseFloat(list_obsDir[j].getAttribute('nabla_rzi')),
                                corr: parseFloat(list_obsDir[j].getAttribute('corr')),
                            });

                            // Feature symbole
                            const east_symbol = pts.get(sta_name)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name)['east'])*0.1;
                            const north_symbol = pts.get(sta_name)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name)['north'])*0.1;
                            const gis = gisement(pts.get(sta_name)['east']-east_symbol, pts.get(sta_name)['north']-north_symbol);              

                            const planiDir_featureSymbol = new ol.Feature({
                                geometry: new ol.geom.Point([
                                    east_symbol,
                                    north_symbol
                                ])
                            });
                            
                            // Style
                            if (pt_obsNr != ''){
                                planiDir_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#717171',
                                        width: 1
                                    })
                                }));
                                planiDir_featureSymbol.setStyle( new ol.style.Style({
                                    image: new ol.style.Icon({
                                        src: './img/triangle-svgrepo-com.png',
                                        scale:'0.05',
                                        color:'#717171',
                                        rotation: gis
                                    })
                                }))
                            } else {
                                planiDir_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#FF2D00',
                                        width: 1
                                    })
                                }));
                                planiDir_featureSymbol.setStyle( new ol.style.Style({
                                    image: new ol.style.Icon({
                                        src: './img/triangle-svgrepo-com.png',
                                        scale:'0.05',
                                        color:'#FF2D00',
                                        rotation: gis
                                    })
                                }))
                            }
                            planiDir_source.addFeature(planiDir_feature);
                            planiDir_source.addFeature(planiDir_featureSymbol);
                        };
                    };
                };
                break;
            
            case  'distance':
                htmlAddCheckboxObservationsPlani('dis');

                // Station
                const sta_name_dis = station.getAttribute('name');
                
                // Lister les observations
                const list_obsDis = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDis.length; j++){
                    const pt_name = list_obsDis[j].getAttribute('target');
                    const pt_obsNr = list_obsDis[j].getAttribute('obsNr');

                    if (pts.has(sta_name_dis) && pts.has(pt_name)){
                        if ((visee === false && station_matricule === false) || 
                            (visee !== false && station_matricule === false && pt_name === visee)
                            (visee === false && station_matricule !== false && station_matricule === sta_name_dis)){
                    
                            // Feature line
                            const planiDis_feature = new ol.Feature({
                                geometry: new ol.geom.LineString([
                                    [ pts.get(sta_name_dis)['east'], pts.get(sta_name_dis)['north'] ],
                                    [ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ]
                                ]),
                                id: pt_obsNr,
                                obs: sta_type,
                                station: sta_name_dis,
                                visee: pt_name,
                                value: parseFloat(list_obsDis[j].getAttribute('value')),
                                group: parseFloat(list_obsDis[j].getAttribute('group')),
                                zi: parseFloat(list_obsDis[j].getAttribute('zi')),
                                wi: parseFloat(list_obsDis[j].getAttribute('wi')),
                                nabla: parseFloat(list_obsDis[j].getAttribute('nabla_rzi')),
                                corr: parseFloat(list_obsDis[j].getAttribute('corr')),
                            });

                            // Feature symbole
                            const east_symbol1 = pts.get(sta_name_dis)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name_dis)['east'])*0.12;
                            const north_symbol1 = pts.get(sta_name_dis)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name_dis)['north'])*0.12;
                            const east_symbol2 = pts.get(sta_name_dis)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name_dis)['east'])*0.22;
                            const north_symbol2 = pts.get(sta_name_dis)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name_dis)['north'])*0.22;
                            const planiDis_featureSymbol = new ol.Feature({
                                geometry: new ol.geom.LineString([
                                    [east_symbol1, north_symbol1],
                                    [east_symbol2, north_symbol2]
                                ])
                            });
                            
                            // Style
                            if (pt_obsNr != ''){
                                planiDis_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#717171',
                                        width: 1
                                    })
                                }));
                                planiDis_featureSymbol.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#717171',
                                        width: 6,
                                        lineCap: 'square'
                                    })
                                }))
                            } else {
                                planiDis_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#FF2D00',
                                        width: 1
                                    })
                                }));
                                planiDis_featureSymbol.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#FF2D00',
                                        width: 6,
                                        lineCap: 'square'
                                    })
                                }))
                            };
                            planiDis_source.addFeature(planiDis_feature);
                            planiDis_source.addFeature(planiDis_featureSymbol);
                        };
                    };
                };
                break;
        
            case 'coordinate':
                htmlAddCheckboxObservationsPlani('coord_E');
                htmlAddCheckboxObservationsPlani('coord_N'); 

                // list of points
                const targets_list = station.getElementsByTagName('target');
                for (let j=0; j<targets_list.length; j++){

                    const target = targets_list[j];
                    const pt_name = target.getAttribute('name');
                    
                    const points_list = target.getElementsByTagName('obs');
                    for (let k=0; k<points_list.length; k++){
                        
                        const obs = points_list[k];
                        const obs_target = obs.getAttribute('target');

                        if (pts.has(pt_name)){

                            const planiCoord_feature = new ol.Feature({
                                geometry: new ol.geom.Point([
                                    pts.get(pt_name)['east'],
                                    pts.get(pt_name)['north']
                                ]),
                                name: pt_name,
                            });

                            switch (obs_target){
                                case "Y":
                                    const planiCoord_style1 = new ol.style.Style({
                                        image: new ol.style.Icon({
                                            src: './img/E_obs.png',
                                            scale: '0.13',
                                            color: '#000000',
                                        })
                                    });
                                    planiCoord_feature.setStyle(planiCoord_style1);
                                    planiCoordE_source.addFeature(planiCoord_feature);
                                    break;
                                case "X":
                                    const planiCoord_style2 = new ol.style.Style({
                                        image: new ol.style.Icon({
                                            src: './img/N_obs.png',
                                            scale: '0.13',
                                            color: '#000000',
                                        })
                                    });
                                    planiCoord_feature.setStyle(planiCoord_style2);
                                    planiCoordN_source.addFeature(planiCoord_feature);
                                    break;
                            }
                        }
                    }
                };
                break;
        }
    };

    // Layers 
    if (planiGNSS_source.getFeatures().length >= 1){
        planiGNSS_layer.setSource( planiGNSS_source );
        planiGNSS_layer.setOpacity( 1.0 );
        planiGNSS_layer.setVisible(true);
        changeLayerVisibility('plani_GNSS');
    };

    if (planiDir_source.getFeatures().length >= 1){
        planiDir_layer.setSource( planiDir_source );
        planiDir_layer.setVisible(true);
        changeLayerVisibility('plani_dir');
    };

    if (planiDis_source.getFeatures().length >= 1){
        planiDis_layer.setSource( planiDis_source );
        planiDis_layer.setVisible(true);
        changeLayerVisibility('plani_dis');
    };

    if (planiCoordE_source.getFeatures().length >= 1){
        planiCoordE_layer.setSource( planiCoordE_source );
        planiCoordE_layer.setVisible(true);
        changeLayerVisibility('plani_coordE');
    };

    if (planiCoordN_source.getFeatures().length >= 1){
        planiCoordN_layer.setSource( planiCoordN_source );
        planiCoordN_layer.setVisible(true);
        changeLayerVisibility('plani_coordN');
    };
}

