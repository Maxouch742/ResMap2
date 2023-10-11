function defineLayersTemp(){

    // Points
    tempLayerPts = new ol.layer.Vector();
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