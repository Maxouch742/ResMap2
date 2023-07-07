function parseXML_planiObs(xml){

    // Elements du fichier HTML    
    const planiAbriss = xml.getElementsByTagName('planimetricAbriss')[0];
    const stations = planiAbriss.getElementsByTagName('station');

    // Definition des sources des layers
    const planiGNSS_source = new ol.source.Vector({});
    let planiGNSS_sessionID = 1;
    const list_radius = [0.10,0.13,0.16,0.19,0.22,0.25,0.28,0.31,0.33];
    const list_colors = ["#FF7C3F", "#00CEF7", "#3FFF67", "#6900F7", "#F700F6", "#F7F300", "#FFF33F", "#FF3FF0", "#FFC23F"];
    
    const planiDir_source = new ol.source.Vector({});
    const planiDis_source = new ol.source.Vector({});

    // Parcours de l'ensemble des observations
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');
        
        switch (sta_type){
            case 'gpsSession':

                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const pt_name = targets[j].getAttribute('name');

                    const planiGNSS_feature = new ol.Feature({
                        geometry: new ol.geom.Point([
                            points.get(pt_name)['east'],
                            points.get(pt_name)['north']
                        ]),
                        name: station.getAttribute('name'),
                        properties: 'Session n°'+String(planiGNSS_sessionID),
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

                planiGNSS_sessionID++ ;
                break;
            case 'direction':
                // Station
                const sta_name = station.getAttribute('name');
                
                // Lister les observations
                const list_obsDir = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDir.length; j++){
                    const pt_name = list_obsDir[j].getAttribute('target');
                    const pt_obsNr = list_obsDir[j].getAttribute('obsNr');
                    
                    // Feature line
                    const planiDir_feature = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [ points.get(sta_name)['east'], points.get(sta_name)['north'] ],
                            [ points.get(pt_name)['east'], points.get(pt_name)['north'] ]
                        ]),
                    });

                    // Feature symbole
                    const east_symbol = points.get(sta_name)['east'] + (points.get(pt_name)['east'] - points.get(sta_name)['east'])*0.1;
                    const north_symbol = points.get(sta_name)['north'] + (points.get(pt_name)['north'] - points.get(sta_name)['north'])*0.1;
                    const gis = gisement(points.get(sta_name)['east']-east_symbol, points.get(sta_name)['north']-north_symbol);              

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
                break;
            case 'distance':
                // Station
                const sta_name_dis = station.getAttribute('name');
                
                // Lister les observations
                const list_obsDis = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDis.length; j++){
                    const pt_name = list_obsDis[j].getAttribute('target');
                    const pt_obsNr = list_obsDis[j].getAttribute('obsNr');
                    
                    // Feature line
                    const planiDis_feature = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [ points.get(sta_name_dis)['east'], points.get(sta_name_dis)['north'] ],
                            [ points.get(pt_name)['east'], points.get(pt_name)['north'] ]
                        ]),
                    });

                    // Feature symbole
                    const east_symbol1 = points.get(sta_name_dis)['east'] + (points.get(pt_name)['east'] - points.get(sta_name_dis)['east'])*0.15;
                    const north_symbol1 = points.get(sta_name_dis)['north'] + (points.get(pt_name)['north'] - points.get(sta_name_dis)['north'])*0.15;
                    const east_symbol2 = points.get(sta_name_dis)['east'] + (points.get(pt_name)['east'] - points.get(sta_name_dis)['east'])*0.25;
                    const north_symbol2 = points.get(sta_name_dis)['north'] + (points.get(pt_name)['north'] - points.get(sta_name_dis)['north'])*0.25;
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
                break;
        }
    }

    // Layers 
    planiGNSS_layer = new ol.layer.Vector({
        source: planiGNSS_source,
        opacity: 1.0
    });
    planiGNSS_layer.setZIndex(90);
    map.addLayer(planiGNSS_layer);
    changeLayerVisibility('plani_GNSS');

    planiDir_layer = new ol.layer.Vector({
        source: planiDir_source
    });
    planiDir_layer.setZIndex(92);
    map.addLayer(planiDir_layer);
    changeLayerVisibility('plani_Dir');

    planiDis_layer = new ol.layer.Vector({
        source: planiDis_source
    });
    planiDis_layer.setZIndex(91);
    map.addLayer(planiDis_layer);
    changeLayerVisibility('plani_Dis');
    
}