function zoomPoints() {

    // Récupérer le matricule cherché
    matricule = document.getElementById("zoomPoint").value;

    let cont = 0;

    planiPtsF_layer.getSource().getFeatures().forEach(function (feature) {
        if (feature.getProperties().name === matricule){
            view.setCenter(feature.getGeometry().getCoordinates());
            view.setZoom(20);
        } 
        else {
            cont++;
        }
    });
    planiPtsN_layer.getSource().getFeatures().forEach(function (feature) {
        if (feature.getProperties().name === matricule){
            view.setCenter(feature.getGeometry().getCoordinates());
            view.setZoom(20);
        }
        else {
            cont++;
        }
    });
    altiPtsF_layer.getSource().getFeatures().forEach(function (feature) {
        if (feature.getProperties().name === matricule){
            view.setCenter(feature.getGeometry().getCoordinates());
            view.setZoom(20);
        }
        else {
            cont++;
        }
    });
    altiPtsN_layer.getSource().getFeatures().forEach(function (feature) {
        if (feature.getProperties().name === matricule){
            view.setCenter(feature.getGeometry().getCoordinates());
            view.setZoom(20);
        }
        else {
            cont++;
        }
    });

    const nb_features = planiPtsF_layer.getSource().getFeatures().length + 
                        planiPtsN_layer.getSource().getFeatures().length + 
                        altiPtsF_layer.getSource().getFeatures().length + 
                        altiPtsN_layer.getSource().getFeatures().length;
    if (cont === nb_features){
        document.getElementById("zoomPointNot").innerHTML = 'Le point n\'existe pas!';
    }
}