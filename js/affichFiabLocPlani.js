function affichFiabLocPlani(xml, pts){

    // Create source
    const planiFiabLoc_source = new ol.source.Vector({});
    let planiGNSS_sessionID = 1;
    const list_radius = [0.10, 0.13, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31, 0.34];
    
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
                            console.log(obs1_zi);
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
        
        }
    }
    console.log('ok');

    // Add to map
    planiFiabLoc_layer.setSource( planiFiabLoc_source );
    planiFiabLoc_layer.setOpacity(1.0);
    planiFiabLoc_layer.setZIndex(80);
    map.addLayer(planiFiabLoc_layer);
    changeLayerVisibility('plani_fiabLoc');
};

function getParameterFeature(zi){
    
    let colorFiab;
    let widthFiab;
    let zIndex;

    if (zi < 25.0) {
        colorFiab = "#FF1700"; //red
        widthFiab = 3;
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