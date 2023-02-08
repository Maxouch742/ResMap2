function parsingViseesXML_altimetric() {
    
    // Récupérer les stations (avec observations)
    const altimetricAbriss = xmlDoc.getElementsByTagName("altimetricAbriss")[0];
    let stationsList = altimetricAbriss.getElementsByTagName("station");

    // Récupérer les informations sur l'observation (No station, No point visée, zi, wi, ...)
    let NoPointsDenivelee = []
    for (i=0; i<stationsList.length; i++){
        const typeObs = stationsList[i].getAttribute("obsType");
        if (typeObs == "heightDiff"){
            const station_XML = stationsList[i];
            const station_no = station_XML.getAttribute("name");
            const observation_XML = station_XML.getElementsByTagName("obs");
            for (j=0; j<observation_XML.length; j++){
                const observation_no = observation_XML[j].getAttribute("obsNr");
                const visee_no = observation_XML[j].getAttribute("target");
                const visee_zi = observation_XML[j].getAttribute("zi");
                const visee_wi = observation_XML[j].getAttribute("wi");
                const visee_nabla = observation_XML[j].getAttribute("nabla_rzi");
                const visee_v = observation_XML[j].getAttribute("improv");

                const station_E = listAllPoints.get(station_no)[0];
                const station_N = listAllPoints.get(station_no)[1];
                const station_H = listAllPoints.get(station_no)[2];
                const visee_E = listAllPoints.get(visee_no)[0];
                const visee_N = listAllPoints.get(visee_no)[1];
                const visee_H = listAllPoints.get(visee_no)[2];
                
                NoPointsDenivelee.push([
                    station_no, 
                    station_E, 
                    station_N, 
                    station_H,
                    visee_no, 
                    visee_E, 
                    visee_N, 
                    visee_H,
                    observation_no,
                    visee_zi,
                    visee_wi,
                    visee_nabla,
                    visee_v
                ]);
            };
        };
    };

    // Création du layer
    deniveleeLayer = new ol.layer.Vector({});

    // Création de la source du layer et ajout des features à la source
    let deniveleeSource = new ol.source.Vector({});
    for (i=0; i<NoPointsDenivelee.length; i++){
        // coordonnées de la ligne
        const coordArray = [ 
            [parseFloat(NoPointsDenivelee[i][1]), parseFloat(NoPointsDenivelee[i][2])],
            [parseFloat(NoPointsDenivelee[i][5]), parseFloat(NoPointsDenivelee[i][6])] 
        ];

        // Feature normal
        const deniveleeFeature = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray),
            name: [
                NoPointsDenivelee[i][0],
                NoPointsDenivelee[i][4]
            ],
            properties: {
                "type":"dénivelée",
                "no":NoPointsDenivelee[i][8],
                "zi":NoPointsDenivelee[i][9],
                "wi":NoPointsDenivelee[i][10],
                "v":NoPointsDenivelee[i][12],
                "nabla":NoPointsDenivelee[i][11]
            }
        });

        // Calcul de l'emplacement du symbole et de la rotation
        const dE = (coordArray[1][0] - coordArray[0][0])*0.22;
        const dN = (coordArray[1][1] - coordArray[0][1])*0.22;
        const rot = gisement(dE, dN);
        
        // Style des features
        let deniveleeStyle;
        let deniveleeFeatureSymbol;
        if (NoPointsDenivelee[i][8] === "" ) { // si l'obs. a pas de numéro (supp.), elle sera en rose et épaisse
            deniveleeStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({ color: 'rgba(0, 0, 0, 0.0)', width: 0, })
            });
        } else { // Si l'obs a un numéro = elle est gardée
            deniveleeStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({ color: '#000000', width: 1 })
            });
            // Feature du symbole de la denivele
            deniveleeFeatureSymbol = new ol.Feature({ 
                geometry: new ol.geom.Point([
                    coordArray[0][0]+dE, 
                    coordArray[0][1]+dN
                ]),
            });
            deniveleeFeatureSymbolStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    src: 'img/blackTriangle_icon.png',
                    scale: 0.02,
                    rotation: rot,
                }),
            });
            deniveleeFeatureSymbol.setStyle(deniveleeFeatureSymbolStyle);

            deniveleeSource.addFeature(deniveleeFeatureSymbol);
            deniveleeLayer.setSource(deniveleeSource);
            console.log("Add symbol");
        };
        deniveleeFeature.setStyle(deniveleeStyle);
        deniveleeSource.addFeature(deniveleeFeature);
        

        deniveleeLayer.setSource(deniveleeSource);
    };

    // Ajout de la carte
    map.addLayer(deniveleeLayer);
    changeLayerVisibilityDenivelee_altimetric();
    console.log("Height's differences have been added to map");            
};


/** Calcul des gisements et modulo
     * Source : http://cours-fad-public.ensg.eu/course/view.php?id=51
     * @param {array} coordA coordonnée du point A au format [x,y]
     * @param {array} coordB coordonnée du point B au format [x,y]
     * @return {number} gisement en [radians] des coordonnées
     */
function gisement(dx, dy){
    
    let gisement = 2*Math.atan( dx / (Math.sqrt(dx*dx + dy*dy)+dy) )*200/Math.PI;
    
    if (gisement < 0){
      gisement += 400;
    };
    return gisement*Math.PI/200.0
  };