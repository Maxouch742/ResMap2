/**
 * This function parses the PRNx file (XML) to get
 * all the points from the projects (approximate 
 * coordinates) and add them on the ol map
 */
function parsingViseesXML_planimetric() {
    // Ancien nom : parsingViseesXML

    // Récupération des éléments des balises <station> 
    let planimetricAbriss = xmlDoc.getElementsByTagName("planimetricAbriss")[0];
    let stationsList = planimetricAbriss.getElementsByTagName("station");
  
    // <--------------- DISTANCES --------------->
    // Récupérer les paires [No Station, No Point visé] (No en str) - distances
    noPointsDistances = []
    for (i = 0; i < stationsList.length; i++) {
        obsType = stationsList[i].getAttribute("obsType");
        if (obsType === "distance") {
            stationXml = stationsList[i];
            noSt = stationXml.getAttribute("name");
            observationsXml = stationXml.getElementsByTagName("obs");
            for (j = 0; j < observationsXml.length; j++) {
            noVis = observationsXml[j].getAttribute("target");
            zi_i = observationsXml[j].getAttribute("zi");
            noObs = observationsXml[j].getAttribute("obsNr");
            wi_i = observationsXml[j].getAttribute("wi");
            nabla_rzi = observationsXml[j].getAttribute("nabla_rzi");
            v = observationsXml[j].getAttribute("improv");
            noPointsDistances.push([noSt,noVis,zi_i,noObs,wi_i,nabla_rzi,v]);
            };
        };
    };
  
    // Récupérer les coord des St et Vis [E1,N1,E2,N2] - distances
    geometryDistances = []
    for (i = 0; i < noPointsDistances.length; i++) {
        noSt = noPointsDistances[i][0];
        noVis = noPointsDistances[i][1];
        zi_i = noPointsDistances[i][2];
        noObs = noPointsDistances[i][3];
        wi_i = noPointsDistances[i][4];
        nabla_rzi = noPointsDistances[i][5];
        v = noPointsDistances[i][6];
        E_St = listAllPoints.get(noSt)[0];
        N_St = listAllPoints.get(noSt)[1];
        E_Vis = listAllPoints.get(noVis)[0];
        N_Vis = listAllPoints.get(noVis)[1];
        geometryDistances.push([E_St,N_St,E_Vis,N_Vis,zi_i,noObs,wi_i,nabla_rzi,v]);
    };
  
    // Création du layer distance
    distanceLayer = new ol.layer.Vector({});
  
    // création et ajout des lignes de distances sur la map - distances
    distanceLineSource = new ol.source.Vector({});
    for (i = 0; i < geometryDistances.length; i++) {
        let coordArray_i = [ [parseFloat(geometryDistances[i][0]),parseFloat(geometryDistances[i][1])] ,
                            [parseFloat(geometryDistances[i][2]),parseFloat(geometryDistances[i][3])] ];
        
        // calculs pour faire figurer les traits épais de 10% à 30% du vecteur
        let dE_inf = (coordArray_i[1][0] - coordArray_i[0][0])*0.1
        let dE_sup = (coordArray_i[1][0] - coordArray_i[0][0])*0.2
        let dN_inf = (coordArray_i[1][1] - coordArray_i[0][1])*0.1
        let dN_sup = (coordArray_i[1][1] - coordArray_i[0][1])*0.2
        let coordArray_i_epais = [ [dE_inf+coordArray_i[0][0] , dN_inf+coordArray_i[0][1]] ,
                                   [dE_sup+coordArray_i[0][0] , dN_sup+coordArray_i[0][1]] ];
    
        // Création de la feature pour la symbologie de distance (sinon transparent pour obs. supp)
        featureDistanceEpais = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i_epais),
            properties: geometryDistances[i][5] + "/dist/" + geometryDistances[i][4] + "/" + geometryDistances[i][6] + "/" + geometryDistances[i][7] + "/" + geometryDistances[i][8] + " mm"// "noObs/zi/wi/nabla_rzi/v"
        });
        if (geometryDistances[i][5] != "" ) {
            featureDistanceEpais.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ color: '#000000', width: 5, lineCap: "square" })
                })
            )
        } else { // si obs. supp.
            featureDistanceEpais.setStyle( new ol.style.Style({
                stroke: new ol.style.Stroke({ color: 'rgba(0, 0, 0, 0.0)', width: 0})
                })
            )
        };
  
        // Ajout des features
        featureDistance = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
            properties: geometryDistances[i][5] + "/dist/" + geometryDistances[i][4] + "/" + geometryDistances[i][6] + "/" + geometryDistances[i][7] + "/" + geometryDistances[i][8] + " mm" // "noObs/zi/wi/nabla_rzi/v"
        });
        if (geometryDistances[i][5] === "" ) { // si l'obs. a pas de numéro (supp.), elle sera en rose et épaisse
            distanceStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({ color: 'rgba(0, 0, 0, 0.0)', width: 0, })
            });
            nbObsSuppr += 1;
        }
        else { // Si l'obs a un numéro = elle est gardée
            distanceStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({ color: '#000000', width: 1 })
            });
        };
        featureDistance.setStyle(distanceStyle);
        distanceLineSource.addFeature(featureDistance);
        distanceLineSource.addFeature(featureDistanceEpais);
        distanceLayer.setSource(distanceLineSource);
        // console.log(featureDistance.getProperties().properties)
    };
    map.addLayer(distanceLayer);
    console.log("Distances have been added to map")
  
    // <------------- DIRECTIONS --------------->
    // Récupérer les paires [No Station, No Point visé] (No en str) - directions
    noPointsDirections = []
    for (i = 0; i < stationsList.length; i++) {
        obsType = stationsList[i].getAttribute("obsType");
        if (obsType === "direction") {
            stationXml = stationsList[i];
            noSt = stationXml.getAttribute("name");
            observationsXml = stationXml.getElementsByTagName("obs");
            for (j = 0; j < observationsXml.length; j++) {
            noVis = observationsXml[j].getAttribute("target");
            zi_i = observationsXml[j].getAttribute("zi");
            noObs = observationsXml[j].getAttribute("obsNr");
            wi_i = observationsXml[j].getAttribute("wi");
            nabla_rzi = observationsXml[j].getAttribute("nabla_rzi");
            v = observationsXml[j].getAttribute("improv");
            noPointsDirections.push([noSt,noVis,zi_i,noObs,wi_i,nabla_rzi,v]);
            };
        };
    };
  
    // Récupérer les coord des St et Vis [E1,N1,E2,N2] - directions
    geometryDirections = []
    for (i = 0; i < noPointsDirections.length; i++) {
        noSt = noPointsDirections[i][0];
        noVis = noPointsDirections[i][1];
        zi_i = noPointsDirections[i][2];
        noObs = noPointsDirections[i][3];
        wi_i = noPointsDirections[i][4];
        nabla_rzi = noPointsDirections[i][5];
        v = noPointsDirections[i][6];
        E_St = parseFloat(listAllPoints.get(noSt)[0]);
        N_St = parseFloat(listAllPoints.get(noSt)[1]);
        E_Vis = parseFloat(listAllPoints.get(noVis)[0]);
        N_Vis = parseFloat(listAllPoints.get(noVis)[1]);
        geometryDirections.push([E_St,N_St,E_Vis,N_Vis,zi_i,noObs,wi_i,nabla_rzi,v]);
    };
  
    // Création du layer distance
    directionLayer = new ol.layer.Vector({});
  
    // création et ajout des lignes de distances sur la map - directions
    directionLineSource = new ol.source.Vector({});
    for (i = 0; i < geometryDirections.length; i++) {
        coordArray_i = [[geometryDirections[i][0],geometryDirections[i][1]],[geometryDirections[i][2],geometryDirections[i][3]]];
        
        // Calculs pour faire figurer les traits pleins jusqu'à 70% de la visée
        let dE_sup = (coordArray_i[1][0] - coordArray_i[0][0])*0.7
        let dN_sup = (coordArray_i[1][1] - coordArray_i[0][1])*0.7
        let coordArray_i_plein = [ [dE_sup+coordArray_i[0][0],dN_sup+coordArray_i[0][1]] ,
                                    [coordArray_i[0][0],coordArray_i[0][1]] ];
    
        // Création de la feature pour la symbologie de direction (trait plein)
        featureDirPlein = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i_plein),
            properties: geometryDirections[i][5] + "/dir/" + geometryDirections[i][4] + "/" + geometryDirections[i][6] + "/" + geometryDirections[i][7] + "/" + geometryDirections[i][8] + " cc"   // "noObs/typeObs/zi/wi/nabla_rzi/v"
        });
        if (geometryDirections[i][5] != "" ) {
            featureDirPlein.setStyle( new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#717171', width: 1 })
            }) 
            )
        } else {
            featureDirPlein.setStyle( new ol.style.Style({
            stroke: new ol.style.Stroke({ color: 'rgba(0, 0, 0, 0.0)', width: 0 })
            }) 
            )
        };
  
        // Création de la feature pour une direction (traittillés)
        featureDirection = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
            properties: geometryDirections[i][5] + "/dir/" + geometryDirections[i][4] + "/" + geometryDirections[i][6] + "/" + geometryDirections[i][7] + "/" + geometryDirections[i][8] + " cc"   // "noObs/typeObs/zi/wi/nabla_rzi/v"
        });
        if (geometryDirections[i][5] === "" ) { // si l'obs. a pas de numéro, elle sera transparente
            directionStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: 'rgba(0, 0, 0, 0.0)', width: 0, })
            });
            nbObsSuppr += 1;
        }
        else { // Si l'obs a un numéro = elle est figurée normalement
            directionStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#717171', width: 1, lineDash: [15,7]})
            });
        };
        featureDirection.setStyle(directionStyle);
        directionLineSource.addFeature(featureDirection);
        directionLineSource.addFeature(featureDirPlein);
        directionLayer.setSource(directionLineSource);
    };
    map.addLayer(directionLayer);
    console.log("Directions have been added to map")
  
    // Passer les points au dessus (ZIndex)
    distanceLayer.setZIndex(2);
    directionLayer.setZIndex(1);
  };

  
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
            t.forEach(gis => listENellipse.push( [parseFloat(a*kSigma*echelleEllipses*Math.cos(gis*3.1415/180.0)+center[0]),
            parseFloat(b*kSigma*echelleEllipses*Math.sin(gis*3.1415/180.0)+center[1])]) )
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
    changeLayerVisibilityEllipses()
    document.getElementById("AffichageEchelleEllipse").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    console.log("Ellipses have been added to map");
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
            stroke: new ol.style.Stroke({ color: '#FFAF42', width: 1, lineDash: [6,2] }),
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
        changeLayerVisibilityEllipsesRela()
        ellipseRelaLayer.setZIndex(90);
        document.getElementById("AffichageEchelleEllipseRela").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
        console.log("Relative ellipses have been added to map");
    } else {
        console.log("There's no relatives ellipses")
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
        changeLayerVisibilityRectangles();
        document.getElementById("AffichageEchelleRectangles").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
        console.log("Rectangles have been added to map");
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
        document.getElementById("AffichageEchelleRectanglesRela").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
        map.addLayer(rectangleRelaLayer);
        changeLayerVisibilityRectanglesRela();
        console.log("Relative rectangles have been added to map");
    
    } else {
        console.log("There's no relatives rectangles")
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
    changeLayerVisibilityGnss();
    gnssLayer.setZIndex(80);
    console.log("GNSS sessions has been added to map");
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
    changeLayerVisibilityCoordE();
    changeLayerVisibilityCoordN();
    obsCoordELayer.setZIndex(99);
    obsCoordNLayer.setZIndex(99);
    console.log("Coordinates observations has been added to map");
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
    changeLayerVisibilityVect();
    document.getElementById("AffichageEchelleVect").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    console.log("Diff. vectors have been added to map");
};


/** The function creates a layer to show the local reliability with a 4-colors map (intervals)
 *  0.00 - 0.25
 *  0.25 - 0.50
 *  0.50 - 0.75
 *  0.75 - 1.00
 */
function fiabLocale_planimetric() {
    // Ancien nom : fiabLocale

    // Créer la source comprenant les features d'observations (sources de base)
    fiabLocaleSourceBase = new ol.source.Vector({});
    fiabLocaleSourceBase.addFeatures(distanceLineSource.getFeatures());
    fiabLocaleSourceBase.addFeatures(directionLineSource.getFeatures());

    // Création de la source pour traitement graphique et nouveau layer
    fiabLocaleSource = new ol.source.Vector({});
    fiabLocalLayer = new ol.layer.Vector({});

    // Parcourir la source et gérer les styles pour chaque features
    for (let i=0; i<fiabLocaleSourceBase.getFeatures().length; i++) {

        let feature = fiabLocaleSourceBase.getFeatures()[i].clone();
        let propetiesFiab = feature.getProperties().properties
        let zi = parseFloat(propetiesFiab.split("/")[2]);  // chercher le zi et le stocker en int
        let noObs = propetiesFiab.split("/")[0] // get le numéro d'obs. et le stocker en str
        
        // Attribution des couleurs des paliers de zi
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

        // Attribution du style en fonction du zi et du typeObs (variables)
        feature.getStyle().setZIndex(zIndex);
        feature.getStyle().getStroke().setColor(colorFiab);
        let widthF = feature.getStyle().getStroke().getWidth();
        feature.getStyle().getStroke().setWidth(widthF+widthFiab); // épaissir en fonction du zi

        // Ajout des features au vector source
        fiabLocaleSource.addFeature(feature);
    };
    
    // Ajout de la source (contenant les features) au Layer + divers
    fiabLocalLayer.setSource(fiabLocaleSource);
    map.addLayer(fiabLocalLayer);
    fiabLocalLayer.setVisible(false);
    fiabLocalLayer.setZIndex(80);
    console.log("Carte des fiabilité locales zi ajoutée")
};


/**
 * This function creates a layer to show the normed
 * residuals (wi) with a 3-colors map (intervals) :
 * wi limite     - infinite
 * wi inf limite - wi limite
 * 0             - wi inf limite
 */
function normedResidualsWi_planimetric() {
    // Ancien nom : normedResidualsWi

    // Wi pas disponibles si une pré-analyse
    if (xmlDoc.getElementsByTagName("biggestWi").length != 0) { 

        // Créer la source comprenant les features d'observations (sources de base)
        wiSourceBase = new ol.source.Vector({});
        wiSourceBase.addFeatures(distanceLineSource.getFeatures());
        wiSourceBase.addFeatures(directionLineSource.getFeatures());

        // Création de la source pour traitement graphique et nouveau layer
        wiSource = new ol.source.Vector({});
        wiLayer = new ol.layer.Vector({});


        // Récupération des balises avec la limite du wi select. par l'utilisateur lors du calcul LTOP
        let biggestWi = xmlDoc.getElementsByTagName("biggestWi");
        let limitWi = parseFloat(biggestWi[0].getAttribute("biggerThan")); // PLANI uniquement = [0] , ALTI = [1]
        let limitInf = limitWi - 0.2; // pour paliers

        // parcourir la source et géréer les styles pour chaques features
        for (let i=0; i<wiSourceBase.getFeatures().length; i++) {

            let feature = wiSourceBase.getFeatures()[i].clone();
            let propetiesWi = feature.getProperties().properties
            let wi = Math.abs(parseFloat(propetiesWi.split("/")[3]).toFixed(2)); // get le wi et le stocker en int (valeur absolue)
            let noObs = propetiesWi.split("/")[0] // get le numéro d'obs. et le stocker en str
            
            // Attribution des couleurs des paliers de wi
            if (wi >= limitWi) {
                colorWi = "#FF1700";
                widthWi = 3;
                zIndex = 99;
            } else if (wi > limitInf) {
                colorWi = "#FFD000";
                widthWi = 2;
                zIndex = 98;
            } else if (wi < limitInf) {
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
            wiSource.addFeature(feature);

        };

        // Ajout de la source (contenant les features) au Layer + divers
        wiLayer.setSource(wiSource);
        map.addLayer(wiLayer);
        wiLayer.setVisible(false);
        wiLayer.setZIndex(80);
        console.log("Carte des résidus normés wi ajoutée")

        // Gestion des intervalles de la légende en fonction du Wi limite (issu des param. du calcul LTOP)
        document.getElementById("palierWi1").textContent = "――  "+String(limitWi)+" - ∞";
        document.getElementById("palierWi2").textContent = "――  "+String(limitInf)+" - "+String(limitWi);
        document.getElementById("palierWi3").textContent = "――  0.0 - "+String(limitInf);

    } else { // Si c'est une pré-analyse
        console.log("Pas de wi dans une pré-analyse")
        document.getElementById("legendeWi").className = "checkboxLabel legendeBarree";
    };
};


