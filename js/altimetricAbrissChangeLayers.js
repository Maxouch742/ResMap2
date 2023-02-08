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
        obsCoordELayer.setVisible(true);
    } else {
        obsCoordELayer.setVisible(false);
    };
};