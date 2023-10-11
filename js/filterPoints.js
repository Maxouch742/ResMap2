function filterPoints(){

    defineLayersTemp();

    // Récupérer la valeur du point cherché
    matricule = document.getElementById("filterPoint").value;

    // enlever les boites d'informations
    document.getElementById("filterPointNot").innerHTML = '';
    document.getElementById("filterStationNot").innerHTML = '';

    // Paramètres de zoom
    const niveau_zoom = 18;    

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
                // désactiver tous les layers altimétriques
                document.getElementById('checkboxAffich_alti').checked = true;
                changeLayerVisibility('alti_affich');

                // On parcours l'ensemble des features de la couche des points fixes planimétriques
                planiPtsF_layer.getSource().getFeatures().forEach(function (feature) {

                    // Si le nom du feature est différent du matricule choisi par l'utilisateur, on change le style du point
                    if (feature.getProperties().name !== matricule) {
                        const newStyle = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-filled-svgrepo-com.png',
                                scale: '0.07',
                                color: '#979696', 
                            }),
                            text: new ol.style.Text({
                                textAlign: "center",
                                text: feature.getProperties().name,
                                textBaseline: "middle",
                                font: "bold 14px Calibri",
                                fill: new ol.style.Fill({
                                    color: '#979696'
                                }),
                                stroke: new ol.style.Stroke({
                                color: "#fff", width: 3
                                }),
                                offsetX: 15.0,
                                offsetY: -10.0,
                                rotation: 0
                            })
                        });
                        feature.setStyle( newStyle );
                    }
                    // si on a le même feature que celui demandé ar l'utilisateur, on zoome alors sur ce point
                    else {
                        
                        view.setCenter(feature.getGeometry().getCoordinates());
                        view.setZoom(niveau_zoom);
                    }
                });

                // Parcourir la couche des points nouveaux planimétriques
                planiPtsN_layer.getSource().getFeatures().forEach(function (feature) {

                    // Si le nom du feature est différent du matricule, on change le style du point
                    if (feature.getProperties().name !== matricule) {
                        const newStyle = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-filled-svgrepo-com.png',
                                scale: '0.07',
                                color: '#C1C1C1', 
                            }),
                            text: new ol.style.Text({
                                textAlign: "center",
                                text: feature.getProperties().name,
                                textBaseline: "middle",
                                font: "bold 14px Calibri",
                                fill: new ol.style.Fill({
                                    color: '#C1C1C1'
                                }),
                                stroke: new ol.style.Stroke({
                                color: "#fff", width: 3
                                }),
                                offsetX: 15.0,
                                offsetY: -10.0,
                                rotation: 0
                            })
                        });
                        feature.setStyle( newStyle );
                    }
                    // si on a le même feature que celui demandé ar l'utilisateur, on zoome alors sur ce point
                    else {
                        view.setCenter(feature.getGeometry().getCoordinates());
                        view.setZoom(niveau_zoom);
                    }
                });

                // Affichage des layers
                /*
                planiPtsF_layer.setVisible(true);
                changeLayerVisibility('plani_ptsF');
                planiPtsN_layer.setVisible(true);
                changeLayerVisibility('plani_ptsN');
                planiEll_layer.setVisible(true);
                changeLayerVisibility('plani_ell');
                planiRect_layer.setVisible(true);
                changeLayerVisibility('plani_rect');
                planiVect_layer.setVisible(true);
                changeLayerVisibility('plani_vect');
                */

                break;

            case 'AbrissAlti':
                // désactiver tous les layers planimétriques
                document.getElementById('checkboxAffich').checked = true;
                changeLayerVisibility('plani_affich');

                // On parcours l'ensemble des features de la couche des points fixes planimétriques
                altiPtsF_layer.getSource().getFeatures().forEach(function (feature) {

                    // Si le nom du feature est différent du matricule choisi par l'utilisateur, on change le style du point
                    if (feature.getProperties().name !== matricule) {
                        const newStyle = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-filled-svgrepo-com.png',
                                scale: '0.07',
                                color: '#979696', 
                            }),
                            text: new ol.style.Text({
                                textAlign: "center",
                                text: feature.getProperties().name,
                                textBaseline: "middle",
                                font: "bold 14px Calibri",
                                fill: new ol.style.Fill({
                                    color: '#979696'
                                }),
                                stroke: new ol.style.Stroke({
                                color: "#fff", width: 3
                                }),
                                offsetX: 15.0,
                                offsetY: -10.0,
                                rotation: 0
                            })
                        });
                        feature.setStyle( newStyle );
                    }
                    // si on a le même feature que celui demandé ar l'utilisateur, on zoome alors sur ce point
                    else {
                        view.setCenter(feature.getGeometry().getCoordinates());
                        view.setZoom(niveau_zoom);
                    }
                });

                // Parcourir la couche des points nouveaux planimétriques
                altiPtsF_layer.getSource().getFeatures().forEach(function (feature) {

                    // Si le nom du feature est différent du matricule, on change le style du point
                    if (feature.getProperties().name !== matricule) {
                        const newStyle = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-filled-svgrepo-com.png',
                                scale: '0.07',
                                color: '#C1C1C1', 
                            }),
                            text: new ol.style.Text({
                                textAlign: "center",
                                text: feature.getProperties().name,
                                textBaseline: "middle",
                                font: "bold 14px Calibri",
                                fill: new ol.style.Fill({
                                    color: '#C1C1C1'
                                }),
                                stroke: new ol.style.Stroke({
                                color: "#fff", width: 3
                                }),
                                offsetX: 15.0,
                                offsetY: -10.0,
                                rotation: 0
                            })
                        });
                        feature.setStyle( newStyle );
                    }
                    // si on a le même feature que celui demandé ar l'utilisateur, on zoome alors sur ce point
                    else {
                        view.setCenter(feature.getGeometry().getCoordinates());
                        view.setZoom(niveau_zoom);
                    }
                });

                // Affichage des layers
                altiPtsF_layer.setVisible(true);
                changeLayerVisibility('alti_ptsF');
                altiPtsN_layer.setVisible(true);
                changeLayerVisibility('alti_ptsN');
                altiEll_layer.setVisible(true);
                changeLayerVisibility('alti_ell');
                altiRect_layer.setVisible(true);
                changeLayerVisibility('alti_rect');
                altiVect_layer.setVisible(true);
                changeLayerVisibility('alti_vect');

                break;
        }
    } 
    else {
        // si le point n'est pas présent dans la liste globale, on prévient l'utilisateur
        document.getElementById("filterPointNot").innerHTML = 'Le point n\'existe pas !';
    }
}