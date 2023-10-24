function filterPoints(){

    defineLayersTemp();

    // Récupérer la valeur du point cherché
    matricule = document.getElementById("filterPoint").value;

    // enlever les boites d'informations
    document.getElementById("filterPointNot").innerHTML = '';
    document.getElementById("filterStationNot").innerHTML = '';

    // Paramètres de zoom
    const niveau_zoom = 20;    

    // Si le point est présent dans la liste générale
    if (pts_Map.has(matricule)){

        const check = document.getElementsByName("AbrissPlani");
        let dim;
        for (let i=0; i<check.length; i++) {
            if (check[i].checked){
                dim = check[i].value;
            }
        };

        switch (dim) {
            case 'AbrissPlani':

                // Check si le point est présent en plani
                if (pts_planiObs.includes(matricule)) {

                    // désactiver tous les layers altimétriques et plani
                    document.getElementById('checkboxAffich_alti').checked = true;
                    changeLayerVisibility('alti_affich');
                    document.getElementById('checkboxAffich').checked = true;
                    changeLayerVisibility('plani_affich');
                    
                    // Changer les symboles des points nouveaux et fixes
                    styleUpdate('planiPtsF', true);
                    styleUpdate('planiPtsN', true);

                    // Récupérer le feature du point
                    let matricule_feature = planiPtsF_layer.getSource().getFeatureById(matricule);
                    if (matricule_feature === null){
                        matricule_feature = planiPtsN_layer.getSource().getFeatureById(matricule);
                        tempSourcePts.addFeature(matricule_feature);
                        tempLayerPts.setStyle( function(feature) {
                            stylePtsN_plani.getText().setText(feature.getId());
                            return stylePtsN_plani;
                        });
                    } else {
                        tempSourcePts.addFeature(matricule_feature);
                        tempLayerPts.setStyle( function(feature) {
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
                    const liste_points_stations = [matricule];
                    for (let i=0; i<list_layer.length; i++){
                        if (list_layer[i].getSource() !== null){
                            list_layer[i].getSource().getFeatures().forEach(function (feature){
                                if (feature.getProperties().visee !== matricule){
                                    list_layer[i].getSource().removeFeature(feature);
                                } else {
                                    if (liste_points_stations.includes(feature.getProperties().station) === false){
                                        liste_points_stations.push(feature.getProperties().station);
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
                                if (liste_points_stations.includes(feature.getProperties().name) === false){
                                    list_layer_PrecFiab[i].getSource().removeFeature(feature);
                                }
                            })
                        }
                    };
    
                    // Zoomer sur le point
                    view.setCenter(matricule_feature.getGeometry().getCoordinates());
                    view.setZoom(niveau_zoom);                  
                }
                else {
                    document.getElementById("filterPointNot").innerHTML = 'Le point n\'est pas mesuré en 2D!';
                };
                break;

            case 'AbrissAlti':

                if (pts_altiObs.includes(matricule)) {

                    // désactiver tous les layers altimétriques et planimétriques
                    document.getElementById('checkboxAffich_alti').checked = true;
                    changeLayerVisibility('alti_affich');
                    document.getElementById('checkboxAffich').checked = true;
                    changeLayerVisibility('plani_affich');

                    // Mise à jour du style
                    styleUpdate("altiPtsF", true);
                    styleUpdate("altiPtsN", true);

                    // Récupérer le feature du point
                    let matricule_feature = altiPtsF_layer.getSource().getFeatureById(matricule);
                    if (matricule_feature === null){
                        matricule_feature = altiPtsN_layer.getSource().getFeatureById(matricule);
                        tempSourcePts_alti.addFeature(matricule_feature)
                        tempLayerPts_alti.setStyle( function (feature) {
                            stylePtsN_alti.getText().setText(feature.getId());
                            return stylePtsN_alti;
                        });
                    } else {
                        tempSourcePts_alti.addFeature(matricule_feature)
                        tempLayerPts_alti.setStyle( function (feature) {
                            stylePtsF.getText().setText(feature.getId());
                            return stylePtsF;
                        });
                    };

                    // Créer une liste de points visées
                    const list_points_station_alti = [matricule];

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
                                if (feature.getProperties().visee !== matricule){
                                    list_layer_alti[i].getSource().removeFeature(feature);
                                } else {
                                    if (list_points_station_alti.includes(feature.getProperties().station) === false){
                                        list_points_station_alti.push(feature.getProperties().station);
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
                                if (list_points_station_alti.includes(feature.getProperties().name) === false){
                                    list_layer_PrecFiab_alti[i].getSource().removeFeature(feature);
                                }
                            })
                        }
                    };

                    // Zoomer sur le point
                    view.setCenter(matricule_feature.getGeometry().getCoordinates());
                    view.setZoom(niveau_zoom);
                }
                else {
                    document.getElementById("filterPointNot").innerHTML = 'Le point n\'est pas mesuré en 1D!';
                }
                break;
        }
    } 
    else {
        // si le point n'est pas présent dans la liste globale, on prévient l'utilisateur
        document.getElementById("filterPointNot").innerHTML = 'Le point n\'existe pas !';
    }
}


//TODO: afficher les observations