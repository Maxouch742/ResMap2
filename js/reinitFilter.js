function reinitFilter(){
    document.getElementById("filterPointNot").innerHTML = '';
    document.getElementById("filterStationNot").innerHTML = '';

    document.getElementById("filterPoint").value = '';
    document.getElementById("filterStation").value = '';

    tempLayerPts.setVisible(false);
    tempLayerEll.setVisible(false);
    tempLayerRect.setVisible(false);
    tempLayerVect.setVisible(false);

    defineViewByFile(pts_Map);
    defineLayersTemp();

    document.getElementById("checkboxPtsF").checked = true;
    changeLayerVisibility("plani_ptsF");
    document.getElementById("checkboxPtsN").checked = true;
    changeLayerVisibility("plani_ptsN");
}