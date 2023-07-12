function defineLayers(){

    //////// PLANIMETRIC
    //// Points
    planiPtsF_layer = new ol.layer.Vector();
    planiPtsN_layer = new ol.layer.Vector();
    //// Observations
    planiGNSS_layer = new ol.layer.Vector();
    planiDir_layer = new ol.layer.Vector();
    planiDis_layer = new ol.layer.Vector();
    //// Indicateurs
    planiEll_layer = new ol.layer.Vector();
    planiEll_layer.setZIndex(85);
    map.addLayer(planiEll_layer);

    planiRect_layer = new ol.layer.Vector();
    planiRect_layer.setZIndex(86);
    map.addLayer(planiRect_layer);

    planiVect_layer = new ol.layer.Vector();
    planiVect_layer.setZIndex(80);
    map.addLayer(planiVect_layer);

    //////// ALTIMETRIC
    //// Points
    altiPtsF_layer = new ol.layer.Vector();
    altiPtsN_layer = new ol.layer.Vector();
    //// Observations
    altiDH_layer = new ol.layer.Vector();
    altiGNSS_layer = new ol.layer.Vector();

}