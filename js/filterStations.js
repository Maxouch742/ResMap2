function filterStations(){

    const niveau_zoom = 17;

    // Récupérer la valeur du point cherché
    matricule_sta = document.getElementById("filterStation").value;

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
            if (planiStation.includes(matricule_sta)){

                // désactiver tous les layers altimétriques
                document.getElementById('checkboxAffich_alti').checked = true;
                changeLayerVisibility('alti_affich');

                // Changer les symboles des points nouveaux et fixes
                styleUpdate('planiPtsF', true);
                styleUpdate('planiPtsN', true);

                // Récupérer le feature du point
                let matricule_feature = planiPtsF_layer.getSource().getFeatureById(matricule_sta);
                if (matricule_feature === null){
                    matricule_feature = planiPtsN_layer.getSource().getFeatureById(matricule_sta);
                    tempSourcePts_sta.addFeature(matricule_feature);
                    tempLayerPts_sta.setStyle( function(feature) {
                        stylePtsN_plani.getText().setText(feature.getId());
                        return stylePtsN_plani;
                    })
                } else {
                    tempSourcePts_sta.addFeature(matricule_feature);
                    tempLayerPts_sta.setStyle( function(feature) {
                        stylePtsF.getText().setText(feature.getId());
                        return stylePtsF;
                    })
                };

                // Suppression des features non utiles
                const list_layer = [
                    planiDir_layer, 
                    planiDis_layer,
                    planiGNSS_layer,
                    planiCoordE_layer,
                    planiCoordN_layer,

                    planiFiabLocDir_layer,
                    planiFiabLocDis_layer,
                    planiFiabLocGNSS_layer,
                    planiFiabLocCoordE_layer,
                    planiFiabLocCoordN_layer,

                    planiResiDir_layer,
                    planiResiDis_layer,
                    planiResiGNSS_layer,
                    planiResiCoordE_layer,
                    planiResiCoordN_layer,
                ];

                const liste_points_visees = [matricule_sta];

                for (let i=0; i<list_layer.length; i++){
                    if (list_layer[i].getSource() !== null){
                        list_layer[i].getSource().getFeatures().forEach(function (feature){
                            if (feature.getProperties().station !== matricule_sta){
                                list_layer[i].getSource().removeFeature(feature);
                            } else {
                                if (liste_points_visees.includes(feature.getProperties().visee) === false){
                                    liste_points_visees.push(feature.getProperties().visee);
                                }
                            }
                        });
                    };
                };

                // Sélection de points pour les ellipses et les rectangles
                const list_layer_PrecFiab = [
                    planiEll_layer,
                    planiRect_layer,
                    planiVect_layer
                ];
                for (let i=0; i<list_layer_PrecFiab.length; i++){
                    if (list_layer_PrecFiab[i].getSource() !== null){
                        list_layer_PrecFiab[i].getSource().getFeatures().forEach(function (feature){
                            if (liste_points_visees.includes(feature.getProperties().name) === false){
                                list_layer_PrecFiab[i].getSource().removeFeature(feature);
                            }
                        })
                    }
                };

                // Zoomer sur le point
                view.setCenter(matricule_feature.getGeometry().getCoordinates());
                view.setZoom(niveau_zoom);

            } else {
                document.getElementById("filterStationNot").innerHTML = 'La station n\'existe pas en 2D!';
            }
            break;
        case 'AbrissAlti':
            // Si le point est présent dans la liste des stations
            if (altiStation.includes(matricule_sta)){
                
                // désactiver les layers planimétriques
                document.getElementById("checkboxAffich").checked = true;
                changeLayerVisibility("plani_affich");

                // Changer les symboles des points
                styleUpdate("altiPtsF", true);
                styleUpdate("altiPtsN", true);

                // Récupérer le feature du point
                let matricule_feature = altiPtsF_layer.getSource().getFeatureById(matricule_sta);
                if (matricule_feature === null){
                    matricule_feature = altiPtsN_layer.getSource().getFeatureById(matricule_sta);
                    tempSourcePts_sta_alti.addFeature(matricule_feature)
                    tempLayerPts_sta_alti.setStyle( function (feature) {
                        stylePtsN_alti.getText().setText(feature.getId());
                        return stylePtsN_alti;
                    });
                } else {
                    tempSourcePts_sta_alti.addFeature(matricule_feature)
                    tempLayerPts_sta_alti.setStyle( function (feature) {
                        stylePtsF.getText().setText(feature.getId());
                        return stylePtsF;
                    });
                }

                // Créer une liste de points visées
                const list_points_visees_alti = [matricule_sta];

                // Suppression des features non utiles
                const list_layer_alti = [
                    altiDH_layer, 
                    altiGNSS_layer,
                    altiCoordH_layer,

                    altiFiabLocDH_layer,
                    altiFiabLocGNSS_layer,
                    altiFiabLocCoordH_layer,

                    altiResiDH_layer,
                    altiResiGNSS_layer,
                    altiResiCoordH_layer,
                ];
                for (let i=0; i<list_layer_alti.length; i++){
                    if (list_layer_alti[i].getSource() !== null){

                        list_layer_alti[i].getSource().getFeatures().forEach(function (feature){
                            if (feature.getProperties().station !== matricule_sta){
                                list_layer_alti[i].getSource().removeFeature(feature);
                            } else {
                                if (list_points_visees_alti.includes(feature.getProperties().visee) === false){
                                    list_points_visees_alti.push(feature.getProperties().visee);
                                }
                            }
                        });

                    };
                };

                // Sélection des points pour les ellipses et les rectangles
                const list_layer_PrecFiab_alti = [
                    altiEll_layer,
                    altiRect_layer,
                    altiVect_layer
                ];
                for (let i=0; i<list_layer_PrecFiab_alti.length; i++){
                    if (list_layer_PrecFiab_alti[i].getSource() !== null){
                        list_layer_PrecFiab_alti[i].getSource().getFeatures().forEach(function (feature){
                            if (list_points_visees_alti.includes(feature.getProperties().name) === false){
                                list_layer_PrecFiab_alti[i].getSource().removeFeature(feature);
                            }
                        })
                    }
                };

                // Zoomer sur le point
                view.setCenter(matricule_feature.getGeometry().getCoordinates());
                view.setZoom(niveau_zoom);

                // Afficher les points fixes et planimétriques
                document.getElementById("checkboxPtsN_alti").checked = true;
                document.getElementById("checkboxPtsF_alti").checked = true;
                changeLayerVisibility("alti_ptsN");
                changeLayerVisibility("alti_ptsF");
            }
            else {
                document.getElementById("filterStationNot").innerHTML = 'La station n\'existe pas en 1D!';
            }
            break;
    }    
}