function affichResiNormesAlti(pts, xml){
    
    // Récupération des balises avec la limite du wi par l'utilisateur lors du calcul LTOP
    const altiAbriss = xml.getElementsByTagName('altimetricAbriss')[0];
    let biggestWi = altiAbriss.getElementsByTagName("biggestWi");
    let limitWi = parseFloat(biggestWi[0].getAttribute("biggerThan"));
    let limitInf = limitWi - 0.2; // pour paliers

    // Display legend
    document.getElementById("palierAltiWi1").innerText = `- ${limitWi} à ∞`;
    document.getElementById("palierAltiWi2").innerText = `- ${limitInf} à ${limitWi}`;
    document.getElementById("palierAltiWi3").innerText = `- 0.0 à ${limitInf}`;

    // Create source
    const altiResiDH_source = new ol.source.Vector({});
    const altiResiCoordH_source = new ol.source.Vector({});
    const altiResiGNSS_source = new ol.source.Vector({});
    let planiGNSS_sessionID = 1;
    const list_radius = [0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40];
    
    // Elements du fichier HTML
    const stations = altiAbriss.getElementsByTagName('station');

    // Parcours de la liste des observations
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');

        switch(sta_type){
            case 'gpsSession':
                // Display checkbox
                htmlAddCheckboxResiAlti('gnss');

                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const pt_name = targets[j].getAttribute('name');

                    const obs = targets[j].getElementsByTagName('obs')[0];
                    if (obs.getAttribute('obsNr') != ''){
                        const obs_wi = Math.abs(parseFloat(obs.getAttribute('wi')));
                        const [colorFiab, widthFiab] = getParameterFeature_wi(obs_wi, limitWi, limitInf);
                        
                        if (pts.has(pt_name)){
                            const planiResi1_feature = new ol.Feature({ 
                                geometry: new ol.geom.Point([ 
                                    pts.get(pt_name)['east'], 
                                    pts.get(pt_name)['north'] 
                                ]),
                            });
                            planiResi1_feature.setStyle( new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: './img/hexagon-svgrepo-com.svg',
                                    scale: list_radius[planiGNSS_sessionID]/2,
                                    color: colorFiab,
                                }),
                            }) );
                            altiResiGNSS_source.addFeature(planiResi1_feature);
                        };
                    };
                };
                planiGNSS_sessionID++ ;
                break;
        
            case 'heightDiff':
                // Display checkbox
                htmlAddCheckboxResiAlti('dh');

                // Station
                const sta_name_dh = station.getAttribute('name');
                if (pts.has(sta_name_dh)){

                    // Lister les observations
                    const list_obsDH = station.getElementsByTagName('obs');
                    for (let j=0; j<list_obsDH.length; j++){
                        const pt_name = list_obsDH[j].getAttribute('target');
                        const pt_obsNr = list_obsDH[j].getAttribute('obsNr');
                        const obs_wi = parseFloat(list_obsDH[j].getAttribute('wi'));
                        const [colorFiab, widthFiab] = getParameterFeature_wi(obs_wi, limitWi, limitInf);
                        
                        if (pts.has(pt_name)){

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
                                    symbol_eart, 
                                    symbol_north
                                ])
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
                            altiResiDH_source.addFeature(altiDH_feature);
                            altiResiDH_source.addFeature(altiDH_featureSymbol);
                        }
                    }
                    //TODO: gérer les visées réciproques
                };
                break;
            
            case 'connectionPoints':
                // Display checkbox
                htmlAddCheckboxResiAlti('coord_H');
                
                // List "targets"
                const targets_coordH = station.getElementsByTagName('target');
                for (let j=0; j<targets_coordH.length; j++){

                    const point_name = targets_coordH[j].getAttribute('name');
                    // If the point has the 2D coordinates
                    if (pts.has(point_name)){
                        const point_obs = targets_coordH[j].getElementsByTagName('obs')[0];
                        const obs_wi = parseFloat(point_obs.getAttribute('wi'));
                        const [colorFiab, widthFiab] = getParameterFeature_wi(obs_wi, limitWi, limitInf);

                        // Feature
                        const altiFiabLocCoord_feature = new ol.Feature({
                            geometry: new ol.geom.Point([
                                pts.get(point_name)['east'],
                                pts.get(point_name)['north']
                            ])
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
                        altiResiCoordH_source.addFeature(altiFiabLocCoord_feature);
                    }

                };
                break;
        }
    };

    // Layers
    if (altiResiGNSS_source.getFeatures().length >= 1){
        altiResiGNSS_layer.setSource(altiResiGNSS_source);
        changeLayerVisibility('alti_resi_GNSS');
    };

    if (altiResiDH_source.getFeatures().length >= 1){
        altiResiDH_layer.setSource(altiResiDH_source);
        changeLayerVisibility('alti_resi_DH');
    };

    if (altiResiCoordH_source.getFeatures().length >= 1){
        altiResiCoordH_layer.setSource(altiResiCoordH_source);
        changeLayerVisibility('alti_resi_coord');
    }
};