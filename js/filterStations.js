function filterStations(){

    const niveau_zoom = 17;

    // Récupérer la valeur du point cherché
    matricule = document.getElementById("filterStation").value;

    //reinitFilter();

    // Récupérer l'abriss choisie
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

                // désactiver tous les layers altimétriques
                document.getElementById('checkboxAffich_alti').checked = true;
                changeLayerVisibility('alti_affich');

                // Changer les symboles des points nouveaux et fixes
                styleUpdate('planiPtsF', true);
                styleUpdate('planiPtsN', true);

                // Variable pour savoir si c'est un point nouveau ou fixe
                let point_nouveau_fixe = false;

                // Récupérer le feature du point
                let matricule_feature = planiPtsF_layer.getSource().getFeatureById(matricule);
                if (matricule_feature === null){
                    point_nouveau_fixe = true;
                    matricule_feature = planiPtsN_layer.getSource().getFeatureById(matricule);
                };
                tempSourcePts_sta.addFeature(matricule_feature);
                if (point_nouveau_fixe){
                    tempLayerPts_sta.setStyle( function(feature) {
                        stylePtsN_plani.getText().setText(feature.getId());
                        return stylePtsN_plani;
                    });
                } else {
                    tempLayerPts_sta.setStyle( function(feature) {
                        stylePtsF.getText().setText(feature.getId());
                        return stylePtsF;
                    });
                }

                // Zoomer sur le point
                view.setCenter(matricule_feature.getGeometry().getCoordinates());
                view.setZoom(niveau_zoom);

                //affichPrecisionPlani(pts_Map, xmlDoc, matricule);
                //affichRectanglePlani(pts_Map, matricule);
                //affichVecteurs(pts_Map, matricule);

                // On affiche les observations seulement (avec zi et wi)
                //defineLayers("filter");
                affichMeasPlani(xmlDoc, pts_Map, false, matricule);
                affichFiabLocPlani(xmlDoc, pts_Map, false, matricule);
                affichResiNormesPlani(xmlDoc, pts_Map, false, matricule);

                if (document.getElementById('checkboxDir') !== null) {
                    document.getElementById('checkboxDir').checked = true;
                    changeLayerVisibility('plani_dir');
                };
                if (document.getElementById('checkboxDir') !== null) {
                    document.getElementById('checkboxDis').checked = true;
                    changeLayerVisibility('plani_dis');
                };


                


            }
            else {
                document.getElementById("filterStationNot").innerHTML = 'La station n\'existe pas en 2D!';
            }
            break;
        case 'AbrissAlti':
            break;
    }    
}