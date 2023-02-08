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


function parsingObsCoord_altimetric() {
    console.log("OK")

    // Récupérer les stations (avec observations)
    let planimetricAbriss = xmlDoc.getElementsByTagName("altimetricAbriss")[0];
    let stationsList = planimetricAbriss.getElementsByTagName("station");

    // Initialisation du Vector Source
    let obsCoordSourceH = new ol.source.Vector({});

    // Récupérer les No des observation de coordonnées YX et obtenir les coordonnées des points concernés
    for (let i = 0; i < stationsList.length; i++) {

        if (stationsList[i].getAttribute("obsType") == "connectionPoints") {

            let pointObs = stationsList[i];
            let listTargets = pointObs.getElementsByTagName("target");

            for (let j = 0; j < listTargets.length; j++) {
                let targetObs = listTargets[j];
                let pointName_i = targetObs.getAttribute("name");
                let E = parseFloat(listAllPoints.get(pointName_i)[0]);
                let N = parseFloat(listAllPoints.get(pointName_i)[1]);
                let H = parseFloat(listAllPoints.get(pointName_i)[2]);

                // Création d'une Feature ol pour chaque point avec des obs. de coord.
                const featureObsCoordH = new ol.Feature({
                    geometry: new ol.geom.Point([E,N]),
                    name: pointName_i,
                    // TODO : ajouter les properties
                });
                obsCoordSourceH.addFeature(featureObsCoordH);
            };
        };
    };

    // Création du layer
    obsCoordHLayer = new ol.layer.Vector({
        source: obsCoordSourceH,
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: './img/E_obs.png',
                scale: '0.13',
                color: '#000000',
                width: 5,
                rotation: Math.PI/4,
            }),
        }),
    });

    map.addLayer(obsCoordHLayer);
    changeLayerVisibilityCoordH();
    obsCoordHLayer.setZIndex(99);
    console.log("Coordinates altimetric observations has been added to map");
};


/** 
 * 
 */
function parsingGNSS_altimetric() {
    
    // Récupérer les stations (avec observations GNSS)
    const altimetricAbriss = xmlDoc.getElementsByTagName("altimetricAbriss")[0];
    let stationsList = altimetricAbriss.getElementsByTagName("station");

    // Initialisation de la source du layer
    let gnssSource = new ol.source.Vector({});
    let gnssStyle = new ol.style.Style({});
    let sessionNo = 0

    // Récupérer les numéros de points de chaque session GNSS et les stocker dans une liste (listPointsNameOfSession)
    for (let i = 0; i < stationsList.length; i++) {
        if (stationsList[i].getAttribute("obsType") === "gpsSession") {
            
            let sessionGNSS = stationsList[i];
            let listTargets = sessionGNSS.getElementsByTagName("target");
            let Listradius = [0.10,0.13,0.16,0.19,0.22,0.25,0.28,0.31,0.33];
            let listColorSession = ["#FF7C3F", "#00CEF7", "#3FFF67", "#6900F7", "#F700F6", "#F7F300", "#FFF33F", "#FF3FF0", "#FFC23F"];
            
            for (let j = 0; j < listTargets.length; j++) {
                let pointName_i = listTargets[j].getAttribute("name");
                let E = listAllPoints.get(pointName_i)[0];
                let N = listAllPoints.get(pointName_i)[1];
                
                // Création d'une Feature ol pour chaque point de la session GNSS et ajout à la source
                featurePointGnss = new ol.Feature({
                    geometry: new ol.geom.Point([parseFloat(E), parseFloat(N)]),
                    name: pointName_i,
                    properties: {
                        "session":String(sessionNo)
                        //ajouter H,
                        //ajouter v
                        //ajouter wi
                        //ajouter zi
                        //ajouter E.M.
                        //ajouter nabla
                    }
                });
                gnssStyle = new ol.style.Style({
                    // stroke: new ol.style.Stroke({ color: listColorSession[sessionNo], width: 4}),
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                        src: './img/Pentagon_blanc.png',
                        scale: Listradius[sessionNo],
                        color: listColorSession[sessionNo],
                    })),
                });
                featurePointGnss.setStyle(gnssStyle);
                gnssSource.addFeature(featurePointGnss);
            };
            sessionNo = sessionNo + 1;
        };
    };

    gnssLayerAltimetric = new ol.layer.Vector({
        source: gnssSource,
        style: gnssStyle,
        opacity: 1.0,
    });

    map.addLayer(gnssLayerAltimetric);
    changeLayerVisibilityGnss_altimetric();
    gnssLayer.setZIndex(80);
    console.log("GNSS altimetric sessions has been added to map");
};
