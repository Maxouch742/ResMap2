function changeLayerVisibilityFixedPoints_planimetric() {
    if (document.getElementById("checkboxPointsFixes").checked === true) {
        pointsLayer.setVisible(true);
    } else {
        pointsLayer.setVisible(false);
    };
};

function changeLayerVisibilityVariablePoints_planimetric() {
    if (document.getElementById("checkboxPointsNouv").checked === true) {
        pointsVariableLayer.setVisible(true);
    } else {
        pointsVariableLayer.setVisible(false);
    };
};

function changeLayerVisibilityDirections_planimetric() {
    if (document.getElementById("checkboxDirections").checked === true) {
        directionLayer.setVisible(true);
    } else {
        directionLayer.setVisible(false);
    };
};

function changeLayerVisibilityDistances_planimetric() {
    if (document.getElementById("checkboxDistances").checked === true) {
        distanceLayer.setVisible(true);
    } else {
        distanceLayer.setVisible(false);
    }
};

function changeLayerVisibilityEllipses_planimetric() {
    if (document.getElementById("checkboxEllipses").checked === true) {
        ellipseLayer.setVisible(true);
        document.getElementById("AffichageEchelleEllipse").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        ellipseLayer.setVisible(false);
        document.getElementById("AffichageEchelleEllipse").textContent = "";
    };
};

function changeLayerVisibilityEllipsesRela_planimetric() {
    if (document.getElementById("checkboxEllipsesRela").checked === true) {
        ellipseRelaLayer.setVisible(true);
        document.getElementById("AffichageEchelleEllipseRela").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        ellipseRelaLayer.setVisible(false);
        document.getElementById("AffichageEchelleEllipseRela").textContent = "";
    };
};

function changeLayerVisibilityRectangles_planimetric() {
    if (document.getElementById("checkboxRectangles").checked === true) {
        rectangleLayer.setVisible(true);
        document.getElementById("AffichageEchelleRectangles").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        rectangleLayer.setVisible(false);
        document.getElementById("AffichageEchelleRectangles").textContent = "";
    };
};

function changeLayerVisibilityRectanglesRela_planimetric() {
    if (document.getElementById("checkboxRectanglesRela").checked === true) {
        rectangleRelaLayer.setVisible(true);
        document.getElementById("AffichageEchelleRectanglesRela").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        rectangleRelaLayer.setVisible(false);
        document.getElementById("AffichageEchelleRectanglesRela").textContent = "";
    };
};

function changeLayerVisibilityGnss_planimetric() {
    if (document.getElementById("checkboxGnss").checked === true) {
        gnssLayer.setVisible(true);
    } else {
        gnssLayer.setVisible(false);
    };
};

function changeLayerVisibilityCoordE_planimetric() {
    if (document.getElementById("checkboxCoordE").checked === true) {
        obsCoordELayer.setVisible(true);
    } else {
        obsCoordELayer.setVisible(false);
    };
};

function changeLayerVisibilityCoordN_planimetric() {
    if (document.getElementById("checkboxCoordN").checked === true) {
        obsCoordNLayer.setVisible(true);
    } else {
        obsCoordNLayer.setVisible(false);
    };
};

function changeLayerVisibilityFiabLoc_planimetric() {
    if (document.getElementById("checkboxFiabLoc").checked === true) {
        fiabLocalLayer.setVisible(true);
        document.getElementById("checkboxResidusNormes").checked = false;
        document.getElementById("checkboxDistances").checked = false;
        document.getElementById("checkboxDirections").checked = false;
        if (xmlDoc.getElementsByTagName("biggestWi").length != 0) {  // seulement si pas pré-analyse
            wiLayer.setVisible(false);
        };
        distanceLayer.setVisible(false);
        directionLayer.setVisible(false);
        document.getElementById("fiabiliteLocal_planimetric1").textContent = "――  0 - 25 %";
        document.getElementById("fiabiliteLocal_planimetric2").textContent = "――  25 - 50 %";
        document.getElementById("fiabiliteLocal_planimetric3").textContent = "――  50 - 75 %";
        document.getElementById("fiabiliteLocal_planimetric4").textContent = "――  75 - 100 %";
    } else {
        fiabLocalLayer.setVisible(false);
        document.getElementById("fiabiliteLocal_planimetric1").textContent = "";
        document.getElementById("fiabiliteLocal_planimetric2").textContent = "";
        document.getElementById("fiabiliteLocal_planimetric3").textContent = "";
        document.getElementById("fiabiliteLocal_planimetric4").textContent = "";
    
    };
};

function changeLayerVisibilityWi_planimetric() {
    if (document.getElementById("checkboxResidusNormes").checked === true) {
        wiLayer.setVisible(true);
        
        document.getElementById("checkboxFiabLoc").checked = false;
        fiabLocalLayer.setVisible(false);
        document.getElementById("fiabiliteLocal_planimetric1").textContent = "";
        document.getElementById("fiabiliteLocal_planimetric2").textContent = "";
        document.getElementById("fiabiliteLocal_planimetric3").textContent = "";
        document.getElementById("fiabiliteLocal_planimetric4").textContent = "";

        distanceLayer.setVisible(false);
        document.getElementById("checkboxDistances").checked = false;

        directionLayer.setVisible(false); 
        document.getElementById("checkboxDirections").checked = false;

        document.getElementById("palierWi1").textContent = "――  "+String(limitWi)+" - ∞";
        document.getElementById("palierWi2").textContent = "――  "+String(limitInf)+" - "+String(limitWi);
        document.getElementById("palierWi3").textContent = "――  0.0 - "+String(limitInf);
    } else {
        wiLayer.setVisible(false);
        document.getElementById("palierWi1").textContent = "";
        document.getElementById("palierWi2").textContent = "";
        document.getElementById("palierWi3").textContent = "";
    };
};


function changeLayerVisibilityVect_planimetric() {
    if (document.getElementById("checkboxVect").checked === true) {
        vectLayer.setVisible(true);
        document.getElementById("AffichageEchelleVect").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        vectLayer.setVisible(false);
        document.getElementById("AffichageEchelleVect").textContent = "";
    };
};



function changeLayerVisibilityTextFixedPoints_planimetric() {

    map.removeLayer(pointsLayer);
    
    if (document.getElementById("checkboxPointsFixesNo").checked === true) {
        // Création du Vector Layer avec les points fixes
        pointsLayer = new ol.layer.Vector({
            source: pointsSource,
            // la propriété style prend un callback qui doit retourner un style
            style: function (feature) {
                stylePointsFixedLayer.getText().setText(feature.getId());
                return stylePointsFixedLayer;
            },
        });
    };
    if (document.getElementById("checkboxPointsFixesNo").checked === false) {
        // Création du Vector Layer avec les points fixes
        pointsLayer = new ol.layer.Vector({
            source: pointsSource,
            // la propriété style prend un callback qui doit retourner un style
            style: function () {
                stylePointsFixedLayer.getText().setText(" ");
                return stylePointsFixedLayer;
            }
        });
    };
    pointsLayer.setZIndex(98);
    map.addLayer(pointsLayer);
    changeLayerVisibilityFixedPoints();
    console.log("Fixed points has been added to map"); 
};

function changeLayerVisibilityTextVariablePoints_planimetric() {

    map.removeLayer(pointsVariableLayer);

    if (document.getElementById("checkboxPointsVariableNo").checked === true) {
        // Création du Vector Layer avec les points nouveaux
        pointsVariableLayer = new ol.layer.Vector({
            source: VariablesPointsSource,
            // la propriété style prend un callback qui doit retourner un style
            style: function (feature) {
                stylePointsVariableLayer.getText().setText(feature.getId());
                return stylePointsVariableLayer;
            },
        });
    };
    if (document.getElementById("checkboxPointsVariableNo").checked === false) {
        // Création du Vector Layer avec les points nouveaux
        pointsVariableLayer = new ol.layer.Vector({
            source: VariablesPointsSource,
            // la propriété style prend un callback qui doit retourner un style
            style: function () {
                stylePointsVariableLayer.getText().setText(" ");
                return stylePointsVariableLayer;
            }
        });
    };
    pointsVariableLayer.setZIndex(99);
    map.addLayer(pointsVariableLayer);
    changeLayerVisibilityVariablePoints();
    console.log("Variable points have been added to map");
};