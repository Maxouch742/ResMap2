function defineLayers(){

    //////// PLANIMETRIC
    //// Points 
    // Points fixes
    planiPtsF_layer = new ol.layer.Vector();
    planiPtsF_layer.setZIndex(99);
    map.addLayer(planiPtsF_layer);
    // Points nouveaux
    planiPtsN_layer = new ol.layer.Vector();
    planiPtsN_layer.setZIndex(98);
    map.addLayer(planiPtsN_layer);
    
    //// Observations
    // Observations de direction ('RI')
    planiDir_layer = new ol.layer.Vector();
    planiDir_layer.setZIndex(97);
    map.addLayer(planiDir_layer);
    // Observations de distance ('DP')
    planiDis_layer = new ol.layer.Vector();
    planiDis_layer.setZIndex(96);
    map.addLayer(planiDis_layer);
    // Observations de sessions GNSS
    planiGNSS_layer = new ol.layer.Vector();
    planiGNSS_layer.setZIndex(95);
    map.addLayer(planiGNSS_layer);
    // Observations de coordonnée Est (calcul LI-AJ)
    planiCoordE_layer = new ol.layer.Vector();
    planiCoordE_layer.setZIndex(94);
    map.addLayer(planiCoordE_layer);
    // Observations de coordonnée Nord (calcul LI-AJ)
    planiCoordN_layer = new ol.layer.Vector();
    planiCoordN_layer.setZIndex(94);
    map.addLayer(planiCoordN_layer);
    
    //// Indicateurs
    // Ellipses de confiance
    planiEll_layer = new ol.layer.Vector();
    planiEll_layer.setZIndex(93);
    map.addLayer(planiEll_layer);
    // Ellipses de confiance relative
    planiEllRel_layer = new ol.layer.Vector();
    planiEllRel_layer.setZIndex(92);
    map.addLayer(planiEllRel_layer);
    // Rectangle de fiabilité
    planiRect_layer = new ol.layer.Vector();
    planiRect_layer.setZIndex(91);
    map.addLayer(planiRect_layer);
    // Rectangle de fiabilité relatif
    planiRectRel_layer = new ol.layer.Vector();
    planiRectRel_layer.setZIndex(90);
    map.addLayer(planiRectRel_layer);
    
    //// Fiabilité locale (zi)
    // Directions
    planiFiabLocDir_layer = new ol.layer.Vector();
    planiFiabLocDir_layer.setZIndex(89);
    map.addLayer(planiFiabLocDir_layer);
    // Distances
    planiFiabLocDis_layer = new ol.layer.Vector();
    planiFiabLocDis_layer.setZIndex(88);
    map.addLayer(planiFiabLocDis_layer);
    // GNSS
    planiFiabLocGNSS_layer = new ol.layer.Vector();
    planiFiabLocGNSS_layer.setZIndex(87);
    map.addLayer(planiFiabLocGNSS_layer);

    //// Résidus normés (wi)
    // Directions
    planiResiDir_layer = new ol.layer.Vector();
    planiResiDir_layer.setZIndex(86);
    map.addLayer(planiResiDir_layer);
    // Distances
    planiResiDis_layer = new ol.layer.Vector();
    planiResiDis_layer.setZIndex(85);
    map.addLayer(planiResiDis_layer);
    // GNSS
    planiResiGNSS_layer = new ol.layer.Vector();
    planiResiGNSS_layer.setZIndex(84);
    map.addLayer(planiResiGNSS_layer);

    // Vecteurs de déplacement
    planiVect_layer = new ol.layer.Vector();
    planiVect_layer.setZIndex(83);
    map.addLayer(planiVect_layer);

    //////// ALTIMETRIC
    //// Points
    // Points fixes
    altiPtsF_layer = new ol.layer.Vector();
    altiPtsF_layer.setZIndex(69);
    map.addLayer(altiPtsF_layer);
    // Points nouveaux
    altiPtsN_layer = new ol.layer.Vector();
    altiPtsN_layer.setZIndex(68);
    map.addLayer(altiPtsN_layer);

    //// Observations
    // Observation de dénivelée de hauteur
    altiDH_layer = new ol.layer.Vector();
    altiDH_layer.setZIndex(67);
    map.addLayer(altiDH_layer);
    // Observation de session GNSS
    altiGNSS_layer = new ol.layer.Vector();
    altiGNSS_layer.setZIndex(66);
    map.addLayer(altiGNSS_layer);
    // Observation de coordonnée H
    altiCoordH_layer = new ol.layer.Vector();
    altiCoordH_layer.setZIndex(65);
    map.addLayer(altiCoordH_layer);

    //// Indicateurs
    // Ellipses de confiance
    altiEll_layer = new ol.layer.Vector();
    altiEll_layer.setZIndex(64);
    map.addLayer(altiEll_layer);
    // Ellipses de confiance relatives
    altiEllRel_layer = new ol.layer.Vector();
    altiEllRel_layer.setZIndex(63);
    map.addLayer(altiEllRel_layer);
    // Rectangle de fiabilité
    altiRect_layer = new ol.layer.Vector();
    altiRect_layer.setZIndex(62);
    map.addLayer(altiRect_layer);
    // Rectangle de fiabilité relatif
    altiRectRel_layer = new ol.layer.Vector();
    altiRectRel_layer.setZIndex(61);
    map.addLayer(altiRectRel_layer);
    
    //// Fiabilité locale (zi)
    // DH
    altiFiabLocDH_layer = new ol.layer.Vector();
    altiFiabLocDH_layer.setZIndex(59);
    map.addLayer(altiFiabLocDH_layer);
    // GNSS
    altiFiabLocGNSS_layer = new ol.layer.Vector();
    altiFiabLocGNSS_layer.setZIndex(60);
    map.addLayer(altiFiabLocGNSS_layer);
    // Coordonnée H
    altiFiabLocCoordH_layer = new ol.layer.Vector();
    altiFiabLocCoordH_layer.setZIndex(60);
    map.addLayer(altiFiabLocCoordH_layer);

    //// Résidus normés (wi)
    // DH
    altiResiDH_layer = new ol.layer.Vector();
    altiResiDH_layer.setZIndex(59);
    map.addLayer(altiResiDH_layer);
    // GNSS
    altiResiGNSS_layer = new ol.layer.Vector();
    altiResiGNSS_layer.setZIndex(59);
    map.addLayer(altiResiGNSS_layer);
    // Coordonnée H
    altiResiCoordH_layer = new ol.layer.Vector();
    altiResiCoordH_layer.setZIndex(59);
    map.addLayer(altiResiCoordH_layer);


    // Vecteur de déplacement
    altiVect_layer = new ol.layer.Vector();
    altiVect_layer.setZIndex(58);
    map.addLayer(altiVect_layer);

}