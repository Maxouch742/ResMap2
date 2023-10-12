function reinitFilter(){
    // Réinitialiser les input et les messages d'erreurs
    document.getElementById("filterPointNot").innerHTML = '';
    document.getElementById("filterStationNot").innerHTML = '';
    document.getElementById("filterPoint").value = '';
    document.getElementById("filterStation").value = '';

    // Réinitialiser les layers
    tempLayerPts.setVisible(false);

    tempLayerPts_alti.setVisible(false);
    tempLayerEll_alti.setVisible(false);
    tempLayerRect_alti.setVisible(false);
    tempLayerVect_alti.setVisible(false);

    // Rezoomer sur l'ensemble du réseau géodésique
    defineViewByFile(pts_Map);
    defineLayersTemp();
    defineLayers();

    // Afficher les couches des points fixes et nouveau planimétriques
    /*
    document.getElementById("checkboxPtsF").checked = true;
    changeLayerVisibility("plani_ptsF");
    document.getElementById("checkboxPtsN").checked = true;
    changeLayerVisibility("plani_ptsN");*/

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
    affichPrecisionPlani(pts_Map, xmlDoc);
    affichRectanglePlani(pts_Map);
    affichVecteurs(pts_Map);
    affichMeasPlani(xmlDoc, pts_Map);
    affichFiabLocPlani(xmlDoc, pts_Map);
    affichResiNormesPlani(xmlDoc, pts_Map);
}