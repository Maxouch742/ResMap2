function changeLayerVisibilityDenivelee_altimetric() {
    if (document.getElementById("checkboxDenivelee").checked === true) {
        deniveleeLayer.setVisible(true);
    } else {
        deniveleeLayer.setVisible(false);
    };
};

function changeLayerVisibilityGnss_altimetric() {
    if (document.getElementById("checkboxGnss_altimetric").checked === true) {
        gnssLayerAltimetric.setVisible(true);
    } else {
        gnssLayerAltimetric.setVisible(false);
    };
};

function changeLayerVisibilityCoordH() {
    if (document.getElementById("checkboxCoordH").checked === true) {
        obsCoordHLayer.setVisible(true);
    } else {
        obsCoordHLayer.setVisible(false);
    };
};

function changeLayerVisibilityEllipses_altimetric() {
    if (document.getElementById("checkboxEllipses_altimetric").checked === true) {
        ellipseLayerAltimetric.setVisible(true);
        document.getElementById("AffichageEchelleEllipse_altimetric").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        ellipseLayerAltimetric.setVisible(false);
        document.getElementById("AffichageEchelleEllipse_altimetric").textContent = "";
    };
};

function changeLayerVisibilityEllipsesRela_altimetric() {
    if (document.getElementById("checkboxEllipsesRela_altimetric").checked === true) {
        ellipRelaAltiLayer.setVisible(true);
        document.getElementById("AffichageEchelleEllipseRela_altimetric").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        ellipRelaAltiLayer.setVisible(false);
        document.getElementById("AffichageEchelleEllipseRela_altimetric").textContent = "";
    };
};

function changeLayerVisibilityRect_altimetric(){
    if (document.getElementById("checkboxRectangles_altimetric").checked === true){
        //   .setVisible(true);
        document.getElementById("AffichageEchelleRectangles_altimetric").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        //    .setVisible(false);
        document.getElementById("AffichageEchelleRectangles_altimetric").textContent = "";
    }
};

function changeLayerVisibilityRectRela_altimetric(){
    if (document.getElementById("checkboxRectanglesRela_altimetric").checked === true){
        //   .setVisible(true);
        document.getElementById("AffichageEchelleRectanglesRela_altimetric").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        //    .setVisible(false);
        document.getElementById("AffichageEchelleRectanglesRela_altimetric").textContent = "";
    }
};

function changeLayerVisibilityFiabiliteLocales_altimetric(){
    if (document.getElementById("checkboxFiabLoc_altimetric").checked === true){
        //   .setVisible(true);
        document.getElementById("fiabiliteLocal_altimetric1").textContent = "――  0 - 25 %";
        document.getElementById("fiabiliteLocal_altimetric2").textContent = "―― 25 - 50 %";
        document.getElementById("fiabiliteLocal_altimetric3").textContent = "―― 50 - 75 %";
        document.getElementById("fiabiliteLocal_altimetric4").textContent = "―― 75 - 100 %";
    } else {
        //    .setVisible(false);
        document.getElementById("fiabiliteLocal_altimetric1").textContent = "";
        document.getElementById("fiabiliteLocal_altimetric2").textContent = "";
        document.getElementById("fiabiliteLocal_altimetric3").textContent = "";
        document.getElementById("fiabiliteLocal_altimetric4").textContent = "";
    }
};

function changeLayerVisibilityResidusNormes_altimetric(){
    if (document.getElementById("checkboxResidusNormes_altimetric").checked === true){
        //   .setVisible(true);
        document.getElementById("palierWi1").textContent = "――  x - ∞";
        document.getElementById("palierWi2").textContent = "――  x - x";
        document.getElementById("palierWi3").textContent = "――  0.0 - x";
    } else {
        //    .setVisible(false);
        document.getElementById("palierWi1").textContent = "";
        document.getElementById("palierWi2").textContent = "";
        document.getElementById("palierWi3").textContent = "";
    }
};

function changeLayerVisibilityVect_altimetric() {
    if (document.getElementById("checkboxVect_altimetric").checked === true) {
        vectLayerAltimetric.setVisible(true);
        document.getElementById("AffichageEchelleVect_altimetric").textContent = "⤷ Echelle: " + echelleEllipses + ":1";
    } else {
        vectLayerAltimetric.setVisible(false);
        document.getElementById("AffichageEchelleVect_altimetric") = "";
    };
};


function altimetricActivateCheckBox() {
    document.getElementById("checkboxDenivelee").disabled = false;
    document.getElementById("checkboxCoordH").disabled = false;
    document.getElementById("checkboxGnss_altimetric").disabled = false;
    document.getElementById("checkboxEllipses_altimetric").disabled = false;
    document.getElementById("checkboxEllipsesRela_altimetric").disabled = false;
    document.getElementById("checkboxRectangles_altimetric").disabled = false;
    document.getElementById("checkboxRectanglesRela_altimetric").disabled = false;
    document.getElementById("checkboxFiabLoc_altimetric").disabled = false;
    document.getElementById("checkboxResidusNormes_altimetric").disabled = false;
    document.getElementById("checkboxVect_altimetric").disabled = false;
};