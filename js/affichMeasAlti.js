function affichMeasAlti(xml, pts){

    // Elements du fichier HTML
    const altiAbriss = xml.getElementsByTagName('altimetricAbriss')[0];
    const stations = altiAbriss.getElementsByTagName('station');

    // Definitions des sources des couches
    const altiDH_source = new ol.source.Vector({});
    const altiCoordH_source = new ol.source.Vector({});

    const altiGNSS_source = new ol.source.Vector({});
    let altiGNSS_sessionID = 1;
    const list_radius = [0.10, 0.13, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31, 0.34];
    const list_colors = ["#FF7C3F", "#00CEF7", "#3FFF67", "#6900F7", "#F700F6", "#F7F300", "#FFF33F", "#FF3FF0", "#FFC23F"];
    
    // Parcours
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');

        switch(sta_type){
            case 'gpsSession':
                // Display
                htmlAddCheckboxObservationsAlti_GNSS();

                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const pt_name = targets[j].getAttribute('name');

                    // Create feature
                    if (pts.has(pt_name) === true){
                        
                        const altiGNSS_feature = new ol.Feature({
                            geometry: new ol.geom.Point([
                                pts.get(pt_name)['east'],
                                pts.get(pt_name)['north']
                            ]),
                            name: station.getAttribute('name'),
                            properties: 'Session n°'+String(altiGNSS_sessionID)
                        });
                        const altiGNSS_style = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/pentagon-svgrepo-com.png',
                                scale: list_radius[altiGNSS_sessionID],
                                color: list_colors[altiGNSS_sessionID]
                            })
                        });
                        altiGNSS_feature.setStyle(altiGNSS_style);
                        altiGNSS_source.addFeature(altiGNSS_feature);
                    }
                };
                altiGNSS_sessionID++ ;
                break;
                
            case 'heightDiff':
                // Display checkbox
                htmlAddCheckboxObservationsAlti_DH();

                // Station
                const sta_name_dh = station.getAttribute('name');
                if (pts.has(sta_name_dh) === true){

                    // Lister les observations
                    const list_obsDH = station.getElementsByTagName('obs');
                    for (let j=0; j<list_obsDH.length; j++){
                        const pt_name = list_obsDH[j].getAttribute('target');
                        const pt_obsNr = list_obsDH[j].getAttribute('obsNr');

                        if (pts.has(pt_name) === true){

                            // Feature line
                            const altiDH_feature = new ol.Feature({
                                geometry: new ol.geom.LineString([
                                    [ 
                                        pts.get(sta_name_dh)['east'],
                                        pts.get(sta_name_dh)['north']
                                    ],
                                    [
                                        pts.get(pt_name)['east'],
                                        pts.get(pt_name)['north']
                                    ]
                                ])
                            });

                            // Feature symbol
                            const symbol_eart = pts.get(sta_name_dh)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name_dh)['east'])*0.25;
                            const symbol_north = pts.get(sta_name_dh)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name_dh)['north'])*0.25;
                            const gis = gisement(pts.get(sta_name_dh)['east']-symbol_eart, pts.get(sta_name_dh)['north']-symbol_north);              
                            const altiDH_featureSymbol = new ol.Feature({
                                geometry: new ol.geom.Point([
                                    symbol_eart, symbol_north
                                ])
                            });

                            // Style
                            if (pt_obsNr != ''){
                                altiDH_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#717171',
                                        width: 1
                                    })
                                }));
                                altiDH_featureSymbol.setStyle( new ol.style.Style({
                                    image: new ol.style.Icon({
                                        src: './img/triangle-filled-svgrepo-com.png',
                                        scale:'0.05',
                                        color:'#717171',
                                        rotation: gis
                                    })
                                }))
                            } else {
                                altiDH_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color:'#FF2D00',
                                        width: 1
                                    })
                                }));
                                altiDH_featureSymbol.setStyle( new ol.style.Style({
                                    image: new ol.style.Icon({
                                        src: './img/triangle-filled-svgrepo-com.png',
                                        scale:'0.05',
                                        color:'#FF2D00',
                                        rotation: gis
                                    })
                                }))
                            };
                            altiDH_source.addFeature(altiDH_feature);
                            altiDH_source.addFeature(altiDH_featureSymbol);
                        }
                    }
                    //TODO: gérer les visées réciproques
                };
                break;
            
            case 'connectionPoints':
                htmlAddCheckboxObservationsAlti_CoordH();

                // list of points
                const targets_list = station.getElementsByTagName('target');
                for (let j=0; j<targets_list.length; j++){

                    const target = targets_list[j];
                    const pt_name = target.getAttribute('name');
                    
                    const points_list = target.getElementsByTagName('obs');
                    for (let k=0; k<points_list.length; k++){
                        
                        const obs = points_list[k];
                        const obs_target = obs.getAttribute('target');

                        if (pts.has(pt_name) === true){

                            const altiCoordH_feature = new ol.Feature({
                                geometry: new ol.geom.Point([
                                    pts.get(pt_name)['east'],
                                    pts.get(pt_name)['north']
                                ]),
                                name: pt_name,
                            });

                            switch (obs_target){
                                case "HH":
                                    const altiCoordH_style = new ol.style.Style({
                                        image: new ol.style.Icon({
                                            src: './img/H_obs.png',
                                            scale: '0.15',
                                            color: '#000000',
                                        })
                                    });
                                    altiCoordH_feature.setStyle(altiCoordH_style);
                                    altiCoordH_source.addFeature(altiCoordH_feature);
                                    break;
                            }
                        }
                    }
                }
                break;
        }
    };

    // Layers
    altiGNSS_layer.setSource( altiGNSS_source );
    altiGNSS_layer.setOpacity( 1.0 );
    changeLayerVisibility('alti_GNSS');

    altiDH_layer.setSource( altiDH_source );
    changeLayerVisibility('alti_DH');

    altiCoordH_layer.setSource( altiCoordH_source );
    changeLayerVisibility('alti_coordH');
}