function defineLayers(){

    let zIndex = 99;

    //////// PLANIMETRIC
    //// Points 
    // Points fixes
    planiPtsF_layer = new ol.layer.Vector();
    planiPtsF_layer.setZIndex(zIndex);
    map.addLayer(planiPtsF_layer);
    zIndex--;
    // Points nouveaux
    planiPtsN_layer = new ol.layer.Vector();
    planiPtsN_layer.setZIndex(zIndex);
    map.addLayer(planiPtsN_layer);
    zIndex--;
    

    //// Observations
    // Observations de direction ('RI')
    planiDir_layer = new ol.layer.Vector();
    planiDir_layer.setZIndex(zIndex);
    map.addLayer(planiDir_layer);
    // Observations de distance ('DP')
    planiDis_layer = new ol.layer.Vector();
    planiDis_layer.setZIndex(zIndex);
    map.addLayer(planiDis_layer);
    zIndex--;

    // Observations de sessions GNSS
    planiGNSS_layer = new ol.layer.Vector();
    planiGNSS_layer.setZIndex(zIndex);
    map.addLayer(planiGNSS_layer);
    zIndex--;

    // Observations de coordonnée Est (calcul LI-AJ)
    planiCoordE_layer = new ol.layer.Vector();
    planiCoordE_layer.setZIndex(zIndex);
    map.addLayer(planiCoordE_layer);
    // Observations de coordonnée Nord (calcul LI-AJ)
    planiCoordN_layer = new ol.layer.Vector();
    planiCoordN_layer.setZIndex(zIndex);
    map.addLayer(planiCoordN_layer);
    zIndex--;
    
    //// Indicateurs
    // Ellipses de confiance
    planiEll_layer = new ol.layer.Vector();
    planiEll_layer.setZIndex(zIndex);
    map.addLayer(planiEll_layer);
    zIndex--;
    // Ellipses de confiance relative
    planiEllRel_layer = new ol.layer.Vector();
    planiEllRel_layer.setZIndex(zIndex);
    map.addLayer(planiEllRel_layer);
    zIndex--;
    // Rectangle de fiabilité
    planiRect_layer = new ol.layer.Vector();
    planiRect_layer.setZIndex(zIndex);
    map.addLayer(planiRect_layer);
    zIndex--;
    // Rectangle de fiabilité relatif
    planiRectRel_layer = new ol.layer.Vector();
    planiRectRel_layer.setZIndex(zIndex);
    map.addLayer(planiRectRel_layer);
    zIndex--;
    
    //// Fiabilité locale (zi)
    // Directions
    planiFiabLocDir_layer = new ol.layer.Vector();
    planiFiabLocDir_layer.setZIndex(zIndex);
    map.addLayer(planiFiabLocDir_layer);
    // Distances
    planiFiabLocDis_layer = new ol.layer.Vector();
    planiFiabLocDis_layer.setZIndex(zIndex);
    map.addLayer(planiFiabLocDis_layer);
    zIndex--;
    // GNSS
    planiFiabLocGNSS_layer = new ol.layer.Vector();
    planiFiabLocGNSS_layer.setZIndex(zIndex);
    map.addLayer(planiFiabLocGNSS_layer);
    zIndex--;
    // Coordonnée Est
    planiFiabLocCoordE_layer = new ol.layer.Vector();
    planiFiabLocCoordE_layer.setZIndex(zIndex);
    map.addLayer(planiFiabLocCoordE_layer);
    // Coordonnée Nord
    planiFiabLocCoordN_layer = new ol.layer.Vector();
    planiFiabLocCoordN_layer.setZIndex(zIndex);
    map.addLayer(planiFiabLocCoordN_layer);
    zIndex--;

    //// Résidus normés (wi)
    // Directions
    planiResiDir_layer = new ol.layer.Vector();
    planiResiDir_layer.setZIndex(zIndex);
    map.addLayer(planiResiDir_layer);
    // Distances
    planiResiDis_layer = new ol.layer.Vector();
    planiResiDis_layer.setZIndex(zIndex);
    map.addLayer(planiResiDis_layer);
    zIndex--;
    // GNSS
    planiResiGNSS_layer = new ol.layer.Vector();
    planiResiGNSS_layer.setZIndex(zIndex);
    map.addLayer(planiResiGNSS_layer);
    zIndex--;
    // Coordonnée Est
    planiResiCoordE_layer = new ol.layer.Vector({});
    planiResiCoordE_layer.setZIndex(zIndex);
    map.addLayer(planiResiCoordE_layer);
    // Coordonnée Nord
    planiResiCoordN_layer = new ol.layer.Vector({});
    planiResiCoordN_layer.setZIndex(zIndex);
    map.addLayer(planiResiCoordN_layer);
    zIndex--;


    // Vecteurs de déplacement
    planiVect_layer = new ol.layer.Vector();
    planiVect_layer.setZIndex(zIndex);
    map.addLayer(planiVect_layer);
    zIndex--;

    ////////----------------------------------------- ALTIMETRIC
    //// Points
    // Points fixes
    altiPtsF_layer = new ol.layer.Vector();
    altiPtsF_layer.setZIndex(zIndex);
    map.addLayer(altiPtsF_layer);
    zIndex--;
    // Points nouveaux
    altiPtsN_layer = new ol.layer.Vector();
    altiPtsN_layer.setZIndex(zIndex);
    map.addLayer(altiPtsN_layer);
    zIndex--;

    //// Observations
    // Observation de dénivelée de hauteur
    altiDH_layer = new ol.layer.Vector();
    altiDH_layer.setZIndex(zIndex);
    map.addLayer(altiDH_layer);
    zIndex--;
    // Observation de session GNSS
    altiGNSS_layer = new ol.layer.Vector();
    altiGNSS_layer.setZIndex(zIndex);
    map.addLayer(altiGNSS_layer);
    zIndex--;
    // Observation de coordonnée H
    altiCoordH_layer = new ol.layer.Vector();
    altiCoordH_layer.setZIndex(zIndex);
    map.addLayer(altiCoordH_layer);
    zIndex--;

    //// Indicateurs
    // Ellipses de confiance
    altiEll_layer = new ol.layer.Vector();
    altiEll_layer.setZIndex(zIndex);
    map.addLayer(altiEll_layer);
    zIndex--;
    // Ellipses de confiance relatives
    altiEllRel_layer = new ol.layer.Vector();
    altiEllRel_layer.setZIndex(zIndex);
    map.addLayer(altiEllRel_layer);
    zIndex--;
    // Rectangle de fiabilité
    altiRect_layer = new ol.layer.Vector();
    altiRect_layer.setZIndex(zIndex);
    map.addLayer(altiRect_layer);
    zIndex--;
    // Rectangle de fiabilité relatif
    altiRectRel_layer = new ol.layer.Vector();
    altiRectRel_layer.setZIndex(zIndex);
    map.addLayer(altiRectRel_layer);
    zIndex--;
    
    //// Fiabilité locale (zi)
    // DH
    altiFiabLocDH_layer = new ol.layer.Vector();
    altiFiabLocDH_layer.setZIndex(zIndex);
    map.addLayer(altiFiabLocDH_layer);
    zIndex--;
    // GNSS
    altiFiabLocGNSS_layer = new ol.layer.Vector();
    altiFiabLocGNSS_layer.setZIndex(zIndex);
    map.addLayer(altiFiabLocGNSS_layer);
    zIndex--;
    // Coordonnée H
    altiFiabLocCoordH_layer = new ol.layer.Vector();
    altiFiabLocCoordH_layer.setZIndex(zIndex);
    map.addLayer(altiFiabLocCoordH_layer);
    zIndex--;

    //// Résidus normés (wi)
    // DH
    altiResiDH_layer = new ol.layer.Vector();
    altiResiDH_layer.setZIndex(zIndex);
    map.addLayer(altiResiDH_layer);
    zIndex--;
    // GNSS
    altiResiGNSS_layer = new ol.layer.Vector();
    altiResiGNSS_layer.setZIndex(zIndex);
    map.addLayer(altiResiGNSS_layer);
    zIndex--;
    // Coordonnée H
    altiResiCoordH_layer = new ol.layer.Vector();
    altiResiCoordH_layer.setZIndex(zIndex);
    map.addLayer(altiResiCoordH_layer);
    zIndex--;


    // Vecteur de déplacement
    altiVect_layer = new ol.layer.Vector();
    altiVect_layer.setZIndex(zIndex);
    map.addLayer(altiVect_layer);
    zIndex--;

}