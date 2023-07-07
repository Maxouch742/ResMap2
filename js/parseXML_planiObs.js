function parseXML_planiObs(xml){

    // Elements du fichier HTML    
    const planiAbriss = xml.getElementsByTagName('planimetricAbriss')[0];
    const stations = planiAbriss.getElementsByTagName('station');

    // Definition des sources des layers
    const planiGNSS_source = new ol.source.Vector({ });
    let planiGNSS_sessionID = 1;
    const list_radius = [0.10,0.13,0.16,0.19,0.22,0.25,0.28,0.31,0.33];
    const list_colors = ["#FF7C3F", "#00CEF7", "#3FFF67", "#6900F7", "#F700F6", "#F7F300", "#FFF33F", "#FF3FF0", "#FFC23F"];
    

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
                break;
            case 'distance':
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
    
}