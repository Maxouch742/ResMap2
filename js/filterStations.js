function filterStations(){

    const niveau_zoom = 18;

    // Récupérer la valeur du point cherché
    matricule = document.getElementById("filterStation").value;
    console.log(matricule);
    console.log(planiStation, matricule)

    //reinitFilter();

    const check = document.getElementsByName("AbrissPlani");
    let dim;
    for (let i=0; i<check.length; i++) {
        if (check[i].checked){
            dim = check[i].value;
        }
    };

    switch (dim){
        case 'AbrissPlani':
            // Si le point est présent dans la liste des stations planimétriques
            if (planiStation.includes(matricule)){

                // désactiver tous les layers altimétriques et plani
                document.getElementById('checkboxAffich_alti').checked = true;
                changeLayerVisibility('alti_affich');
                document.getElementById('checkboxAffich').checked = true;
                changeLayerVisibility('plani_affich');

                console.log("BONJOUR")

                // On parcours l'ensemble des features de la couche des points fixes planimétriques
                planiPtsF_layer.getSource().getFeatures().forEach(function (feature) {
                    if (feature.getProperties().name === matricule) {

                        console.log("TOP")
                        view.setCenter(feature.getGeometry().getCoordinates());
                        view.setZoom(niveau_zoom);

                        tempSourcePts_sta.addFeature(feature);
                        styleUpdate('planiPtsF', true, true);
                    }
                    else {
                        stylePtsF_filter.getText().setText(feature.getId());
                        feature.setStyle(stylePtsF_filter);
                    };
                });

                // Parcourir la couche des points nouveaux planimétriques
                planiPtsN_layer.getSource().getFeatures().forEach(function (feature) {
                    if (feature.getProperties().name === matricule) {
                        view.setCenter(feature.getGeometry().getCoordinates());
                        view.setZoom(niveau_zoom);

                        tempSourcePts_sta.addFeature(feature);
                        styleUpdate('planiPtsN', true, true);

                        ptsN = true;
                    }
                    else {
                        stylePtsN_plani_filter.getText().setText(feature.getId());
                        feature.setStyle(stylePtsN_plani_filter);
                    }
                });

                //affichPrecisionPlani(pts_Map, xmlDoc, matricule);
                //affichRectanglePlani(pts_Map, matricule);
                //affichVecteurs(pts_Map, matricule);

                // On affiche les observations seulement (avec zi et wi)
                defineLayers("filter");
                affichMeasPlani(xmlDoc, pts_Map, false, matricule);
                affichFiabLocPlani(xmlDoc, pts_Map, false, matricule);
                affichResiNormesPlani(xmlDoc, pts_Map, false, matricule);

                


            }
            else {
                document.getElementById("filterStationNot").innerHTML = 'La station n\'existe pas en 2D!';
            }
            break;
        case 'AbrissAlti':
            break;
    }    
}