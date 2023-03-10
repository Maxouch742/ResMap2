/** 
 * This function parses the PRNx file (language : XML) to get and
 * generate the ellipses on the map (with scale factor)
 */
function parsingEllipsesXML_planimetric() {
    // Ancien nom : parsingEllipsesXML
  
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
            nivConfianceEllipses = "39%";
            kSigma = 1.0;
            break;
        case "3" :
            nivConfianceEllipses = "39%";
            kSigma = 1.0;
            break;
        case "4" :
            nivConfianceEllipses = "39%";
            kSigma = 1.0;
            break;
        case "5" :
            nivConfianceEllipses = "39%";
            kSigma = 1.0;
            break;
    };
  
    // Initialisation des boucles pour création d'ellipses
    let t = range(0, 390, 10);
    let allListENellipse = []
    let allListAzimut = []
    let allListCenter = []
    let listA = []
  
    for (i=0; i<pointsList.length; i++){
        if ( pointsList[i].getAttribute("meanErrorA") != null) {
            let pointName = pointsList[i].getAttribute("name");
            let a = pointsList[i].getAttribute("meanErrorA")/1000.0; // en [m]
            listA.push([(a*1000.0*kSigma).toFixed(1)]);
            let b = pointsList[i].getAttribute("meanErrorB")/1000.0; // en [m]
            let center = [parseFloat(listAllPoints.get(pointName)[0]),parseFloat(listAllPoints.get(pointName)[1])]
            allListAzimut.push([pointsList[i].getAttribute("azimuthA")/3.1415*180.0]) // en [rad]
            allListCenter.push([center[0],center[1]]);
            
            let listENellipse = []
            t.forEach(gis => listENellipse.push([
                parseFloat(a*kSigma*echelleEllipses*Math.cos(gis*3.1415/180.0)+center[0]),
                parseFloat(b*kSigma*echelleEllipses*Math.sin(gis*3.1415/180.0)+center[1])
            ]))
            allListENellipse.push(listENellipse); // tableau de toutes les coordonnées de chaque ellipses (grand)
        };
    };
  
    // création et ajout des feature dans la source (contient geom) pour ellipses (LineString)
    let ellipsesLineSource = new ol.source.Vector({});
  
    for (let i = 0; i < allListENellipse.length; i++) {
        let coordArray_i = allListENellipse[i];
        let featureEllipse = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
            properties: String(listA[i]) + "mm",
        })
        featureEllipse.getGeometry().rotate(allListAzimut[i],allListCenter[i])   
        ellipsesLineSource.addFeature(featureEllipse);
    };
  
    // Création du style labelText pour demi-grand axe a
    let textStyleEllipse = new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "italic 13px Calibri",
        fill: new ol.style.Fill({
            color: "#FF6BF1"
        }),
        stroke: new ol.style.Stroke({
            color: "#ffffff", width: 3
        }),
        offsetX: -10,
        offsetY: 10,
        rotation: 0,
        placement: "point"
    });
  
    // Création du style ellipses
    let styleEllipse = new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#FF6BF1', width: 1 }),
        text: textStyleEllipse
    });
  
    // Création du Layer ellipses
    ellipseLayer = new ol.layer.Vector({
        source: ellipsesLineSource,
        style: function (feature) { // la propriété style prend un callback qui doit retourner un style
            styleEllipse.getText().setText(feature.get("properties")); 
            return styleEllipse;
        }
    });
  
    map.addLayer(ellipseLayer);
    ellipseLayer.setZIndex(89)
    changeLayerVisibilityEllipses_planimetric()
};

  
/** Function used to create an array with steps between 2 values
 * 
 * @param {int} start : value to start array
 * @param {int} stop : value to stop array
 * @param {int} step : step of value's array
 * @return {array} arr : array returned
 */
function range(start, stop, step){
    step = step || 1;
    var arr = [];
    for (var i=start;i<stop;i+=step){
       arr.push(i);
    }
    return arr;
};


/** This function parses the PRNx file (language : XML) to get
 *  and generate the relatives ellipses on the map (with scale factor)
 */
function parsingEllipsesRelaXML_planimetric() {
    // Ancien nom : parsingEllipsesRelaXML

    // Check si il y a bien des ellipses relatives dans le PRNx 
    if (xmlDoc.getElementsByTagName("relativeEllipses").length != 0){
  
        // TODO : récupérer que les ellipses relatives planimétriques
        let relativeEllipses = xmlDoc.getElementsByTagName("relativeEllipses")[0];
        let ellRelaList = relativeEllipses.getElementsByTagName("ellipse");
    
        // Initialisation des boucles pour création d'ellipses
        let t = range(0, 410, 10);
        let allListENellipse = []
        let allListAzimut = []
        let allListCenters = []
        let allListP1P2 = []
        let listA = []
    
        // Récupération des éléments du fichier PRNx et calcul des coords de l'éllipse
        for (i=0; i<ellRelaList.length; i++){
            if ( ellRelaList[i].getAttribute("meanErrorA") != null) {
            let pointName1 = ellRelaList[i].getAttribute("point1");
            let pointName2 = ellRelaList[i].getAttribute("point2");
            let a = ellRelaList[i].getAttribute("meanErrorA")/1000.0; // en [m]
            listA.push([(a*1000.0*kSigma).toFixed(1)]);
            let b = ellRelaList[i].getAttribute("meanErrorB")/1000.0; // en [m]
            let coord1 = [parseFloat(listAllPoints.get(pointName1)[0]),parseFloat(listAllPoints.get(pointName1)[1])]
            let coord2 = [parseFloat(listAllPoints.get(pointName2)[0]),parseFloat(listAllPoints.get(pointName2)[1])]
            allListP1P2.push([coord1,coord2]);
            let moyCenter = [parseFloat(((coord1[0]+coord2[0])/2).toFixed(3)), parseFloat(((coord1[1]+coord2[1])/2).toFixed(3))]
            allListAzimut.push([ellRelaList[i].getAttribute("azimuthA")/3.1415*180.0]) // en [rad]
            allListCenters.push([moyCenter[0],moyCenter[1]]); // Centre moyen des 2 points
            
            // Calcul des coords (echelleEllipses = échelle d'affichage des rect. et ell.)
            let listENellipse = [];
            t.forEach( gis => listENellipse.push( [parseFloat(a*kSigma*echelleEllipses*Math.cos(gis*3.1415/200.0)+moyCenter[0]),
                parseFloat(b*kSigma*echelleEllipses*Math.sin(gis*3.1415/200.0)+moyCenter[1])] ) )
            allListENellipse.push(listENellipse); // tableau de toutes les coordonnées de chaque ellipses (grand)
            };
        };
    
        // création et ajout des feature dans la source (contient geom) pour ellipses (LineString)
        let ellipsesRelaLineSource = new ol.source.Vector({});
    
        for (let i = 0; i < allListENellipse.length; i++) {
    
            let coordArray_i = allListENellipse[i];
            // let coord12Array_i = [[0,0],[0,0]]
            
            let lineStringEllRela = new ol.geom.LineString(coordArray_i);
            // let lineStringP1P2 = new ol.geom.LineString(coord12Array_i);
            let geomEllRela = lineStringEllRela;
    
            let featureEllipse = new ol.Feature({
            geometry: geomEllRela,
            properties: String(listA[i]) + "mm",
            })
            let featureLineP1P2 = new ol.Feature({ // Ligne simple reliant les 2 points relatifs
            geometry: new ol.geom.LineString(allListP1P2[i]),
            });
    
            featureEllipse.getGeometry().rotate(allListAzimut[i],allListCenters[i])   
            ellipsesRelaLineSource.addFeature(featureEllipse);
            ellipsesRelaLineSource.addFeature(featureLineP1P2);
        };
    
        // Création du style labelText pour demi-grand axe a
        let textStyleEllipse = new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "italic 13px Calibri",
            fill: new ol.style.Fill({
            color: "#FFAF42"
            }),
            stroke: new ol.style.Stroke({
            color: "#ffffff", width: 3
            }),
            offsetX: -10,
            offsetY: 10,
            rotation: 0,
            placement: "point"
        });
    
        // Création du style ellipses
        let styleEllipse = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FFAF42', 
                width: 1, 
                lineDash: [6,2] 
            }),
            text: textStyleEllipse
        });
    
        // Création du Layer ellipses
        ellipseRelaLayer = new ol.layer.Vector({
            source: ellipsesRelaLineSource,
            style: function (feature) { // la propriété style prend un callback qui doit retourner un style
            styleEllipse.getText().setText(feature.get("properties")); 
            return styleEllipse;
            }
        });
        
        map.addLayer(ellipseRelaLayer);
        changeLayerVisibilityEllipsesRela_planimetric()
        ellipseRelaLayer.setZIndex(90);
    } else {
        //console.log("There's no relatives ellipses")
        document.getElementById("legendeEllRela").className = "checkboxLabel legendeBarree";
    };
};

/**
 * This function parses the PRNX file (language : XML) to get and
 * generate the external reliability rectangles on the map (with
 * scale factor; some as ellipses) 
 */
function parsingRectanglesXML_planimetric() {
    // Ancien nom : parsingRectanglesXML

    // Récupération des éléments des balises <externalReliabilityApriori>
    // Check si il y a bien des rectangles de fiabilité dans le PRNx 
    if (xmlDoc.getElementsByTagName("externalReliabilityApriori").length != 0){
        let externalReliabilityApriori = xmlDoc.getElementsByTagName("externalReliabilityApriori")[0];
        let pointsList = externalReliabilityApriori.getElementsByTagName("point");
    
        let allListENrectangle = []
        let allListAzimut = []
        let allListCenter = []
        let listNA = []
    
        // Récupération des éléments du fichier PRNx et calcul des coords du rectangle
        for (i=0; i<pointsList.length; i++){
            if ( pointsList[i].getAttribute("na") != null && pointsList[i].getAttribute("na") != "infinite") {
                let pointName = pointsList[i].getAttribute("name");
                let na = pointsList[i].getAttribute("na")/1000.0; // en [m]
                let nb = pointsList[i].getAttribute("nb")/1000.0; // en [m]
                center = [parseFloat(listAllPoints.get(pointName)[0]),parseFloat(listAllPoints.get(pointName)[1])]
                allListAzimut.push([pointsList[i].getAttribute("azimuthN")/3.1415*180.0]) // en [rad]
                allListCenter.push([center[0],center[1]]);
                listNA.push([String((na*1000.0).toFixed(1)) + "mm"]); // Pour l'ajout du label
                
                // Calcul des coords (echelleEllipses = échelle d'affichage des rect. et ell.)
                listENrectangle = []
                listENrectangle.push([center[0]-nb*echelleEllipses, echelleEllipses*na+center[1]]);
                listENrectangle.push([center[0]+nb*echelleEllipses, echelleEllipses*na+center[1]]);
                listENrectangle.push([center[0]+nb*echelleEllipses, -echelleEllipses*na+center[1]]);
                listENrectangle.push([center[0]-nb*echelleEllipses, -echelleEllipses*na+center[1]]);
                listENrectangle.push([center[0]-nb*echelleEllipses, echelleEllipses*na+center[1]]);
        
                allListENrectangle.push(listENrectangle); // tableau de toutes les coordonnées de chaque rectangle (grand)
            }
            // Si il n'y a pas de fiab. externe -->  = infini sur la map
            else if (pointsList[i].getAttribute("na") != null && pointsList[i].getAttribute("na") === "infinite") {
                let pointName = pointsList[i].getAttribute("name");
                let center = [parseFloat(listAllPoints.get(pointName)[0]),parseFloat(listAllPoints.get(pointName)[1])]
                allListAzimut.push([0.0])
                allListCenter.push([center[0],center[1]]);
                listNA.push(['INFINI']);
                
                listENrectangle = []
                for(let j=0; j<5; j++) {
                    listENrectangle.push([center[0], center[1]]);
                };
                allListENrectangle.push(listENrectangle);
            };
        };
    
        // création et ajout des recangles sur la map (MultiLineString)
        let rectanglesLineSource = new ol.source.Vector({});
    
        for (let i = 0; i < allListENrectangle.length; i++) {
            coordArray_i = allListENrectangle[i];
            featureRectangle = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
            properties: listNA[i][0],
            })
            featureRectangle.getGeometry().rotate(allListAzimut[i],allListCenter[i])   
            rectanglesLineSource.addFeature(featureRectangle);
        };
    
        // Création du style labelText pour demi-grand axe na du rect.
        let textStyleRectangle = new ol.style.Text({
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
        });
    
        // Création du style rectangles
        let styleRectangle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#00AD02', width: 1 }),
            text: textStyleRectangle
        });
    
        // Création du Layer rectangles
        rectangleLayer = new ol.layer.Vector({
            source: rectanglesLineSource,
            style: function (feature) { // la propriété style prend un callback qui doit retourner un style
                styleRectangle.getText().setText(feature.get("properties")); 
                return styleRectangle;
            }
        });
    
        map.addLayer(rectangleLayer);
        rectangleLayer.setZIndex(88);
        changeLayerVisibilityRectangles_planimetric();
    }
};

/**
 * This function parses the PRNx file (language : XML) to get
 * and generate the relatives reliability rectangles on the map
 */
function parsingRectanglesRelaXML_planimetric() {
    // Ancien nom : parsingRectanglesRelaXML

    // Check si il y a bien des ellipses relatives dans le PRNx 
    if (xmlDoc.getElementsByTagName("relativeRectangles").length != 0){
  
        let relativeRectangles = xmlDoc.getElementsByTagName("relativeRectangles")[0];
        let rectRelaList = relativeRectangles.getElementsByTagName("rectangle");
    
        // Initialisation des boucles pour création des rectangles 
        let allListENrect = []
        let allListAzimut = []
        let allListCenters = []
        let allListP1P2 = []
        let listNA = []
    
        // Récupération des éléments du fichier PRNx et calcul des coords du rectangle
        for (i=0; i<rectRelaList.length; i++){
            if ( rectRelaList[i].getAttribute("na") != null) {
                let pointName1 = rectRelaList[i].getAttribute("point1");
                let pointName2 = rectRelaList[i].getAttribute("point2");
                let na = rectRelaList[i].getAttribute("na")/1000.0; // en [m]
                listNA.push([String((na*1000.0).toFixed(1)) + "mm"]); // Pour l'ajout du label
                let nb = rectRelaList[i].getAttribute("nb")/1000.0; // en [m]
                let coord1 = [parseFloat(listAllPoints.get(pointName1)[0])+0.001,parseFloat(listAllPoints.get(pointName1)[1])]
                let coord2 = [parseFloat(listAllPoints.get(pointName2)[0]),parseFloat(listAllPoints.get(pointName2)[1])]
                allListP1P2.push([coord1,coord2]);
                let moyCenter = [parseFloat(((coord1[0]+coord2[0])/2).toFixed(3)), parseFloat(((coord1[1]+coord2[1])/2).toFixed(3))]
                allListAzimut.push([rectRelaList[i].getAttribute("azimuthA")/3.1415*180.0]) // en [rad]
                allListCenters.push([moyCenter[0],moyCenter[1]]); // Centre moyen des 2 points
        
        
                // Calcul des coords (echelleEllipses = échelle d'affichage des rect. et ell.)
                listENrectangle = []
                listENrectangle.push([moyCenter[0]-nb*echelleEllipses, echelleEllipses*na+moyCenter[1]]);
                listENrectangle.push([moyCenter[0]+nb*echelleEllipses, echelleEllipses*na+moyCenter[1]]);
                listENrectangle.push([moyCenter[0]+nb*echelleEllipses, -echelleEllipses*na+moyCenter[1]]);
                listENrectangle.push([moyCenter[0]-nb*echelleEllipses, -echelleEllipses*na+moyCenter[1]]);
                listENrectangle.push([moyCenter[0]-nb*echelleEllipses, echelleEllipses*na+moyCenter[1]]);
        
                allListENrect.push(listENrectangle); // tableau de toutes les coordonnées de chaque rectangle (grand)
            };
        };
    
        // création et ajout des recangles sur la map (MultiLineString)
        let rectanglesRelaLineSource = new ol.source.Vector({});
    
        for (let i = 0; i < allListENrect.length; i++) {      
            let featureRectangle = new ol.Feature({
                geometry: new ol.geom.LineString(allListENrect[i]),
                properties: listNA[i][0],
            });
            let featureLineP1P2 = new ol.Feature({ // Ligne simple reliant les 2 points relatifs
                geometry: new ol.geom.LineString(allListP1P2[i]),
            });
    
            featureRectangle.getGeometry().rotate(allListAzimut[i],allListCenters[i]);
            rectanglesRelaLineSource.addFeature(featureRectangle);
            rectanglesRelaLineSource.addFeature(featureLineP1P2);
        };
    
        // Création du style labelText pour demi-grand axe na du rect.
        let textStyleRectangle = new ol.style.Text({
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
        });
    
        // Création du style rectangles
        let styleRectangle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#00D5A7', width: 1, lineDash: [6,2] }),
            text: textStyleRectangle
        });
        
        // Création du Layer rectangles
        rectangleRelaLayer = new ol.layer.Vector({
            source: rectanglesRelaLineSource,
            style: function (feature) { // la propriété style prend un callback qui doit retourner un style
                styleRectangle.getText().setText(feature.get("properties")); 
            return styleRectangle;
            }
        });
        
        rectangleRelaLayer.setZIndex(91);
        map.addLayer(rectangleRelaLayer);
        changeLayerVisibilityRectanglesRela_planimetric();
    
    } else {
        //console.log("There's no relatives rectangles")
        document.getElementById("legendeRectRela").className = "checkboxLabel legendeBarree";
    };
};

/** 
 * This function parses the PRNx file (language : XML) to get all the GNSS session,
 * add them to the map and style them with forms and/or color
 */
function parsingGNSS_planimetric() {
    
    let planimetricAbriss = xmlDoc.getElementsByTagName("planimetricAbriss")[0];
    let stationsList = planimetricAbriss.getElementsByTagName("station");
    
    // Initialisation du Vector Source
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
                    properties: "Session n° " + String(sessionNo) + "/" ,
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

    gnssLayer = new ol.layer.Vector({
        source: gnssSource,
        style: gnssStyle,
        opacity: 1.0,
    });

    map.addLayer(gnssLayer);
    changeLayerVisibilityGnss_planimetric();
    gnssLayer.setZIndex(80);
    //console.log("GNSS sessions has been added to map");
};

/** 
 * This function parses the PRNx file (XML) to get all 
 * the coordinates observation (most of them for 
 * "libre-ajusté" compensation), add them to the map 
 * and style them with forms and/or color.
 */
function parsingObsCoord_planimetric() {
    // Ancien nom : parsingObsCoord

    let planimetricAbriss = xmlDoc.getElementsByTagName("planimetricAbriss")[0];
    let stationsList = planimetricAbriss.getElementsByTagName("station");

    // Initialisation du Vector Source
    obsCoordSourceE = new ol.source.Vector({});
    obsCoordSourceN = new ol.source.Vector({});

    // Récupérer les No des observation de coordonnées YX et obtenir les coordonnées des points concernés
    for (let i = 0; i < stationsList.length; i++) {

        if (stationsList[i].getAttribute("obsType") === "coordinate") {
    
            let pointObs = stationsList[i];
            let listTargets = pointObs.getElementsByTagName("target");

            for (let j = 0; j < listTargets.length; j++) {
                let targetObs = listTargets[j];
                let pointName_i = targetObs.getAttribute("name");
                let E = parseFloat(listAllPoints.get(pointName_i)[0]);
                let N = parseFloat(listAllPoints.get(pointName_i)[1]);

                // Création d'une Feature ol pour chaque point avec des obs. de coord.
                
                
                // let obsCoordType_0 = targetObs.getElementsByTagName("obs")[0];
                // let obsCoordType_1 = targetObs.getElementsByTagName("obs")[1];
                let grandeurSymbole = 8.0
                
                // Choix pour chaque symbole (si E ou N)
                for(k=0; k<targetObs.getElementsByTagName("obs").length; k++) { 
                
                    if (targetObs.getElementsByTagName("obs")[k].getAttribute("target") === "Y") {
                        symbolCoords = [E,N] 
                        featureObsCoord = new ol.Feature({
                            geometry: new ol.geom.Point(symbolCoords),
                            name: pointName_i,
                            properties: "divXXXXXXXXXXXX"
                        });
                        obsCoordSourceE.addFeature(featureObsCoord);
                    };
                    if (targetObs.getElementsByTagName("obs")[k].getAttribute("target") === "X") {
                        symbolCoords = [E,N] 
                        featureObsCoord = new ol.Feature({
                            geometry: new ol.geom.Point(symbolCoords),
                            name: pointName_i,
                            properties: "divXXXXXXXXXXXX"
                        });
                        obsCoordSourceN.addFeature(featureObsCoord);
                    };
                    if (targetObs.getElementsByTagName("obs")[k].getAttribute("target") === "X" ) {
                        symbolCoords = [E,N] 
                        featureObsCoord = new ol.Feature({
                            geometry: new ol.geom.Point(symbolCoords),
                            name: pointName_i,
                            properties: "divXXXXXXXXXXXX"
                        });
                        obsCoordSourceN.addFeature(featureObsCoord);
                    };
                };
            };
        };
    };

    obsCoordELayer = new ol.layer.Vector({
        source: obsCoordSourceE,
        style: new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                src: './img/E_obs.png',
                scale: '0.13',
                color: '#000000',
                width: 5,
            })),
        }),
    });

    obsCoordNLayer = new ol.layer.Vector({
        source: obsCoordSourceN,
        style: new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                src: './img/N_obs.png',
                scale: '0.13',
                color: '#000000',
            })),
        }),
    });

    map.addLayer(obsCoordELayer);
    map.addLayer(obsCoordNLayer);
    changeLayerVisibilityCoordE_planimetric();
    changeLayerVisibilityCoordN_planimetric();
    obsCoordELayer.setZIndex(99);
    obsCoordNLayer.setZIndex(99);
    //console.log("Coordinates observations has been added to map");
};

/**
 * This function parses the PRNx file (XML) to get and
 * generate the vectors from the differences DY/DX between
 * initial coordinates and compensated coordinates
 */
function parsingVectXML_planimetric() {
    //Ancien nom : parsingVectXML

    // Récupération des éléments des balises <coordinates>
    let coordinates = xmlDoc.getElementsByTagName("coordinates")[0];
    let pointsList = coordinates.getElementsByTagName("point");

    let vectLineSource = new ol.source.Vector({});

    for (i=0; i<pointsList.length; i++){

        
        // Tri pour garder uniquement les valeurs existantes de dy/dx
        if ( pointsList[i].getAttribute("dy") != null ) {
            // Tri pour garder uniquement les dy et dx non-nuls (si dy!=0.0 et dx!=0.0)
            if ( pointsList[i].getAttribute("dy") != 0.0 || pointsList[i].getAttribute("dx") != 0.0) {

                // Attribution des éléments des vecteurs
                let pointName = pointsList[i].getAttribute("name");
                let dy = parseFloat(pointsList[i].getAttribute("dy"))/1000.0; // en [m]
                let dx = parseFloat(pointsList[i].getAttribute("dx"))/1000.0; // en [m]
                let norm = Math.sqrt(dy**2+dx**2); // en [m]
                let center = [parseFloat(listAllPoints.get(pointName)[0]),parseFloat(listAllPoints.get(pointName)[1])];
                let gisVect = (Math.atan2(dx,dy))*200.0/Math.PI; // Gisement du vecteur en [g] (pour dessin flèche)
                if (gisVect<0) {
                    gisVect = - gisVect + 100.0;
                } else {
                    gisVect = 400-(gisVect-100.0);
                };
                let Earrow = center[0]+echelleEllipses*norm*Math.sin(gisVect*Math.PI/200.0);
                let Narrow = center[1]+echelleEllipses*norm*Math.cos(gisVect*Math.PI/200.0);

                // Calcul des éléments pour la flèches  du vecteur [g] et [m]
                let gisArrow1 = gisVect + 200.0 + 50.0
                let gisArrow2 = gisVect + 200.0 - 50.0

                let Ea1 = (norm/5)*echelleEllipses*Math.sin(gisArrow1*Math.PI/200.0) + Earrow;
                let Na1 = (norm/5)*echelleEllipses*Math.cos(gisArrow1*Math.PI/200.0) + Narrow;
                let Ea2 = (norm/5)*echelleEllipses*Math.sin(gisArrow2*Math.PI/200.0) + Earrow;
                let Na2 = (norm/5)*echelleEllipses*Math.cos(gisArrow2*Math.PI/200.0) + Narrow;

                // Calcul des coordonnées du vecteur avec la flèche
                let listENvect = [ [center[0],center[1]] , [Earrow, Narrow] , [Ea1, Na1] , [Earrow, Narrow] , [Ea2, Na2] ];                                       
                
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
        offsetX: 10,
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
    vectLayer = new ol.layer.Vector({
        source: vectLineSource,
        style: function (feature) { // la propriété style prend un callback qui doit retourner un style
            styleVect.getText().setText(feature.get("properties")); 
            return styleVect;
        }
    });

    // Ajout à la carte
    map.addLayer(vectLayer);
    vectLayer.setZIndex(99);
    changeLayerVisibilityVect_planimetric();
};


///////////////////////////////////////////////////
function parsingVisee() {

    // Récupération des éléments des balises <station> 
    const planimetricAbriss = xmlDoc.getElementsByTagName("planimetricAbriss")[0];
    const stationsList = planimetricAbriss.getElementsByTagName("station");
  
    // <--------------- OBSERVATIONS TERRESTRES --------------->
    observationsTerrestres = []
    for (i = 0; i < stationsList.length; i++) {

        // Infos types de la station
        const stationXML = stationsList[i];
        const station = stationXML.getAttribute("name");
        const obsType = stationXML.getAttribute("obsType");

        if (obsType === "distance" || obsType === "direction") {

            // Observations de la station
            const observationsXMLList = stationXML.getElementsByTagName("obs");
            for (let i=0; i<observationsXMLList.length; i++) {
                const observationXML = observationsXMLList[i];
                
                const noObs = observationXML.getAttribute("obsNr");
                const noVis = observationXML.getAttribute("target");
                const noGro = observationXML.getAttribute("group");
                const resid = observationXML.getAttribute("improv");
                const erMoy = observationXML.getAttribute("meanErrApriori");
                const zi = observationXML.getAttribute("zi");
                const nabla = observationXML.getAttribute("nabla_rzi");
                const wi = observationXML.getAttribute("wi");
                const giCoor = observationXML.getAttribute("coordAzi");
                const diCoor = observationXML.getAttribute("coordDist");
                const erLat = observationXML.getAttribute("lateralErr");

                // Ajout des éléments dans l'array
                observationsTerrestres.push([
                    station, // 0
                    noVis,   // 1
                    obsType, // 2
                    noObs,   // 3
                    noGro,   // 4
                    resid,   // 5
                    erMoy,   // 6
                    zi,      // 7
                    nabla,   // 8
                    wi,      // 9
                    giCoor,  // 10
                    diCoor,  // 11
                    erLat    // 12
                ]);
            };
        };
    };
};

function layerObservationsTerrestres() {

    // Création des sources et layers pour les directions horizontales
    const directionSource = new ol.source.Vector({});
    directionLayer = new ol.layer.Vector({});

    const distanceSource = new ol.source.Vector({});
    distanceLayer = new ol.layer.Vector({});

    // Parcours du tableau des observations terrestres pour créer les features
    for (let i=0; i<observationsTerrestres.length; i++){
        const obser = observationsTerrestres[i];
        const obsNo = obser[3];

        // Coordonnées des stations & visée
        const E_St = parseFloat(listAllPoints.get(obser[0])[0]);
        const N_St = parseFloat(listAllPoints.get(obser[0])[1]);
        const E_Vis = parseFloat(listAllPoints.get(obser[1])[0]);
        const N_Vis = parseFloat(listAllPoints.get(obser[1])[1]);

        const coordArray_i = [
            [E_St, N_St],
            [E_Vis, N_Vis]
        ];

        //--------------------------------------------------- DIRECTIONS
        // Calcul des coordonnées "Trait plein - Trait pointillé"
        const dE_inf = (E_Vis - E_St)*0.7;
        const dN_inf = (N_Vis - N_St)*0.7;
        const coordArray_i_plein = [
            [E_St, N_St],
            [E_St+dE_inf, N_St+dN_inf]
        ];
        
        // Création du feature "Trait plein"
        const featureDirPlein = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i_plein),
            properties:{
                "no_obs":obsNo,
                "type_obs":obser[4],
                "station":obser[0],
                "visee":obser[1],
                "v":obser[5],
                "errMoy":obser[6],
                "zi":obser[7],
                "nabla":obser[8],
                "wi":obser[9]
            }
        });
        if (obsNo != "") {
            featureDirPlein.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: '#717171', 
                    width: 1 
                })
            }))
        } else {
            featureDirPlein.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: 'rgba(0, 0, 0, 0.0)', 
                    width: 0 
                })
            }))
        };

        // Création du feature "Trait pointillé"
        const featureDir = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
            properties:{
                "no_obs":obsNo,
                "type_obs":obser[4],
                "station":obser[0],
                "visee":obser[1],
                "v":obser[5],
                "errMoy":obser[6],
                "zi":obser[7],
                "nabla":obser[8],
                "wi":obser[9]
            }
        });
        if (obsNo != "" ) { // si l'obs. a un numéro, elle est figurée normalement
            featureDir.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: '#717171', 
                    width: 1, 
                    lineDash: [15,7]
                })
            }));
        }
        else { // Si l'obs a un numéro = elle est figurée normalement
            featureDir.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: 'rgba(0, 0, 0, 0.0)', 
                    width: 0
                })
            }));
        };

        directionSource.addFeature(featureDir);
        directionSource.addFeature(featureDirPlein);  


        //--------------------------------------------------- DISTANCES
        // Calcul des coordonnées pour la symbologie
        const dE_min = (E_Vis - E_St)*0.1;
        const dN_min = (N_Vis - N_St)*0.1;
        const dE_max = (E_Vis - E_St)*0.2;
        const dN_max = (N_Vis - N_St)*0.2;
        const coordArray_distance = [
            [E_St+dE_min, N_St+dN_min],
            [E_St+dE_max, N_St+dN_max]
        ];

        // Création de la feature pour la symbologie
        const featureDisSymb = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_distance),
            properties: {
                "no_obs":obsNo,
                "type_obs":obser[4],
                "station":obser[0],
                "visee":obser[1],
                "v":obser[5],
                "errMoy":obser[6],
                "zi":obser[7],
                "nabla":obser[8],
                "wi":obser[9]
            }
        });
        if (obsNo != "" ) {
            featureDisSymb.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: '#000000', 
                    width: 5, 
                    lineCap: "square"
                })
            }));
        } else { // si obs. supp.
            featureDisSymb.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.0)',
                    width: 0
                })
            }))
        };

        // Création du feature
        const featureDistance = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
            properties: {
                "no_obs":obsNo,
                "type_obs":obser[4],
                "station":obser[0],
                "visee":obser[1],
                "v":obser[5],
                "errMoy":obser[6],
                "zi":obser[7],
                "nabla":obser[8],
                "wi":obser[9]
            }
        });
        if (obsNo != "" ) {
            featureDistance.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ 
                    color: '#000000', 
                    width: 1
                })
            }));
        } else { // si obs. supp.
            featureDistance.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.0)',
                    width: 0
                })
            }))
        };

        // Ajout des features
        distanceSource.addFeature(featureDisSymb);
        distanceSource.addFeature(featureDistance);
    };

    // Création des layers de directions et distances
    directionLayer = new ol.layer.Vector({ 
        source: directionSource 
    });
    distanceLayer = new ol.layer.Vector({
        source: distanceSource
    });

    // Ajout du layer à la carte
    map.addLayer(directionLayer);
    map.addLayer(distanceLayer);
    changeLayerVisibilityDirections_planimetric();
    changeLayerVisibilityDistances_planimetric();
}


/** The function creates a layer to show the local reliability with a 4-colors map (intervals)
 *  0.00 - 0.25
 *  0.25 - 0.50
 *  0.50 - 0.75
 *  0.75 - 1.00
 */
function fiabLocale_planimetric() {

    // Création de la source pour traitement graphique et nouveau layer
    const fiabLocaleSource = new ol.source.Vector({});

    // Parcourir le tableau des observations terrestres
    for (let i=0; i<observationsTerrestres.length; i++) {
        const obser = observationsTerrestres[i];
        const obsNo = obser[3];
        const zi_i = obser[7];
        const typeObs = obser[2];

        // Coordonnées des stations & visée
        const E_St = parseFloat(listAllPoints.get(obser[0])[0]);
        const N_St = parseFloat(listAllPoints.get(obser[0])[1]);
        const E_Vis = parseFloat(listAllPoints.get(obser[1])[0]);
        const N_Vis = parseFloat(listAllPoints.get(obser[1])[1]);
        const coordArray_i = [
            [E_St, N_St],
            [E_Vis, N_Vis]
        ];

        // Paramètres de la fiabilité locale
        let colorFiab;
        let widthFiab;
        let zIndex;
        
        // Attribution des couleurs des paliers de zi
        if (zi_i < 25.0) {
            colorFiab = "#FF1700";
            widthFiab = 3;
            zIndex = 99;
        } else if (zi_i <= 50.0) {
            colorFiab = "#FFD000";
            widthFiab = 1.5;
            zIndex = 98;
        } else if (zi_i <= 75.0) {
            colorFiab = "#ABFF00";
            widthFiab = 0;
            zIndex = 1;
        } else if (zi_i <= 100.0) {
            colorFiab = "#2AE100";
            widthFiab = 0;
            zIndex = 1;
        };

        // Si l'obs. est supprimée
        if (obsNo === "") { 
            colorFiab = "rgba(0, 0, 0, 0.0)"; // transparent
            widthFiab = 0;
        };

        if (typeObs == "direction") {
            // Calcul des coordonnées "Trait plein - Trait pointillé"
            const dE_inf = (E_Vis - E_St)*0.7;
            const dN_inf = (N_Vis - N_St)*0.7;
            const coordArray_i_plein = [
                [E_St, N_St],
                [E_St+dE_inf, N_St+dN_inf]
            ];
            
            // Création du feature "Trait plein"
            const featureDirPlein = new ol.Feature({
                geometry: new ol.geom.LineString(coordArray_i_plein),
                properties:{
                    "no_obs":obsNo,
                    "type_obs":obser[4],
                    "station":obser[0],
                    "visee":obser[1],
                    "v":obser[5],
                    "errMoy":obser[6],
                    "zi":obser[7],
                    "nabla":obser[8],
                    "wi":obser[9]
                }
            });
            if (obsNo != "") {
                featureDirPlein.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorFiab, 
                        width: 1 + widthFiab
                    })
                }))
            } else {
                featureDirPlein.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorFiab, 
                        width: 0
                    })
                }))
            };
            featureDirPlein.getStyle().setZIndex(zIndex);

            // Création du feature "Trait pointillé"
            const featureDir = new ol.Feature({
                geometry: new ol.geom.LineString(coordArray_i),
                properties:{
                    "no_obs":obsNo,
                    "type_obs":obser[4],
                    "station":obser[0],
                    "visee":obser[1],
                    "v":obser[5],
                    "errMoy":obser[6],
                    "zi":obser[7],
                    "nabla":obser[8],
                    "wi":obser[9]
                }
            });
            if (obsNo != "" ) { // si l'obs. a un numéro, elle est figurée normalement
                featureDir.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorFiab, 
                        width: 1 + widthFiab, 
                        lineDash: [15,7]
                    })
                }));
            }
            else { // Si l'obs a un numéro = elle est figurée normalement
                featureDir.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorFiab, 
                        width: 0
                    })
                }));
            };
            featureDir.getStyle().setZIndex(zIndex);

            fiabLocaleSource.addFeature(featureDir);
            fiabLocaleSource.addFeature(featureDirPlein);  

        } else if (typeObs == "distance") {
            // Calcul des coordonnées pour la symbologie
            const dE_min = (E_Vis - E_St)*0.1;
            const dN_min = (N_Vis - N_St)*0.1;
            const dE_max = (E_Vis - E_St)*0.2;
            const dN_max = (N_Vis - N_St)*0.2;
            const coordArray_distance = [
                [E_St+dE_min, N_St+dN_min],
                [E_St+dE_max, N_St+dN_max]
            ];

            // Création de la feature pour la symbologie
            const featureDisSymb = new ol.Feature({
                geometry: new ol.geom.LineString(coordArray_distance),
                properties: {
                    "no_obs":obsNo,
                    "type_obs":obser[4],
                    "station":obser[0],
                    "visee":obser[1],
                    "v":obser[5],
                    "errMoy":obser[6],
                    "zi":obser[7],
                    "nabla":obser[8],
                    "wi":obser[9]
                }
            });
            if (obsNo != "" ) {
                featureDisSymb.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorFiab, 
                        width: 5 + widthFiab, 
                        lineCap: "square"
                    })
                }));
            } else { // si obs. supp.
                featureDisSymb.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: colorFiab,
                        width: 0
                    })
                }))
            };
            featureDisSymb.getStyle().setZIndex(zIndex);

            // Création du feature
            const featureDistance = new ol.Feature({
                geometry: new ol.geom.LineString(coordArray_i),
                properties: {
                    "no_obs":obsNo,
                    "type_obs":obser[4],
                    "station":obser[0],
                    "visee":obser[1],
                    "v":obser[5],
                    "errMoy":obser[6],
                    "zi":obser[7],
                    "nabla":obser[8],
                    "wi":obser[9]
                }
            });
            if (obsNo != "" ) {
                featureDistance.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({ 
                        color: colorFiab, 
                        width: 1 + widthFiab
                    })
                }));
            } else { // si obs. supp.
                featureDistance.setStyle( new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: colorFiab,
                        width: 0
                    })
                }))
            };
            featureDistance.getStyle().setZIndex(zIndex);

            // Ajout des features
            fiabLocaleSource.addFeature(featureDisSymb);
            fiabLocaleSource.addFeature(featureDistance);
        };
    };
    // Ajout de la source
    fiabLocalLayer = new ol.layer.Vector({
        source: fiabLocaleSource
    });

    // Ajout du layer à la map
    map.addLayer(fiabLocalLayer);
    changeLayerVisibilityFiabLoc_planimetric();
};

/**
 * This function creates a layer to show the normed
 * residuals (wi) with a 3-colors map (intervals) :
 * wi limite     - infinite
 * wi inf limite - wi limite
 * 0             - wi inf limite
 */
function normedResidualsWi_planimetric() {

    // Wi pas disponibles si une pré-analyse
    if (xmlDoc.getElementsByTagName("biggestWi").length != 0) { 

        let statistics = xmlDoc.getElementsByTagName("statistics");

        // Récupérer les WI maxi
        let biggestWi;
        for (let i=0; i<statistics.length; i++){
            if (statistics[i].getAttribute("type") == "planimetric"){
                biggestWi = statistics[i].getElementsByTagName("biggestWi");
                biggestWi = biggestWi[0];
            }
            //TODO : bloquer la carte etc si pas de résidus planimetrique
        };

        // Création de la source pour traitement graphique et nouveau layer
        wiSource = new ol.source.Vector({});

        // Récupération des balises avec la limite du wi select. par l'utilisateur lors du calcul LTOP
        limitWi = parseFloat(biggestWi.getAttribute("biggerThan")); // PLANI uniquement = [0] , ALTI = [1]
        limitInf = limitWi - 0.2; // pour paliers

        // parcourir la source et géréer les styles pour chaques features
        for (let i=0; i<observationsTerrestres.length; i++) {
            const obser = observationsTerrestres[i];
            const obsNo = obser[3];
            const wi_i = obser[9];
            const typeObs = obser[2];

            // Coordonnées des stations & visée
            const E_St = parseFloat(listAllPoints.get(obser[0])[0]);
            const N_St = parseFloat(listAllPoints.get(obser[0])[1]);
            const E_Vis = parseFloat(listAllPoints.get(obser[1])[0]);
            const N_Vis = parseFloat(listAllPoints.get(obser[1])[1]);
            const coordArray_i = [
                [E_St, N_St],
                [E_Vis, N_Vis]
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

            if (typeObs == "direction") {
                // Calcul des coordonnées "Trait plein - Trait pointillé"
                const dE_inf = (E_Vis - E_St)*0.7;
                const dN_inf = (N_Vis - N_St)*0.7;
                const coordArray_i_plein = [
                    [E_St, N_St],
                    [E_St+dE_inf, N_St+dN_inf]
                ];
                
                // Création du feature "Trait plein"
                const featureDirPlein = new ol.Feature({
                    geometry: new ol.geom.LineString(coordArray_i_plein),
                    properties:{
                        "no_obs":obsNo,
                        "type_obs":obser[4],
                        "station":obser[0],
                        "visee":obser[1],
                        "v":obser[5],
                        "errMoy":obser[6],
                        "zi":obser[7],
                        "nabla":obser[8],
                        "wi":obser[9]
                    }
                });
                if (obsNo != "") {
                    featureDirPlein.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: colorWi, 
                            width: 1 + widthWi
                        })
                    }))
                } else {
                    featureDirPlein.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: colorWi, 
                            width: 0
                        })
                    }))
                };
                featureDirPlein.getStyle().setZIndex(zIndex);
    
                // Création du feature "Trait pointillé"
                const featureDir = new ol.Feature({
                    geometry: new ol.geom.LineString(coordArray_i),
                    properties:{
                        "no_obs":obsNo,
                        "type_obs":obser[4],
                        "station":obser[0],
                        "visee":obser[1],
                        "v":obser[5],
                        "errMoy":obser[6],
                        "zi":obser[7],
                        "nabla":obser[8],
                        "wi":obser[9]
                    }
                });
                if (obsNo != "" ) { // si l'obs. a un numéro, elle est figurée normalement
                    featureDir.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: colorWi, 
                            width: 1 + widthWi, 
                            lineDash: [15,7]
                        })
                    }));
                }
                else { // Si l'obs a un numéro = elle est figurée normalement
                    featureDir.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: colorWi, 
                            width: 0
                        })
                    }));
                };
                featureDir.getStyle().setZIndex(zIndex);
    
                wiSource.addFeature(featureDir);
                wiSource.addFeature(featureDirPlein);  
    
            } else if (typeObs == "distance") {
                // Calcul des coordonnées pour la symbologie
                const dE_min = (E_Vis - E_St)*0.1;
                const dN_min = (N_Vis - N_St)*0.1;
                const dE_max = (E_Vis - E_St)*0.2;
                const dN_max = (N_Vis - N_St)*0.2;
                const coordArray_distance = [
                    [E_St+dE_min, N_St+dN_min],
                    [E_St+dE_max, N_St+dN_max]
                ];
    
                // Création de la feature pour la symbologie
                const featureDisSymb = new ol.Feature({
                    geometry: new ol.geom.LineString(coordArray_distance),
                    properties: {
                        "no_obs":obsNo,
                        "type_obs":obser[4],
                        "station":obser[0],
                        "visee":obser[1],
                        "v":obser[5],
                        "errMoy":obser[6],
                        "zi":obser[7],
                        "nabla":obser[8],
                        "wi":obser[9]
                    }
                });
                if (obsNo != "" ) {
                    featureDisSymb.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: colorWi, 
                            width: 5 + widthWi, 
                            lineCap: "square"
                        })
                    }));
                } else { // si obs. supp.
                    featureDisSymb.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: colorWi,
                            width: 0
                        })
                    }))
                };
                featureDisSymb.getStyle().setZIndex(zIndex);
    
                // Création du feature
                const featureDistance = new ol.Feature({
                    geometry: new ol.geom.LineString(coordArray_i),
                    properties: {
                        "no_obs":obsNo,
                        "type_obs":obser[4],
                        "station":obser[0],
                        "visee":obser[1],
                        "v":obser[5],
                        "errMoy":obser[6],
                        "zi":obser[7],
                        "nabla":obser[8],
                        "wi":obser[9]
                    }
                });
                if (obsNo != "" ) {
                    featureDistance.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({ 
                            color: colorWi, 
                            width: 1 + widthWi
                        })
                    }));
                } else { // si obs. supp.
                    featureDistance.setStyle( new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: colorWi,
                            width: 0
                        })
                    }))
                };
                featureDistance.getStyle().setZIndex(zIndex);
    
                // Ajout des features
                wiSource.addFeature(featureDisSymb);
                wiSource.addFeature(featureDistance);
            };
        };

        // Création du layer
        wiLayer = new ol.layer.Vector({
            source: wiSource
        })

        // Ajout du layer à la carte + divers
        map.addLayer(wiLayer);
        wiLayer.setZIndex(80);
        changeLayerVisibilityWi_planimetric();
        
        // Gestion des intervalles de la légende en fonction du Wi limite (issu des param. du calcul LTOP)
        //document.getElementById("palierWi1").textContent = "――  "+String(limitWi)+" - ∞";
        //document.getElementById("palierWi2").textContent = "――  "+String(limitInf)+" - "+String(limitWi);
        //document.getElementById("palierWi3").textContent = "――  0.0 - "+String(limitInf);

    } else { // Si c'est une pré-analyse
        //console.log("Pas de wi dans une pré-analyse")
        document.getElementById("legendeWi").className = "checkboxLabel legendeBarree";
    };
};