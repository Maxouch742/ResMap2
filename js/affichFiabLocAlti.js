function affichFiabLocAlti(pts, xml){
    
    // Create source
    const altiFiabLocDH_source = new ol.source.Vector({});
    const altiFiabLocCoord_source = new ol.source.Vector({});
    const altiFiabLocGNSS_source = new ol.source.Vector({});
    let planiGNSS_sessionID = 1;
    const list_radius = [0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40];
    
    // Elements du fichier HTML
    const altiAbriss = xml.getElementsByTagName('altimetricAbriss')[0];
    const stations = altiAbriss.getElementsByTagName('station');

    // Parcours de la liste des observations
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');

        switch(sta_type){
            case 'gpsSession':
                // Display checkbox
                htmlAddCheckboxFiabiliteAlti('gnss');
                
                
                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const target = targets[j];

                    const pt_name = target.getAttribute('name');
                    let obs = target.getElementsByTagName('obs')[0];
                    if (obs.getAttribute('obsNr') != ''){
                        const obs_zi = parseFloat(obs.getAttribute('zi'));
                        const [colorFiab, widthFiab] = getParameterFeature_zi(obs_zi, '1D');

                        if(pts.has(pt_name)){
                        
                            const altiFiabLoc_feature = new ol.Feature({ 
                                geometry: new ol.geom.Point([ 
                                    pts.get(pt_name)['east'], 
                                    pts.get(pt_name)['north'] 
                                ]),
                                station: pt_name,
                                visee: pt_name
                            });
                            const altiFiabLoc_featureStyle = new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: './img/hexagon-svgrepo-com.svg',
                                    scale: list_radius[planiGNSS_sessionID]/2,
                                    color: colorFiab,
                                }),
                            });
                            altiFiabLoc_feature.setStyle(altiFiabLoc_featureStyle);
                            altiFiabLocGNSS_source.addFeature(altiFiabLoc_feature);
                        };
                    };
                }
                planiGNSS_sessionID++ ;
                break;
            
            case 'heightDiff':
                // Display checkbox
                htmlAddCheckboxFiabiliteAlti('dh');

                // Station
                const sta_name_dh = station.getAttribute('name');
                if (pts.has(sta_name_dh) === true){

                    // Lister les observations
                    const list_obsDH = station.getElementsByTagName('obs');
                    for (let j=0; j<list_obsDH.length; j++){
                        const pt_name = list_obsDH[j].getAttribute('target');
                        
                        if (pts.has(sta_name_dh) && pts.has(pt_name)){

                            const pt_obsNr = list_obsDH[j].getAttribute('obsNr');
                            const obs_zi = parseFloat(list_obsDH[j].getAttribute('zi'));
                            const [colorFiab, widthFiab] = getParameterFeature_zi(obs_zi, '1D');

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
                                ]),
                                station: sta_name_dh,
                                visee: pt_name,
                            });

                            // Feature symbol
                            const symbol_eart = pts.get(sta_name_dh)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name_dh)['east'])*0.25;
                            const symbol_north = pts.get(sta_name_dh)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name_dh)['north'])*0.25;
                            const gis = gisement(pts.get(sta_name_dh)['east']-symbol_eart, pts.get(sta_name_dh)['north']-symbol_north);              
                            const altiDH_featureSymbol = new ol.Feature({
                                geometry: new ol.geom.Point([
                                    symbol_eart, 
                                    symbol_north
                                ]),
                                station: sta_name_dh,
                                visee: pt_name
                            });

                            // Style
                            if (pt_obsNr != ''){
                                altiDH_feature.setStyle( new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: colorFiab,
                                        width: widthFiab
                                    })
                                }));
                                altiDH_featureSymbol.setStyle( new ol.style.Style({
                                    image: new ol.style.Icon({
                                        src: './img/triangle-filled-svgrepo-com.png',
                                        scale: '0.05',
                                        color: colorFiab,
                                        rotation: gis
                                    })
                                }))
                            };
                            altiFiabLocDH_source.addFeature(altiDH_feature);
                            altiFiabLocDH_source.addFeature(altiDH_featureSymbol);
                        }
                    }
                    //TODO: gérer les visées réciproques
                };
                break;
            
            case 'connectionPoints':
                // Display checkbox
                htmlAddCheckboxFiabiliteAlti('coord_H');
                
                // List "targets"
                const targets_coordH = station.getElementsByTagName('target');
                for (let j=0; j<targets_coordH.length; j++){

                    const point_name = targets_coordH[j].getAttribute('name');
                    // If the point has the 2D coordinates
                    if (pts.has(point_name) === true){
                        const point_obs = targets_coordH[j].getElementsByTagName('obs')[0];
                        const point_zi = parseFloat(point_obs.getAttribute('zi'));
                        const [colorFiab, widthFiab] = getParameterFeature_zi(point_zi, '1D');

                        // Feature
                        const altiFiabLocCoord_feature = new ol.Feature({
                            geometry: new ol.geom.Point([
                                pts.get(point_name)['east'],
                                pts.get(point_name)['north']
                            ]),
                            station: point_name,
                            visee: point_name,
                        });
                        const altiFiabLocCoord_featureSymbol = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: 'img/cross.svg',
                                scale: String(0.05*widthFiab),
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
                                offsetX: 25,
                                offsetY: 0,
                                rotation: 0,
                                placement: "point"
                            })
                        });
                        altiFiabLocCoord_feature.setStyle(altiFiabLocCoord_featureSymbol);
                        altiFiabLocCoord_source.addFeature(altiFiabLocCoord_feature);
                    }

                };
                break;
        }
    };

    if (altiFiabLocGNSS_source.getFeatures().length >= 1){
        altiFiabLocGNSS_layer.setSource(altiFiabLocGNSS_source);
        changeLayerVisibility('alti_fiabLoc_GNSS');
    };

    if (altiFiabLocDH_source.getFeatures().length >= 1){
        altiFiabLocDH_layer.setSource(altiFiabLocDH_source);
        changeLayerVisibility('alti_fiabLoc_DH');
    };

    if (altiFiabLocCoord_source.getFeatures.length >= 1){
        altiFiabLocCoordH_layer.setSource(altiFiabLocCoord_source);
        changeLayerVisibility('alti_fiabLoc_coord');
    };
};
