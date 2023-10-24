function reinitFilter(){
    // Réinitialiser les input et les messages d'erreurs
    document.getElementById("filterPointNot").innerHTML = '';
    document.getElementById("filterStationNot").innerHTML = '';
    document.getElementById("filterPoint").value = '';
    document.getElementById("filterStation").value = '';

    // désactiver tous les layers altimétriques et plani
    document.getElementById('checkboxAffich_alti').checked = true;
    changeLayerVisibility('alti_affich');
    document.getElementById('checkboxAffich').checked = true;
    changeLayerVisibility('plani_affich');

    // Réinitialiser les layers
    tempLayerPts.setVisible(false);
    tempLayerPts_alti.setVisible(false);
    tempLayerPts_sta.setVisible(false);
    tempLayerPts_sta_alti.setVisible(false);

    // Rezoomer sur l'ensemble du réseau géodésique
    defineViewByFile(pts_Map);

    // Remettre le radiobutton sur 2D
    const check = document.getElementsByName("AbrissPlani");
    for (let i=0; i<check.length; i++) {
        if (check[i].value === "AbrissPlani"){
            check[i].checked = true;
        }
        else {
            check[i].checked = false;
        }
    };

    // Mettre à jour les layers
    affichPointsPlani(pts_Map, pts_planiVar, pts_planiObs);
    affichPrecisionPlani(pts_Map, xmlDoc);
    affichRectanglePlani(pts_Map);
    affichVecteurs(pts_Map);
    affichMeasPlani(xmlDoc, pts_Map);
    affichFiabLocPlani(xmlDoc, pts_Map);
    affichResiNormesPlani(xmlDoc, pts_Map);

    affichPointsAlti(pts_Map, pts_altiVar, pts_altiObs);
    affichPrecisionAlti(pts_Map, xmlDoc);
    affichRectangleAlti(pts_Map, xmlDoc);
    affichFiabLocAlti(pts_Map, xmlDoc);
    affichResiNormesAlti(pts_Map, xmlDoc);
    affichVecteursAlti(pts_Map);

    defineLayersTemp();
}