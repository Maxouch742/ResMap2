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
                // désactiver tous les layers altimétriques et plani
                document.getElementById('checkboxAffich_alti').checked = true;
                changeLayerVisibility('alti_affich');
                document.getElementById('checkboxAffich').checked = true;
                changeLayerVisibility('plani_affich');

                // Check si le point est présent en plani
                if (pts_planiObs.includes(matricule)) {
                    
                    // Savoir si on est sur un point fixe ou point nouveau
                    let ptsN = false;

                    // On parcours l'ensemble des features de la couche des points fixes planimétriques
                    planiPtsF_layer.getSource().getFeatures().forEach(function (feature) {
                        if (feature.getProperties().name === matricule) {
                            view.setCenter(feature.getGeometry().getCoordinates());
                            view.setZoom(niveau_zoom);

                            tempSourcePts.addFeature(feature);
                            styleUpdate('planiPtsF', true);
                        }
                    });

                    // Parcourir la couche des points nouveaux planimétriques
                    planiPtsN_layer.getSource().getFeatures().forEach(function (feature) {
                        if (feature.getProperties().name === matricule) {
                            view.setCenter(feature.getGeometry().getCoordinates());
                            view.setZoom(niveau_zoom);

                            tempSourcePts.addFeature(feature);
                            styleUpdate('planiPtsN', true);

                            ptsN = true;
                        }
                    });

                    // Si le point est nouveau, on affiche l'ellipse, le rectangle et le vecteur de déplacement
                    if (ptsN) {
                        planiEll_layer.getSource().getFeatures().forEach(function (feature) {
                            if (feature.getProperties().name === matricule) {
                                tempSourceEll.addFeature(feature);
                                styleUpdate('planiEll', true);
                            }
                        });
                        planiRect_layer.getSource().getFeatures().forEach(function (feature) {
                            if (feature.getProperties().name === matricule) {
                                tempSourceRect.addFeature(feature);
                                styleUpdate('planiRect', true);
                            }
                        });
                        planiVect_layer.getSource().getFeatures().forEach(function (feature) {
                            if (feature.getProperties().name === matricule) {
                                tempSourceVect.addFeature(feature);
                                styleUpdate('planiVect', true);
                            }
                        });
                    };

                    // On affiche les observations seulement
                    affichMeasPlani(xmlDoc, pts_Map, matricule);
                    affichFiabLocPlani(xmlDoc, pts_Map, matricule);
                    affichResiNormesPlani(xmlDoc, pts_Map, matricule);
                    
                }
                else {
                    document.getElementById("filterPointNot").innerHTML = 'Le point n\'est pas mesuré en 2D!';
                };
                break;

            case 'AbrissAlti':
                // désactiver tous les layers altimétriques et planimétriques
                document.getElementById('checkboxAffich_alti').checked = true;
                changeLayerVisibility('alti_affich');
                document.getElementById('checkboxAffich').checked = true;
                changeLayerVisibility('plani_affich');

                // Savoir si on est sur un point fixe ou point nouveau
                let ptsN_alti = false;

                // checker si le point existe dans l'abriss 1D
                if (pts_altiObs.includes(matricule)) {

                    // On parcours l'ensemble des features de la couche des points fixes planimétriques
                    altiPtsF_layer.getSource().getFeatures().forEach(function (feature) {
                        if (feature.getProperties().name === matricule) {
                            view.setCenter(feature.getGeometry().getCoordinates());
                            view.setZoom(niveau_zoom);

                            tempSourcePts_alti.addFeature(feature);
                            styleUpdate('altiPtsF', true);
                        }
                    });

                    // Parcours de la couche des points nouveaux altimétriques
                    altiPtsN_layer.getSource().getFeatures().forEach(function (feature) {
                        if (feature.getProperties().name === matricule) {
                            view.setCenter(feature.getGeometry().getCoordinates());
                            view.setZoom(niveau_zoom);

                            tempSourcePts_alti.addFeature(feature);
                            styleUpdate('altiPtsN', true);
                            ptsN_alti = true;
                        }
                    });

                    if (ptsN_alti){
                        altiEll_layer.getSource().getFeatures().forEach(function (feature) {
                            if (feature.getProperties().name === matricule) {
                                tempSourceEll_alti.addFeature(feature);
                                styleUpdate('altiEll', true);
                            }
                        });
                        altiRect_layer.getSource().getFeatures().forEach(function (feature) {
                            if (feature.getProperties().name === matricule) {
                                tempSourceRect_alti.addFeature(feature);
                                styleUpdate('altiRect', true);
                            }
                        });
                        altiVect_layer.getSource().getFeatures().forEach(function (feature) {
                            if (feature.getProperties().name === matricule) {
                                tempSourceVect_alti.addFeature(feature);
                                styleUpdate('altiVect', true);
                            }
                        });
                    }
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