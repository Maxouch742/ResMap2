function affichFiabLocPlani(xml, pts){

    // Create source
    const planiFiabLoc_source = new ol.source.Vector({});
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
                // Lister les points par session
                const targets = station.getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    const pt_name = targets[j].getAttribute('name');

                    const obs = targets[j].getElementsByTagName('obs');
                    if (obs.length === 2){

                        const obs1 = obs[0];
                        if (obs1.getAttribute('obsNr') != ''){
                            const obs1_zi = parseFloat(obs1.getAttribute('zi'));
                            const [colorFiab, widthFiab, zIndex] = getParameterFeature(obs1_zi);
                            
                            const planiFiabLoc_feature = new ol.Feature({ geometry: new ol.geom.Point([ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ]) });
                            const planiFiabLoc_style = new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: './img/hexagon_half1_svgrepo-com.png',
                                    scale: list_radius[planiGNSS_sessionID]/2,
                                    color: colorFiab,
                                }),
                            });
                            planiFiabLoc_feature.setStyle(planiFiabLoc_style);
                            planiFiabLoc_source.addFeature(planiFiabLoc_feature);
                        };

                        const obs2 = obs[1];
                        if (obs2.getAttribute('obsNr') != ''){
                            const obs2_zi = parseFloat(obs1.getAttribute('zi'));
                            const [colorFiab, widthFiab, zIndex] = getParameterFeature(obs2_zi);
                            
                            const planiFiabLoc_feature = new ol.Feature({ geometry: new ol.geom.Point([ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ]) });
                            const planiFiabLoc_style = new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: './img/hexagon_half2_svgrepo-com.png',
                                    scale: list_radius[planiGNSS_sessionID]/2,
                                    color: colorFiab,
                                }),
                            });
                            planiFiabLoc_feature.setStyle(planiFiabLoc_style);
                            planiFiabLoc_source.addFeature(planiFiabLoc_feature);
                        };
                    }
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
                    const pt_zi = parseFloat(list_obsDir[j].getAttribute('zi'));
                    const [colorFiab, widthFiab, zIndex] = getParameterFeature(pt_zi);
                    
                    
                    // Feature line
                    const planiDir_feature = new ol.Feature({
                        geometry: new ol.geom.LineString([ 
                            [ pts.get(sta_name)['east'], pts.get(sta_name)['north'] ], 
                            [ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ] 
                        ]),
                    });

                    // Feature symbole
                    const east_symbol = pts.get(sta_name)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name)['east'])*0.1;
                    const north_symbol = pts.get(sta_name)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name)['north'])*0.1;
                    const gis = gisement(pts.get(sta_name)['east']-east_symbol, pts.get(sta_name)['north']-north_symbol);              

                    const planiDir_featureSymbol = new ol.Feature({
                        geometry: new ol.geom.Point([ 
                            east_symbol, 
                            north_symbol ])
                    });
                    
                    // Style
                    if (pt_obsNr != ''){
                        planiDir_feature.setStyle( new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: colorFiab,
                                width: widthFiab
                            }),
                            zIndex: zIndex
                        }));
                        planiDir_featureSymbol.setStyle( new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-svgrepo-com.png',
                                scale:'0.05',
                                color: colorFiab,
                                rotation: gis
                            }),
                            zIndex: zIndex
                        }))
                    } else {
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
                    };
                    planiFiabLoc_source.addFeature(planiDir_feature);
                    planiFiabLoc_source.addFeature(planiDir_featureSymbol);
                };
                break;
        }
    }

    // Add to map
    planiFiabLoc_layer.setSource( planiFiabLoc_source );
    planiFiabLoc_layer.setOpacity(1.0);
    //planiFiabLoc_layer.setZIndex(80);
    map.addLayer(planiFiabLoc_layer);
    changeLayerVisibility('plani_fiabLoc');
};


function getParameterFeature(zi){
    
    let colorFiab;
    let widthFiab;
    let zIndex;

    if (zi < 25.0) {
        colorFiab = "#FF1700"; //red
        widthFiab = 2;
        zIndex = 99;
    } 
    else if (zi <= 50.0) {
        colorFiab = "#FFD000"; //yellow
        widthFiab = 1.5;
        zIndex = 98;
    } 
    else if (zi <= 75.0) {
        colorFiab = "#ABFF00"; //green
        widthFiab = 0;
        zIndex = 1;
    } 
    else if (zi <= 100.0) {
        colorFiab = "#2AE100"; //green
        widthFiab = 0;
        zIndex = 1;
    };

    return [colorFiab, widthFiab, zIndex]

}