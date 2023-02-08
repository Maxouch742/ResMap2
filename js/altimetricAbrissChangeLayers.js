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
    } else {
        ellipseLayerAltimetric.setVisible(false);
    };
};