function filterPoints(){

    input = document.getElementById("filterPoint");
    matricule = input.value;

    

    // Si le point est présent dans la liste générale
    if (pts_Map.has(matricule)){

        console.log("Matricule trouvé:", matricule)

        const check = document.getElementById("filterAbriss").value;

        switch (check) {
            case 'AbrissPlani':
                // désactiver tous les layers altimétriques
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
                        view.setZoom(16);
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
                        view.setZoom(16);
                    }
                });
                break;

            case 'AbrissAlti':
                // désactiver tous les layers planimétriques
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
                        view.setZoom(16);
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
                        view.setZoom(16);
                    }
                });
                break;
        }

        

        
        // TODO : désactiver les autres observations qui n'ont pas le matricule comme point de visée pour vraiment mettre en évidence le point et les observations issues de cela


    } 
    else {
        // si le point n'est pas présent dans la liste globale, on prévient l'utilisateur
        document.getElementById("filterPointNot").innerHTML = 'Le point n\'existe pas !';
    }
}