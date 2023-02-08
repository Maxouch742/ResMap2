function parsingViseesXML_altimetric() {
    console.log("Hello");
    
    // Récupérer les stations (avec observations)
    const altimetricAbriss = xmlDoc.getElementsByTagName("altimetricAbriss")[0];
    let stationsList = altimetricAbriss.getElementsByTagName("station");

    console.log(stationsList);

    // Récupérer les informations sur l'observation (No station, No point visée, zi, wi, ...)
    let NoPointsDenivelee = []
    for (i=0; i<stationsList.length; i++){
        typeObs = stationsList[i].getAttribute("obsType");
        console.log("Entrer dans la boucle for");
        if (typeObs === "heightDiff"){
            station_XML = stationsList[i];
            station_no = station_XML.getAttribute("name");
            observation_XML = stationXml.getElementsByTagName("obs");
            for (j=0; j<observation_XML.length; j++){
                observation_no = observation_XML[j].getAttribute("obsNr");
                visee_no = observation_XML[j].getAttribute("target");
                visee_zi = observation_XML[j].getAttribute("zi");
                visee_wi = observation_XML[j].getAttribute("wi");
                visee_nabla = observation_XML[j].getAttribute("nabla_rzi");
                visee_v = observation_XML[j].getAttribute("improv");
                
                // TODO : faire une liste précédemment pour récupérer les hauteurs (exemple : listAllPoints)
                station_E = listAllPoints.get(station_no)[0];
                station_N = listAllPoints.get(station_no)[1];
                station_H = listAllPoints.get(station_no)[2];
                visee_E = listAllPoints.get(visee_no)[0];
                visee_N = listAllPoints.get(visee_no)[1];
                visee_H = listAllPoints.get(visee_no)[2];
                
                NoPointsDenivelee.push([
                    station_E, station_N,
                    visee_E, visee_N,
                    station_no, station_H,
                    visee_no, visee_H,
                    visee_zi,
                    observation_no,
                    visee_wi,
                    visee_nabla,
                    visee_v]);
            };

            // Création du layer
            deniveleeLayer = new ol.layer.Vector({});

            // Création de la source du layer et ajout des features à la source
            let deniveleeSource = new ol.source.Vector({});
            for (i=0; i<NoPointsDenivelee.length; i++){
                const coordArray = [ 
                    [NoPointsDenivelee[i][0], NoPointsDenivelee[i][1]],
                    [NoPointsDenivelee[i][2], NoPointsDenivelee[i][3]] 
                ];

                const deniveleeFeature = new ol.Feature({
                    geometry: new ol.geom.LineString(coordArray),
                    name: [
                        NoPointsDenivelee[i][4],
                        NoPointsDenivelee[i][6]
                    ],
                    properties: {
                        "type":"dénivelée",
                        "no":NoPointsDenivelee[i][9],
                        "zi":NoPointsDenivelee[i][8],
                        "wi":NoPointsDenivelee[i][10],
                        "v":NoPointsDenivelee[i][12],
                        "nabla":NoPointsDenivelee[i][11]
                    }
                });

                let deniveleeStyle;
                if (geometryDistances[i][9] === "" ) { // si l'obs. a pas de numéro (supp.), elle sera en rose et épaisse
                    deniveleeStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({ color: 'rgba(0, 0, 0, 0.0)', width: 0, })
                    });
                } else { // Si l'obs a un numéro = elle est gardée
                    deniveleeStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({ color: '#000000', width: 1 })
                    });
                };
                deniveleeFeature.setStyle(deniveleeStyle);
                deniveleeSource.addFeature(deniveleeFeature)
                deniveleeLayer.setSource(deniveleeSource);
            };

            // Ajout de la carte
            map.addLayer(deniveleeLayer);
            console.log("Height's differences have been added to map");            
        };
    };
};