function defineLayersTemp(){

    //------------------------------------------------------------
    // PLANIMETRIE
    //------------------------------------------------------------
    // Points
    tempSourcePts = new ol.source.Vector({});
    tempLayerPts = new ol.layer.Vector();
    tempLayerPts.setSource(tempSourcePts);
    map.addLayer(tempLayerPts);
    
    //------------------------------------------------------------
    // ALTIMETRIE
    //------------------------------------------------------------
    // Points
    tempSourcePts_alti = new ol.source.Vector({});
    tempLayerPts_alti = new ol.layer.Vector();
    tempLayerPts_alti.setSource(tempSourcePts_alti);
    map.addLayer(tempLayerPts_alti);

    // Ellipse
    tempSourceEll_alti = new ol.source.Vector({});
    tempLayerEll_alti = new ol.layer.Vector();
    tempLayerEll_alti.setSource(tempSourceEll_alti);
    map.addLayer(tempLayerEll_alti);

    // Rectangle
    tempSourceRect_alti = new ol.source.Vector({});
    tempLayerRect_alti = new ol.layer.Vector();
    tempLayerRect_alti.setSource(tempSourceRect_alti);
    map.addLayer(tempLayerRect_alti);

    // Vecteur de déplacement
    tempSourceVect_alti = new ol.source.Vector({});
    tempLayerVect_alti = new ol.layer.Vector();
    tempLayerVect_alti.setSource(tempSourceVect_alti);
    map.addLayer(tempLayerVect_alti);

}