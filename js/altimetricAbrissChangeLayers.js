function changeLayerVisibilityDenivelee_altimetric() {
    if (document.getElementById("checkboxDenivelee").checked === true) {
        deniveleeLayer.setVisible(true);
    } else {
        deniveleeLayer.setVisible(false);
    };
};