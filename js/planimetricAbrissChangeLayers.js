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

function changeLayerVisibilityDistances_planimetric() {
    if (document.getElementById("checkboxDistances").checked === true) {
        distanceLayer.setVisible(true);
    } else {
        distanceLayer.setVisible(false);
    }
};

function changeLayerVisibilityDirections_planimetric() {
    if (document.getElementById("checkboxDirections").checked === true) {
        directionLayer.setVisible(true);
    } else {
        directionLayer.setVisible(false);
    };
};

function changeLayerVisibilityEllipses_planimetric() {
    if (document.getElementById("checkboxEllipses").checked === true) {
        ellipseLayer.setVisible(true);
    } else {
        ellipseLayer.setVisible(false);
    };
};

function changeLayerVisibilityEllipsesRela_planimetric() {
    if (document.getElementById("checkboxEllipsesRela").checked === true) {
        ellipseRelaLayer.setVisible(true);
    } else {
        ellipseRelaLayer.setVisible(false);
    };
};

function changeLayerVisibilityRectangles_planimetric() {
    if (document.getElementById("checkboxRectangles").checked === true) {
        rectangleLayer.setVisible(true);
    } else {
        rectangleLayer.setVisible(false);
    };
};

function changeLayerVisibilityRectanglesRela_planimetric() {
    if (document.getElementById("checkboxRectanglesRela").checked === true) {
        rectangleRelaLayer.setVisible(true);
    } else {
        rectangleRelaLayer.setVisible(false);
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
    } else {
        fiabLocalLayer.setVisible(false);
    };
};

function changeLayerVisibilityWi_planimetric() {
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


function changeLayerVisibilityVect_planimetric() {
    if (document.getElementById("checkboxVect").checked === true) {
        vectLayer.setVisible(true);
    } else {
        vectLayer.setVisible(false);
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