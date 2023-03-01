function parsingVisees_altimetric() {
    
    // Récupérer les stations (avec observations)
    const altimetricAbriss = xmlDoc.getElementsByTagName("altimetricAbriss")[0];
    let stationsList = altimetricAbriss.getElementsByTagName("station");

    // Récupérer les informations sur l'observation (No station, No point visée, zi, wi, ...)
    observationsTerrestresAltimetric = []

    for (i=0; i<stationsList.length; i++){

        // Infos de la stations
        const typeObs = stationsList[i].getAttribute("obsType");

        // Vérifier qu'il y a des dénivelées
        if (typeObs == "heightDiff"){
            const station_XML = stationsList[i];
            const station_no = station_XML.getAttribute("name");
            const observation_XML = station_XML.getElementsByTagName("obs");
            for (j=0; j<observation_XML.length; j++){
                const observation_no = observation_XML[j].getAttribute("obsNr");
                const visee_no = observation_XML[j].getAttribute("target");
                const noGro = observation_XML[j].getAttribute("group");
                const resid = observation_XML[j].getAttribute("improv");
                const erMoy = observation_XML[j].getAttribute("meanErrApriori");
                const zi = observation_XML[j].getAttribute("zi");
                const nabla = observation_XML[j].getAttribute("nabla_rzi");
                const wi = observation_XML[j].getAttribute("wi");
                const giCoor = observation_XML[j].getAttribute("coordAzi");
                const diCoor = observation_XML[j].getAttribute("coordDist");
                const erLat = observation_XML[j].getAttribute("lateralErr");

                const station_E = listAllPoints.get(station_no)[0];
                const station_N = listAllPoints.get(station_no)[1];
                const station_H = listAllPoints.get(station_no)[2];
                const visee_E = listAllPoints.get(visee_no)[0];
                const visee_N = listAllPoints.get(visee_no)[1];
                const visee_H = listAllPoints.get(visee_no)[2];
                
                observationsTerrestresAltimetric.push([
                    station_no,     // 0
                    station_E,      // 1
                    station_N,      // 2
                    station_H,      // 3
                    visee_no,       // 4
                    visee_E,        // 5
                    visee_N,        // 6
                    visee_H,        // 7
                    observation_no, // 8
                    noGro,          // 9
                    resid,          // 10
                    erMoy,          // 11
                    zi,             // 12
                    nabla,          // 13
                    wi,             // 14
                    giCoor,         // 15
                    diCoor,         // 16
                    erLat           // 17
                ]);
            };
        };
    };
};


function layerObservationsTerrestres_altimetric() {
    // Création du layer et de la source
    deniveleeLayer = new ol.layer.Vector({});
    deniveleeSource = new ol.source.Vector({});

    for (i=0; i<observationsTerrestresAltimetric.length; i++){
        let obser = observationsTerrestresAltimetric[i];

        // coordonnées de la ligne
        const coordArray = [ 
            [parseFloat(obser[1]), parseFloat(obser[2])],
            [parseFloat(obser[5]), parseFloat(obser[6])] 
        ];

        // Feature normal
        const deniveleeFeature = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray),
            name: [
                obser[0],
                obser[4]
            ],
            properties: {
                "type":"dénivelée",
                "no_obs":obser[8],
                "station":obser[0],
                "visee":obser[4],
                "v":obser[10],
                "errMoy":obser[11],
                "zi":obser[12],
                "nabla":obser[13],
                "wi":obser[14]
            }
        });

        // Calcul de l'emplacement du symbole et de la rotation
        const dE = (coordArray[1][0] - coordArray[0][0])*0.22;
        const dN = (coordArray[1][1] - coordArray[0][1])*0.22;
        const rot = gisement(dE, dN);
        
        // Style des features
        if (obser[8] === "" ) { // si l'obs. a pas de numéro (supp.), elle sera en rose et épaisse
            deniveleeFeature.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: 'rgba(0, 0, 0, 0.0)', 
                    width: 0
                })
            }));
        } else { // Si l'obs a un numéro = elle est gardée
            deniveleeFeature.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: '#000000',
                    width: 1 
                })
            }));
            // Feature du symbole de la denivele
            const deniveleeFeatureSymbol = new ol.Feature({ 
                geometry: new ol.geom.Point([
                    coordArray[0][0]+dE, 
                    coordArray[0][1]+dN
                ]),
            });
            deniveleeFeatureSymbol.setStyle( new ol.style.Style({
                image: new ol.style.Icon({
                    src: 'img/blackTriangle_icon.png',
                    scale: 0.02,
                    rotation: rot
                }),
            }));
            deniveleeSource.addFeature(deniveleeFeatureSymbol);
            deniveleeLayer.setSource(deniveleeSource);
        };
        deniveleeSource.addFeature(deniveleeFeature);
        deniveleeLayer.setSource(deniveleeSource);
    };

    // Ajout de la carte
    map.addLayer(deniveleeLayer);
    changeLayerVisibilityDenivelee_altimetric();          
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
    // obsCoordHLayer.setZIndex(99);
    console.log("Coordinates altimetric observations has been added to map");
};


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
                const featurePointGnss = new ol.Feature({
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
                const gnssStyle = new ol.style.Style({
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
    gnssLayerAltimetric.setZIndex(80);
    console.log("GNSS altimetric sessions has been added to map");
};

function parsingEllipsesXML_altimetric() {
  
    // Récupération des éléments des balises <coordinates>
    let coordinates = xmlDoc.getElementsByTagName("coordinates")[0];
    let pointsList = coordinates.getElementsByTagName("point");
  
    // ------- NIVEAU DE CONFIANCE ELLIPSES -------
    const progvers = xmlDoc.getElementsByTagName("progvers")[0];
    const titreProg = progvers.getAttribute("name");
    const nameProg = progvers.textContent;
  
    let nivConfianceEllipses;
    switch(nameProg){
        case "1" :
            nivConfianceEllipses = "95%";
            kSigma = 2.45; //  pour passer de 1 sigma à k sigma
            break;
        case "2" :
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
        case "3" :
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
        case "4" :
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
        case "5" :
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
    };
  
    // Récupération des éléments du fichier
    let allListHellipse = []
    let allListHellipseGeom = []
    for (i=0; i<pointsList.length; i++){
        if (pointsList[i].getAttribute("meanErrorH") != null){

            const errH = pointsList[i].getAttribute("meanErrorH")/1000.0
            const center = [
                parseFloat(listAllPoints.get(pointsList[i].getAttribute("name"))[0]),
                parseFloat(listAllPoints.get(pointsList[i].getAttribute("name"))[1])
            ];

            allListHellipse.push([
                pointsList[i].getAttribute("name"),
                errH,
                pointsList[i].getAttribute("altimetricElements"),
                center[0],
                center[1],
                parseFloat(listAllPoints.get(pointsList[i].getAttribute("name"))[2])
            ]);

            let listHellipse = []
            let t = range(0, 390, 10);
            t.forEach(gis => listHellipse.push([
                parseFloat(errH*kSigma*echelleEllipses*Math.cos(gis*Math.PI/180.0)+center[0]),
                parseFloat(errH*kSigma*echelleEllipses*Math.sin(gis*Math.PI/180.0)+center[1])
            ]))
            allListHellipseGeom.push(listHellipse); // tableau de toutes les coordonnées de chaque ellipses (grand)
        };
    };

    // Creation du style
    const featureEllipseStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({ 
            color: '#009933',
            width: 1
        }),    
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "italic 13px Calibri",
            fill: new ol.style.Fill({
                color: "#009933"
            }),
            stroke: new ol.style.Stroke({
                color: "#ffffff", width: 3
            }),
            offsetX: -10,
            offsetY: 10,
            rotation: 0,
            placement: "point"
        })
    });

    // Création de la source du layer
    let ellipseSourceAltimetric = new ol.source.Vector( {} );
    for (i=0; i<allListHellipse.length; i++){
        const featureEllipse = new ol.Feature({
            geometry: new ol.geom.LineString(
                allListHellipseGeom[i]
            ),
            properties: String(allListHellipse[i][1]*1000) + "mm",
        });
        featureEllipseStyle.getText().setText( String(allListHellipse[i][1]*1000) + "mm" ); 
        featureEllipse.setStyle(featureEllipseStyle);
        ellipseSourceAltimetric.addFeature(featureEllipse);
    };

    // Creation du layer
    ellipseLayerAltimetric = new ol.layer.Vector({
        source: ellipseSourceAltimetric
    });

    // Ajout du layer à la carte
    map.addLayer(ellipseLayerAltimetric);
    ellipseLayerAltimetric.setZIndex(89);
    changeLayerVisibilityEllipses_altimetric();
};

function parsingEllipsesRelaXML_altimetric() {

    // Check si il y a bien des ellipses relatives dans le PRNx 
    if (xmlDoc.getElementsByTagName("relativeEllipses").length != 0){
  
        // Récupérer que les ellipses relatives altimétriques
        const relativeEllip = xmlDoc.getElementsByTagName("relativeEllipses");
        let relativeEllipAlti = null;
        for (i=0; i<relativeEllip.length; i++){
            if (relativeEllip[i].getAttribute("type") === "altimetric") {
                relativeEllipAlti = relativeEllip[i]
            };
        };
        
        // Si on a des ellipses relatives altimétriques
        if (relativeEllipAlti !== null){
            // récupération des ellipses de confiances relatives
            const ellRelaAltiList = relativeEllipAlti.getElementsByTagName("ellipse");

            // Creation de la source du layer
            let ellipRelaAltiSource = new ol.source.Vector({});

            for (i=0; i<ellRelaAltiList.length; i++){
                pt1 = ellRelaAltiList[i].getAttribute("point1");
                pt1_E = parseFloat(listAllPoints.get(pt1)[0]);
                pt1_N = parseFloat(listAllPoints.get(pt1)[1]);
                pt2 = ellRelaAltiList[i].getAttribute("point2");
                pt2_E = parseFloat(listAllPoints.get(pt2)[0]);
                pt2_N = parseFloat(listAllPoints.get(pt2)[1]);
                erH = ellRelaAltiList[i].getAttribute("meanErrorA");

                // Feature line pour montrer la line entre les 2 points
                const ellipRelaAltiFeature_line = new ol.Feature({
                    geometry: new ol.geom.LineString([
                        [pt1_E, pt1_N],
                        [pt2_E, pt2_N]
                    ]),
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: '#009933', 
                            width: 1, 
                            lineDash: [6,2]
                        })
                    }),
                });
                ellipRelaAltiSource.addFeature(ellipRelaAltiFeature_line);

                // Feature point avec style de cercle pour la valeur
                moyCenter = [
                    (pt1_E + pt2_E)/2.0,
                    (pt1_N + pt2_N)/2.0
                ];
                // Calcul des coords (echelleEllipses = échelle d'affichage des rect. et ell.)
                let listHellipseRela = [];
                let t = range(0, 410, 10);
                t.forEach( gis => listHellipseRela.push([
                    parseFloat(erH/1000*kSigma*echelleEllipses*Math.cos(gis*Math.PI/200.0)+moyCenter[0]),
                    parseFloat(erH/1000*kSigma*echelleEllipses*Math.sin(gis*Math.PI/200.0)+moyCenter[1])
                ]));

                const ellipRelaAltiFeature_LineCircle = new ol.Feature({
                    geometry: new ol.geom.LineString(listHellipseRela),
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: '#009933',
                            width: 1,
                            lineDash: [6,2],
                        }),    
                        text: new ol.style.Text({
                            text: String(erH)+"mm",
                            textAlign: "center",
                            textBaseline: "middle",
                            font: "italic 13px Calibri",
                            fill: new ol.style.Fill({
                                color: "#009933"
                            }),
                            stroke: new ol.style.Stroke({
                                color: "#ffffff", width: 3
                            }),
                            offsetX: -10,
                            offsetY: 10,
                            rotation: 0,
                            placement: "point"
                        })
                    })
                });
                ellipRelaAltiSource.addFeature(ellipRelaAltiFeature_LineCircle);
            };

            // Creation du layer
            ellipRelaAltiLayer = new ol.layer.Vector({
                source: ellipRelaAltiSource
            });
            
            // Ajout du layer à la carte
            map.addLayer(ellipRelaAltiLayer);
            ellipRelaAltiLayer.setZIndex(90);
            changeLayerVisibilityEllipsesRela_altimetric();
        } else {
            // Si on n'a pas d'ellipses relatives altimetriques
            //console.log("There's no relatives ellipses")
            document.getElementById("legendeEllRela_altimetric").className = "checkboxLabel legendeGrise";
            document.getElementById("checkboxEllipsesRela_altimetric").disabled = true;
        };
    };
};

function parsingRectanglesXML_altimetric() {
    // Check s'il y a bien des carrés de fiabilité dans le PRNx
    if (xmlDoc.getElementsByTagName("externalReliabilityApriori").length != 0){
        // Récupération des éléments dans le fichier xml
        let externalReliabilityApriori = xmlDoc.getElementsByTagName("externalReliabilityApriori")[0];
        let pointsList = externalReliabilityApriori.getElementsByTagName("point");

        // Création des listes
        let listNH = [];
        let listCarreAll = [];
        for (let i=0; i<pointsList.length; i++){
            // S'il y a une fiabilité externe
            if (pointsList[i].getAttribute("nh") != null && pointsList[i].getAttribute("nh") != "infinite") {
                const pointName = pointsList[i].getAttribute("name");
                const nh = pointsList[i].getAttribute("nb")/1000.0; // en [m]
                const center = [parseFloat(listAllPoints.get(pointName)[0]),parseFloat(listAllPoints.get(pointName)[1])];
                listNH.push([String((nh*1000.0).toFixed(1)) + "mm"]);

                let listCarre = [];
                listCarre.push([center[0]+nh*echelleEllipses, center[1]+nh*echelleEllipses]);
                listCarre.push([center[0]+nh*echelleEllipses, center[1]-nh*echelleEllipses]);
                listCarre.push([center[0]-nh*echelleEllipses, center[1]-nh*echelleEllipses]);
                listCarre.push([center[0]-nh*echelleEllipses, center[1]+nh*echelleEllipses]);
                listCarre.push([center[0]+nh*echelleEllipses, center[1]+nh*echelleEllipses]);
                listCarreAll.push(listCarre);
            } else if (pointsList[i].getAttribute("nh") != null && pointsList[i].getAttribute("nh") === "infinite") { // S'il n'y a pas de fiabilité externe ; carré infini
                const pointName = pointsList[i].getAttribute("name");
                const center = [parseFloat(listAllPoints.get(pointName)[0]),parseFloat(listAllPoints.get(pointName)[1])];
                listNH.push(["INFINI"]);

                let listCarre = [];
                for (let i=0; i<5; i++){
                    listCarre.push(center);
                };
                listCarreAll.push(listCarre);
            };
        }

        // Création du source du layer
        const rectangleEllipseAltimetric = new ol.source.Vector({ });

        for (let i=0; i<listCarreAll.length; i++){
            coordArray_i = listCarreAll[i];
            const featureSquare = new ol.Feature({
                geometry: new ol.geom.LineString(coordArray_i),
                properties: listNH[i][0],
            });
            rectangleEllipseAltimetric.addFeature(featureSquare);
        };

        // Création du style du layer
        let styleSquare = new ol.style.Style({
            stroke: new ol.style.Stroke({ 
                color: '#00AD02', 
                width: 1 
            }),
            text: new ol.style.Text({
                textAlign: "center",
                textBaseline: "middle",
                font: "italic 13px Calibri",
                fill: new ol.style.Fill({
                    color: "#00AD02"
                }),
                stroke: new ol.style.Stroke({
                    color: "#ffffff", width: 3
                }),
                offsetX: -10,
                offsetY: 10,
                rotation: 0,
                placement: "point"
            })
        });

        // Création du layer
        rectangleLayerAltimetric = new ol.layer.Vector({
            source: rectangleEllipseAltimetric,
            style: function (feature) { // la propriété style prend un callback qui doit retourner un style
                styleSquare.getText().setText(feature.get("properties")); 
                return styleSquare;
            }
        });
    
        // Ajout de la carte à map
        map.addLayer(rectangleLayerAltimetric);
        changeLayerVisibilityRect_altimetric();
    }
};


function parsingRectanglesRelaXML_altimetric() {
    // Check s'il a des rectangles relatifs dans le fichier PRNx
    if (xmlDoc.getElementsByTagName("relativeRectangles").length != 0){

        // Récupération des balises
        const relativeRectangles = xmlDoc.getElementsByTagName("relativeRectangles");
        let relativeRectanglesAlti = null;
        for (let i=0; i<relativeRectangles.length; i++){
            if (relativeRectangles[i].getAttribute("type") === "altimetric"){
                relativeRectanglesAlti = relativeRectangles[i];
            }
        };

        // Si la variable contient vraiment quelque chose
        if (relativeRectanglesAlti.length !== null){
            // Lister les rectangles altimétriques relatifs
            const relativeRectanglesAlti_list = relativeRectanglesAlti.getElementsByTagName("rectangle");
            
            // Créations des listes pour les features
            let listCarreAll = [];
            let listNH = [];
            let listP1P2 = [];
            let listCenter = []

            // Récupération des rectangles individuellement
            for (let i=0; i<relativeRectanglesAlti_list.length; i++){
                if (relativeRectanglesAlti_list[i].getAttribute("na") != null){
                    const pt1_name = relativeRectanglesAlti_list[i].getAttribute("point1");
                    const pt2_name = relativeRectanglesAlti_list[i].getAttribute("point2");
                    const nh = relativeRectanglesAlti_list[i].getAttribute("na")/1000.0;

                    const coord1 = [
                        parseFloat(listAllPoints.get(pt1_name)[0]),
                        parseFloat(listAllPoints.get(pt1_name)[1]),
                    ];
                    const coord2 = [
                        parseFloat(listAllPoints.get(pt2_name)[0]),
                        parseFloat(listAllPoints.get(pt2_name)[1]),
                    ];
                    const center = [
                        (coord1[0]+coord2[0])/2.0,
                        (coord1[1]+coord2[1])/2.0
                    ];

                    listCarreAll.push([
                        [center[0]+nh*echelleEllipses, center[1]+nh*echelleEllipses],
                        [center[0]+nh*echelleEllipses, center[1]-nh*echelleEllipses],
                        [center[0]-nh*echelleEllipses, center[1]-nh*echelleEllipses],
                        [center[0]-nh*echelleEllipses, center[1]+nh*echelleEllipses],
                        [center[0]+nh*echelleEllipses, center[1]+nh*echelleEllipses]
                    ]);
                    listNH.push([String((nh*1000.0).toFixed(1)) + "mm"]);
                    listP1P2.push([
                        coord1,
                        coord2
                    ]);
                    listCenter.push(center);
                };
            };

            // Création des features
            const rectanglesRelaAltimetric_source = new ol.source.Vector({ });

            for (let i=0; i<listCarreAll.length; i++){
                const featureRectangleRela = new ol.Feature({
                    geometry: new ol.geom.LineString(
                        listCarreAll[i]
                    ),
                    properties: listNH[i][0]
                });
                const featureRectangleRela_line = new ol.Feature({
                    geometry: new ol.geom.LineString(
                        listP1P2[i]
                    )
                });

                rectanglesRelaAltimetric_source.addFeature(featureRectangleRela);
                rectanglesRelaAltimetric_source.addFeature(featureRectangleRela_line);
            };

            // Création du layer
            const styleSquare = new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: '#00D5A7', 
                    width: 1, 
                    lineDash: [6,2]
                }),
                text: new ol.style.Text({
                    textAlign: "center",
                    textBaseline: "middle",
                    font: "italic 13px Calibri",
                    fill: new ol.style.Fill({
                        color: "#00D5A7"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "#ffffff", width: 3
                    }),
                    offsetX: -10,
                    offsetY: 10,
                    rotation: 0,
                    placement: "point"
                })
            });
            rectangleRelaLayerAlti = new ol.layer.Vector({
                source: rectanglesRelaAltimetric_source,
                style: function (feature) { // la propriété style prend un callback qui doit retourner un style
                    styleSquare.getText().setText(feature.get("properties")); 
                return styleSquare;
                }
            });

            // Ajout du layer à la map
            map.addLayer(rectangleRelaLayerAlti);
            changeLayerVisibilityRectRela_altimetric();
        };
    };
};


function parsingVectXML_altimetric() {
    // Récupération de la balise complète <coordinate>
    const coordinates = xmlDoc.getElementsByTagName("coordinates")[0];
    const pointsList = coordinates.getElementsByTagName("point");

    // Création de la source du layer des features
    const vectLayerAlti_source = new ol.source.Vector({});

    // Parcours de la liste des points
    for (let i=0; i<pointsList.length; i++){

        // On ne garde que les éléments dh
        if (pointsList[i].getAttribute("dh") != null){

            if (pointsList[i].getAttribute("dh") != 0.0){
                // Attribution des éléments
                const pt_name = pointsList[i].getAttribute("name");
                const dh = parseFloat(pointsList[i].getAttribute("dh"))/1000.0;
                const center = [
                    parseFloat(listAllPoints.get(pt_name)[0]),
                    parseFloat(listAllPoints.get(pt_name)[1])
                ];

                const arrow = [
                    center,
                    [ center[0], center[1]+echelleEllipses*dh ],
                    [ center[0] + (Math.abs(dh)/5)*echelleEllipses*Math.sin(250*Math.PI/200.0), center[1]+echelleEllipses*dh + (Math.abs(dh)/5)*echelleEllipses*Math.cos(250*Math.PI/200.0) ],
                    [ center[0], center[1]+echelleEllipses*dh ],
                    [ center[0] + (Math.abs(dh)/5)*echelleEllipses*Math.sin(150*Math.PI/200.0), center[1]+echelleEllipses*dh + (Math.abs(dh)/5)*echelleEllipses*Math.cos(150*Math.PI/200.0) ],
                ];

                const featureVecAlti = new ol.Feature({
                    geometry: new ol.geom.LineString(arrow),
                    properties: String((dh*1000.0).toFixed(1)) + 'mm', 
                });
                vectLayerAlti_source.addFeature(featureVecAlti);
            }
        }
    }

    // Création du layer de la map
    const styleVect = new ol.style.Style({
        stroke: new ol.style.Stroke({ 
            color: '#FF0000', 
            width: 1 
        }),
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "13px Calibri",
            fill: new ol.style.Fill({
                color: "#FF0000"
            }),
            stroke: new ol.style.Stroke({
                color: "#ffffff", width: 3
            }),
            offsetX: 10,
            offsetY: -10,
            rotation: 0,
            placement: "point"
        })
    });
    vectLayerAlti = new ol.layer.Vector({
        source: vectLayerAlti_source,
        style: function (feature) { // la propriété style prend un callback qui doit retourner un style
            styleVect.getText().setText(feature.get("properties")); 
            return styleVect;
        }
    });

    // Ajout de layer à la map
    map.addLayer(vectLayerAlti);
    changeLayerVisibilityVect_altimetric();

}

function fiabLocale_altimetric() {
    // Création de la source pour traitement graphique et nouveau layer
    fiabLocaleSourceAlti = new ol.source.Vector({});

    // Parcourir la source et gérer les styles pour chaque features
    for (let i=0; i<observationsTerrestresAltimetric.length; i++) {

        const obser = observationsTerrestresAltimetric[i]
        const zi = parseFloat(obser[12]);
        const noObs = obser[8];

        // Paramètres des zi
        let colorFiab;
        let widthFiab;
        let zIndex;
        // Attribution des couleurs de zi
        if (zi < 25.0) {
            colorFiab = "#FF1700";
            widthFiab = 3;
            zIndex = 99;
        } else if (zi <= 50.0) {
            colorFiab = "#FFD000";
            widthFiab = 1.5;
            zIndex = 98;
        } else if (zi <= 75.0) {
            colorFiab = "#ABFF00";
            widthFiab = 0;
            zIndex = 1;
        } else if (zi <= 100.0) {
            colorFiab = "#2AE100";
            widthFiab = 0;
            zIndex = 1;
        };

        // Si l'obs. est supprimée
        if (noObs === "") { 
            colorFiab ="rgba(0, 0, 0, 0.0)" // transparent
        };

        // Création du feature de l'observation
        const deniveleeFeature = new ol.Feature({
            geometry: new ol.geom.LineString([ 
                [parseFloat(obser[1]), parseFloat(obser[2])],
                [parseFloat(obser[5]), parseFloat(obser[6])] 
            ]),
            name: [
                obser[0],
                obser[4]
            ],
            properties: {
                "type":"dénivelée",
                "no_obs":obser[8],
                "station":obser[0],
                "visee":obser[4],
                "v":obser[10],
                "errMoy":obser[11],
                "zi":obser[12],
                "nabla":obser[13],
                "wi":obser[14]
            }
        });

        // Calcul de l'emplacement du symbole et de la rotation
        const dE = (parseFloat(obser[5]) - parseFloat(obser[1]))*0.22;
        const dN = (parseFloat(obser[6]) - parseFloat(obser[2]))*0.22;
        const rot = gisement(dE, dN);
        
        // Style des features
        if (obser[8] === "" ) { // si l'obs. a pas de numéro (supp.), elle sera en rose et épaisse
            deniveleeFeature.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: colorFiab, 
                    width: 0
                })
            }));
        } else { // Si l'obs a un numéro = elle est gardée
            deniveleeFeature.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: colorFiab,
                    width: 1 + widthFiab,
                })
            }));
            // Feature du symbole de la denivele
            const deniveleeFeatureSymbol = new ol.Feature({ 
                geometry: new ol.geom.Point([
                    parseFloat(obser[1])+dE, 
                    parseFloat(obser[2])+dN
                ]),
            });
            deniveleeFeatureSymbol.setStyle( new ol.style.Style({
                image: new ol.style.Icon({
                    src: 'img/triangle_'+String(colorFiab).slice(1,10)+'.svg',
                    scale: 0.015 + widthFiab/100,
                    rotation: rot,
                    color: colorFiab
                }),
            }));
            deniveleeFeatureSymbol.getStyle().setZIndex(zIndex);
            fiabLocaleSourceAlti.addFeature(deniveleeFeatureSymbol);
        };
        deniveleeFeature.getStyle().setZIndex(zIndex);
        fiabLocaleSourceAlti.addFeature(deniveleeFeature);
    };
    
    // Création du layer
    fiabLocalLayerAlti = new ol.layer.Vector({
        source: fiabLocaleSourceAlti
    });

    // Ajout du layer à la map
    map.addLayer(fiabLocalLayerAlti);
    fiabLocalLayerAlti.setVisible(false);
    fiabLocalLayerAlti.setZIndex(80);
};


function normedResidualsWi_altimetric() {

    // Wi pas disponibles si une pré-analyse
    if (xmlDoc.getElementsByTagName("biggestWi").length != 0) {
        let statistics = xmlDoc.getElementsByTagName("statistics");

        // Récupérer les WI maxi
        let biggestWi;
        for (let i=0; i<statistics.length; i++){
            if (statistics[i].getAttribute("type") == "altimetric"){
                biggestWi = statistics[i].getElementsByTagName("biggestWi");
                biggestWi = biggestWi[0];
            }
            //TODO : bloquer la carte etc si pas de résidus altimétriques
        };

        // Création de la source pour traitement graphique et nouveau layer
        const wiSourceAlti = new ol.source.Vector({});

        // Récupération des valeurs pour les bornes
        limitWiAlti = parseFloat(biggestWi.getAttribute("biggerThan"));
        limitInfAlti = limitWiAlti - 0.2;

        // parcourir la source et géréer les styles pour chaques features
        for (let i=0; i<observationsTerrestresAltimetric.length; i++) {

            const obser = observationsTerrestresAltimetric[i];
            const obsNo = obser[8];
            const wi_i = obser[14];

            // Coordonnées des stations & visée
            const coordArray_i = [
                [parseFloat(obser[1]), parseFloat(obser[2])],
                [parseFloat(obser[5]), parseFloat(obser[6])]
            ];

            // Paramètres visualisation wi
            let colorWi;
            let widthWi;
            let zIndex;
            // Attribution des couleurs des paliers de wi
            if (wi_i >= limitWi) {
                colorWi = "#FF1700";
                widthWi = 3;
                zIndex = 99;
            } else if (wi_i > limitInf) {
                colorWi = "#FFD000";
                widthWi = 2;
                zIndex = 98;
            } else if (wi_i < limitInf) {
                colorWi = "#2AE100";
                widthWi = 0;
                zIndex = 1;
            };
            // Si l'obs. est supprimée
            if (obsNo === "") { 
                colorWi ="rgba(0, 0, 0, 0.0)" // transparent
            };

            // Création du feature de l'observation
            const deniveleeFeature = new ol.Feature({
                geometry: new ol.geom.LineString(coordArray_i),
                name: [
                    obser[0],
                    obser[4]
                ],
                properties: {
                    "type":"dénivelée",
                    "no_obs":obser[8],
                    "station":obser[0],
                    "visee":obser[4],
                    "v":obser[10],
                    "errMoy":obser[11],
                    "zi":obser[12],
                    "nabla":obser[13],
                    "wi":obser[14]
                }
            });

            // Calcul de l'emplacement du symbole et de la rotation
            const dE = (parseFloat(obser[5]) - parseFloat(obser[1]))*0.22;
            const dN = (parseFloat(obser[6]) - parseFloat(obser[2]))*0.22;
            const rot = gisement(dE, dN);

            // Style des features
            if (obser[8] === "" ) { // si l'obs. a pas de numéro (supp.), elle sera en rose et épaisse
                deniveleeFeature.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorWi, 
                        width: 0
                    })
                }));
            } else { // Si l'obs a un numéro = elle est gardée
                deniveleeFeature.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorWi,
                        width: 1 + widthWi,
                    })
                }));
                // Feature du symbole de la denivele
                const deniveleeFeatureSymbol = new ol.Feature({ 
                    geometry: new ol.geom.Point([
                        parseFloat(obser[1])+dE, 
                        parseFloat(obser[2])+dN
                    ]),
                });
                deniveleeFeatureSymbol.setStyle( new ol.style.Style({
                    image: new ol.style.Icon({
                        src: 'img/triangle_'+String(colorWi).slice(1,10)+'.svg',
                        scale: 0.015 + widthWi/100,
                        rotation: rot,
                        color: colorWi
                    }),
                }));
                deniveleeFeatureSymbol.getStyle().setZIndex(zIndex);
                wiSourceAlti.addFeature(deniveleeFeatureSymbol);
            };
            deniveleeFeature.getStyle().setZIndex(zIndex);
            wiSourceAlti.addFeature(deniveleeFeature);
        };

        // Création du layer
        wiLayerAlti = new ol.layer.Vector({
            source: wiSourceAlti
        });

        // Ajout du layer à la map
        map.addLayer(wiLayerAlti);
        // wiLayerAlti.setVisible(false);
        changeLayerVisibilityResidusNormes_altimetric();
        wiLayerAlti.setZIndex(50);
    };
};