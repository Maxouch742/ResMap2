function defineLayersTemp(){

    // Points
    tempSourcePts = new ol.source.Vector({});
    tempLayerPts = new ol.layer.Vector();
    tempLayerPts.setSource(tempSourcePts);
    map.addLayer(tempLayerPts);

    // Ellipse
    tempSourceEll = new ol.source.Vector({});
    tempLayerEll = new ol.layer.Vector();
    tempLayerEll.setSource(tempSourceEll);
    map.addLayer(tempLayerEll);

    // Rectangle
    tempSourceRect = new ol.source.Vector({});
    tempLayerRect = new ol.layer.Vector();
    tempLayerRect.setSource(tempSourceRect);
    map.addLayer(tempLayerRect);

    // Vecteur de déplacement
    tempSourceVect = new ol.source.Vector({});
    tempLayerVect = new ol.layer.Vector();
    tempLayerVect.setSource(tempSourceVect);
    map.addLayer(tempLayerVect);
}