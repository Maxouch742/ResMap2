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
        obser = observationsTerrestresAltimetric[i];

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
    obsCoordHLayer.setZIndex(99);
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
    gnssLayerAltimetric.setZIndex(80);
    console.log("GNSS altimetric sessions has been added to map");
};

function parsingEllipsesXML_altimetric() {
  
    // Récupération des éléments des balises <coordinates>
    let coordinates = xmlDoc.getElementsByTagName("coordinates")[0];
    let pointsList = coordinates.getElementsByTagName("point");
  
    // ------- NIVEAU DE CONFIANCE ELLIPSES -------
    let progvers = xmlDoc.getElementsByTagName("progvers")[0];
    titreProg = progvers.getAttribute("name");
    nameProg = progvers.textContent;
  
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
    ellipseLayerAltimetric = new ol.layer.Vector({});
    ellipseLayerAltimetric.setSource(ellipseSourceAltimetric);

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

        // Création de l'observation
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

        // Créer la source comprenant les features d'observations (sources de base)
        wiSourceBaseAltitude = new ol.source.Vector({});
        wiSourceBaseAltitude.addFeatures(deniveleeSource.getFeatures());

        // Création de la source pour traitement graphique et nouveau layer
        wiSourceAlti = new ol.source.Vector({});
        wiLayerAlti = new ol.layer.Vector({});

        // Récupération des valeurs pour les bornes
        limitWiAlti = parseFloat(biggestWi.getAttribute("biggerThan"));
        limitInfAlti = limitWiAlti - 0.2;

        /*

        // parcourir la source et géréer les styles pour chaques features
        for (let i=0; i<wiSourceBaseAltitude.getFeatures().length; i++) {

            let feature = wiSourceBaseAltitude.getFeatures()[i].clone();
            let propertiesWi = feature.getProperties().properties
            if (propertiesWi != null){
                let wi = Math.abs(parseFloat(propertiesWi.wi).toFixed(2)); // get le wi et le stocker en int (valeur absolue)
                let noObs = propertiesWi.no // get le numéro d'obs. et le stocker en str
                
                // Attribution des couleurs des paliers de wi
                if (wi >= limitWiAlti) {
                    colorWi = "#FF1700";
                    widthWi = 3;
                    zIndex = 99;
                } else if (wi > limitInfAlti) {
                    colorWi = "#FFD000";
                    widthWi = 2;
                    zIndex = 98;
                } else if (wi < limitInfAlti) {
                    colorWi = "#2AE100";
                    widthWi = 0;
                    zIndex = 1;
                };

                // Si l'obs. est supprimée
                if (noObs === "") { 
                    colorWi ="rgba(0, 0, 0, 0.0)" // transparent
                };

                // Attribution du style en fonction du wi et du typeObs (variables)
                feature.getStyle().setZIndex(zIndex);
                feature.getStyle().getStroke().setColor(colorWi);
                let widthF = feature.getStyle().getStroke().getWidth();
                feature.getStyle().getStroke().setWidth(widthF + widthWi); // épaissir en fonction du wi

                // Ajout des features au vector source
                wiSourceAlti.addFeature(feature);
            };
        };

        // Ajout de la source (contenant les features) au Layer + divers
        wiLayerAlti.setSource(wiSourceAlti);
        wiLayerAlti.setVisible(false);
        wiLayerAlti.setZIndex(80);
        map.addLayer(wiLayerAlti);
        changeLayerVisibilityResidusNormes_altimetric();
        //console.log("Carte des résidus normés wi ajoutée")

        // Gestion des intervalles de la légende en fonction du Wi limite (issu des param. du calcul LTOP)
        document.getElementById("palierWi1").textContent = "――  "+String(limitWiAlti)+" - ∞";
        document.getElementById("palierWi2").textContent = "――  "+String(limitInfAlti)+" - "+String(limitWiAlti);
        document.getElementById("palierWi3").textContent = "――  0.0 - "+String(limitInfAlti);

    } else { // Si c'est une pré-analyse
        //console.log("Pas de wi dans une pré-analyse")
        document.getElementById("legendeWi").className = "checkboxLabel legendeBarree";
    */
    };
};


function parsingVectXML_altimetric() {

    // Récupération des éléments des balises <coordinates>
    let coordinates = xmlDoc.getElementsByTagName("coordinates")[0];
    let pointsList = coordinates.getElementsByTagName("point");

    let vectLineSource = new ol.source.Vector({});


    for (i=0; i<pointsList.length; i++){
        // Tri pour garder uniquement les valeurs existantes de dh
        if ( pointsList[i].getAttribute("dh") != null ) {
            // Tri pour garder uniquement les dy et dx non-nuls (si dy!=0.0 et dx!=0.0)
            if ( pointsList[i].getAttribute("dh") != 0.0) {

                // Attribution des éléments des vecteurs
                const pointName = pointsList[i].getAttribute("name");
                const dh = parseFloat(pointsList[i].getAttribute("dh"))/1000.0; // en [m]
                const norm = Math.sqrt(dh**2); // en [m]
                const center = [parseFloat(listAllPoints.get(pointName)[0]),parseFloat(listAllPoints.get(pointName)[1])];
                const Earrow = center[0]
                const Narrow = center[1]+echelleEllipses*dh;

                // Calcul des éléments pour la flèches  du vecteur [g] et [m]
                let gisArrow1 = 200.0 + 50.0;
                let gisArrow2 = 200.0 - 50.0;
                if (dh < 0){
                    gisArrow1 = 350.0;
                    gisArrow2 = 50.0;
                }

                const Ea1 = (norm/5)*echelleEllipses*Math.sin(gisArrow1*Math.PI/200.0) + Earrow;
                const Na1 = (norm/5)*echelleEllipses*Math.cos(gisArrow1*Math.PI/200.0) + Narrow;
                const Ea2 = (norm/5)*echelleEllipses*Math.sin(gisArrow2*Math.PI/200.0) + Earrow;
                const Na2 = (norm/5)*echelleEllipses*Math.cos(gisArrow2*Math.PI/200.0) + Narrow;

                // Calcul des coordonnées du vecteur avec la flèche
                const listENvect = [ 
                    center, 
                    [Earrow, Narrow], 
                    [Ea1, Na1],
                    [Earrow, Narrow], 
                    [Ea2, Na2]
                ];                                       
                
                // Création de la Feature
                let featureEllipse = new ol.Feature({
                    geometry: new ol.geom.LineString(listENvect),
                    properties: String((norm*1000.0).toFixed(1)) + 'mm',  // norme du vecteur de diff. pour affichage
                });
                vectLineSource.addFeature(featureEllipse);
            };
        };
    };

    // Création du style labelText pour demi-grand axe a
    let textStyleVect = new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "13px Calibri",
        fill: new ol.style.Fill({
        color: "#FF0000"
        }),
        stroke: new ol.style.Stroke({
        color: "#ffffff", width: 3
        }),
        offsetX: -10,
        offsetY: -10,
        rotation: 0,
        placement: "point"
    });

    // Création du style vecteurs
    let styleVect = new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#FF0000', width: 1 }),
        text: textStyleVect
    });

    // Création du Layer ellipses
    vectLayerAltimetric = new ol.layer.Vector({
        source: vectLineSource,
        style: function (feature) { // la propriété style prend un callback qui doit retourner un style
            styleVect.getText().setText(feature.get("properties")); 
            return styleVect;
        }
    });

    // Ajout à la carte
    map.addLayer(vectLayerAltimetric);
    vectLayerAltimetric.setZIndex(79);
    changeLayerVisibilityVect_altimetric();
    //console.log("Diff. heights vectors have been added to map");
};

