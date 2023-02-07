function changeLayerVisibilityFixedPoints() {
    if (document.getElementById("checkboxPointsFixes").checked === true) {
        pointsLayer.setVisible(true);
    } else {
        pointsLayer.setVisible(false);
    };
};

function changeLayerVisibilityVariablePoints() {
    if (document.getElementById("checkboxPointsNouv").checked === true) {
        pointsVariableLayer.setVisible(true);
    } else {
        pointsVariableLayer.setVisible(false);
    };
};

function changeLayerVisibilityDistances() {
    if (document.getElementById("checkboxDistances").checked === true) {
        distanceLayer.setVisible(true);
    } else {
        distanceLayer.setVisible(false);
    }
};

function changeLayerVisibilityDirections() {
    if (document.getElementById("checkboxDirections").checked === true) {
        directionLayer.setVisible(true);
    } else {
        directionLayer.setVisible(false);
    };
};

function changeLayerVisibilityEllipses() {
    if (document.getElementById("checkboxEllipses").checked === true) {
        ellipseLayer.setVisible(true);
    } else {
        ellipseLayer.setVisible(false);
    };
};

function changeLayerVisibilityEllipsesRela() {
    if (document.getElementById("checkboxEllipsesRela").checked === true) {
        ellipseRelaLayer.setVisible(true);
    } else {
        ellipseRelaLayer.setVisible(false);
    };
};

function changeLayerVisibilityRectangles() {
    if (document.getElementById("checkboxRectangles").checked === true) {
        rectangleLayer.setVisible(true);
    } else {
        rectangleLayer.setVisible(false);
    };
};

function changeLayerVisibilityRectanglesRela() {
    if (document.getElementById("checkboxRectanglesRela").checked === true) {
        rectangleRelaLayer.setVisible(true);
    } else {
        rectangleRelaLayer.setVisible(false);
    };
};

function changeLayerVisibilityGnss() {
    if (document.getElementById("checkboxGnss").checked === true) {
        gnssLayer.setVisible(true);
    } else {
        gnssLayer.setVisible(false);
    };
};

function changeLayerVisibilityCoordE() {
    if (document.getElementById("checkboxCoordE").checked === true) {
        obsCoordELayer.setVisible(true);
    } else {
        obsCoordELayer.setVisible(false);
    };
};

function changeLayerVisibilityCoordN() {
    if (document.getElementById("checkboxCoordN").checked === true) {
        obsCoordNLayer.setVisible(true);
    } else {
        obsCoordNLayer.setVisible(false);
    };
};

function changeLayerVisibilityFiabLoc() {
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
    } else {
        fiabLocalLayer.setVisible(false);
    };
};

function changeLayerVisibilityWi() {
    if (document.getElementById("checkboxResidusNormes").checked === true) {
        wiLayer.setVisible(true);
        document.getElementById("checkboxFiabLoc").checked = false;
        document.getElementById("checkboxDistances").checked = false;
        document.getElementById("checkboxDirections").checked = false;
        fiabLocalLayer.setVisible(false);
        distanceLayer.setVisible(false);
        directionLayer.setVisible(false);  
    } else {
        wiLayer.setVisible(false);
    };
};


function changeLayerVisibilityVect() {
    if (document.getElementById("checkboxVect").checked === true) {
        vectLayer.setVisible(true);
    } else {
        vectLayer.setVisible(false);
    };
};



function changeLayerVisibilityTextFixedPoints() {

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

function changeLayerVisibilityTextVariablePoints() {

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