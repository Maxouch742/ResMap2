function defineLayersTemp(){

    // Points
    tempSourcePts = new ol.source.Vector({});
    tempLayerPts = new ol.layer.Vector();
    tempLayerPts.setSource(tempSourcePts);
    map.addLayer(tempLayerPts);

    // Ellipse
    tempLayerEll = new ol.layer.Vector();
    map.addLayer(tempLayerEll);

    // Rectangle
    tempLayerRect = new ol.layer.Vector();
    map.addLayer(tempLayerRect);

    // Vecteur de déplacement
    tempLayerVect = new ol.layer.Vector();
    map.addLayer(tempLayerVect);
}