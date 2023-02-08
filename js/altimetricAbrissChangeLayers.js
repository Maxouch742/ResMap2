function changeLayerVisibilityDenivelee_altimetric() {
    if (document.getElementById("checkboxDenivelee").checked === true) {
        pointsLayer.setVisible(true);
    } else {
        pointsLayer.setVisible(false);
    };
};