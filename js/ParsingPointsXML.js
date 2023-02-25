/** 
 * This function parses the PRNx file (XML) to get
 * all the points from the projects and add them 
 * to the ol map
 */
function parsingPointsXML() {
  // Création d'une liste de tous les points
  listAllPoints = new Map();

  // Création du style des points fixes
  const stylePointsFixedLayer = new ol.style.Style({
    image: new ol.style.Icon({
      src: './img/blueTriangle_icon.png',
      scale: '0.04',
      color: '#6600ff',
    }),
    text: new ol.style.Text({
      textAlign: "center",
      textBaseline: "middle",
      font: "bold 14px Calibri",
      fill: new ol.style.Fill({
        color: "blue"
      }),
      stroke: new ol.style.Stroke({
        color: "#ffffff", width: 3
      }),
      offsetX: 20.0,
      offsetY: -10.0,
      rotation: 0
    })
  });

  // Création du style des points nouveaux
  const stylePointsVariableLayer = new ol.style.Style({
    image: new ol.style.Icon({
    src: './img/redDot_icon.png',
    scale: '0.005',
    }),
    text: new ol.style.Text({
      textAlign: "center",
      textBaseline: "middle",
      font: "bold 14px Calibri",
      fill: new ol.style.Fill({
        color: "red"
      }),
      stroke: new ol.style.Stroke({
        color: "#ffffff", width: 3
      }),
      offsetX: 20.0,
      offsetY: -10.0,
      rotation: 0
    })
  });

  // Récupération des éléments des balises <point> des coordonnées finales
  const approxCoords = xmlDoc.getElementsByTagName("finalCoords")[0];
  const pointList = approxCoords.getElementsByTagName("point");

  // Récupération des éléments des points variables
  const variablePoints = xmlDoc.getElementsByTagName("variablePoints");

  // Création et récupération des listes de points variables (alti et plani)
  let variablePointList_plani;
  let variablePointList_alti;

  for (let i=0; i<variablePoints.length; i++){
    const variablePoint = variablePoints[i]
    // Récupération des points variables planimétriques
    if (variablePoint.getAttribute("type") === "planimetric" && variablePoint.getAttribute("count") != null){
      variablePointList_plani = variablePoint.getElementsByTagName("variablePoint");
    };
    if (variablePoint.getAttribute("type") === "altimetric" && variablePoint.getAttribute("count") != null){
      variablePointList_alti = variablePoint.getElementsByTagName("variablePoint");
    };
  };

  // PLANIMETRIE : lister les id des points nouveaux
  let variablePointList_plani_id = [];
  for (let i=0; i<variablePointList_plani.length; i++){
    variablePointList_plani_id.push(variablePointList_plani[i].getAttribute("name"));
  };

  // PLANIMETRIE : Création de la source du layer et ajout de feature dedans
  const pointsFixesSource_plani = new ol.source.Vector({ });
  const pointsNouvSource_plani = new ol.source.Vector({ });

  for (let i=0; i<pointList.length; i++){
    if (pointList[i].getAttribute("name") !== "NULLBERN"){
      
      pointName_i = pointList[i].getAttribute("name");
      E_i = parseFloat(pointList[i].getAttribute("easting")).toFixed(4);
      N_i = parseFloat(pointList[i].getAttribute("northing")).toFixed(4);
      H_i = parseFloat(pointList[i].getAttribute("height")).toFixed(4);

      /*if (E_i < 2000000.0 && N_i < 1000000.0){
        src = "EPSG:21781";
        des = "EPSG:2056";
        const pt = new ol.Feature({
          geometry: new ol.geom.Point([E_i, N_i])
        });
        pt.getGeometry().transform(src, des);
        console.log(pt.getGeometry().getCoordinates());
      }*/

      listAllPoints.set(pointName_i,[E_i,N_i,H_i]);
    
      // Création d'une Feature ol pour Point i (MN95)
      let featurePoint = new ol.Feature({
        geometry: new ol.geom.Point([
          parseFloat(E_i), parseFloat(N_i)
        ]),
      });
      featurePoint.setId(pointName_i)

      // Check si c'est un point variable ou fixe
      if (variablePointList_plani_id.includes(pointName_i) === false) { // pt fixe -> 
        pointsFixesSource_plani.addFeature(featurePoint);
      } 
      if (variablePointList_plani_id.includes(pointName_i) === true){ // -> pt nouv
        pointsNouvSource_plani.addFeature(featurePoint);
      };
    };
  };

  // PLANIMETRIE : création des layers et ajout à la map
  pointsLayer = new ol.layer.Vector({
      source: pointsFixesSource_plani,
      // la propriété style prend un callback qui doit retourner un style
      style: function (feature) {
          stylePointsFixedLayer.getText().setText(feature.getId());
          return stylePointsFixedLayer;
      },
  });
  map.addLayer(pointsLayer);
  pointsLayer.setZIndex(96);
  changeLayerVisibilityFixedPoints_planimetric();

  pointsVariableLayer = new ol.layer.Vector({
    source: pointsNouvSource_plani,
    style: function (feature) {
      stylePointsVariableLayer.getText().setText(feature.getId());
      return stylePointsVariableLayer;
    },
  });
  map.addLayer(pointsVariableLayer);
  pointsVariableLayer.setZIndex(97);
  changeLayerVisibilityVariablePoints_planimetric();


  // ALTIMETRIE : lister les id des points nouveaux
  let variablePointList_alti_id = [];
  for (let i=0; i<variablePointList_alti.length; i++){
    variablePointList_alti_id.push(variablePointList_alti[i].getAttribute("name"));
  };

  // ALTIMETRIE : Création de la source du layer et ajout de feature dedans
  const pointsFixesSource_alti = new ol.source.Vector({ });
  const pointsNouvSource_alti = new ol.source.Vector({ });
  for (let i=0; i<pointList.length; i++){
    if (pointList[i].getAttribute("name") !== "NULLBERN"){
      
      pointName_i = pointList[i].getAttribute("name");
      E_i = parseFloat(pointList[i].getAttribute("easting")).toFixed(4);
      N_i = parseFloat(pointList[i].getAttribute("northing")).toFixed(4);
      H_i = parseFloat(pointList[i].getAttribute("height")).toFixed(4);
      // TODO : savoir si le point est déjà dedans ou s'il faut l'ajouter
    
      // Création d'une Feature ol pour Point i
      let featurePoint = new ol.Feature({
        geometry: new ol.geom.Point([
          parseFloat(E_i), parseFloat(N_i)
        ]),
      });
      featurePoint.setId(pointName_i)

      // Check si c'est un point variable ou fixe
      if (variablePointList_alti_id.includes(pointName_i) === false) { // pt fixe -> 
        pointsFixesSource_alti.addFeature(featurePoint);
      } 
      if (variablePointList_alti_id.includes(pointName_i) === true){ // -> pt nouv
        pointsNouvSource_alti.addFeature(featurePoint);
      };
    };
  };

  // ALTIMETRIE : Création des layers et ajout à la map
  pointsLayerAltimetric = new ol.layer.Vector({
    source: pointsFixesSource_alti,
    style: function (feature) {
      stylePointsFixedLayer.getText().setText(feature.getId());
      return stylePointsFixedLayer;
    },
  });
  map.addLayer(pointsLayerAltimetric);
  pointsLayerAltimetric.setZIndex(98);
  changeLayerVisibilityFixedPoints_altimetric();

  pointsVariableLayerAltimetric = new ol.layer.Vector({
    source: pointsNouvSource_alti,
    style: function (feature) {
      stylePointsVariableLayer.getText().setText(feature.getId());
      return stylePointsVariableLayer;
    },
  });
  map.addLayer(pointsVariableLayerAltimetric);
  pointsVariableLayerAltimetric.setZIndex(98);
  changeLayerVisibilityVariablePoints_altimetric();
};
