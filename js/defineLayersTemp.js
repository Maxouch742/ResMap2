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
}