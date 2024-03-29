function defineLayersTemp(){

    //------------------------------------------------------------
    // FILTER POINTS
    //------------------------------------------------------------
    // PLANIMETRIE
    tempSourcePts = new ol.source.Vector({});
    tempLayerPts = new ol.layer.Vector();
    tempLayerPts.setSource(tempSourcePts);
    map.addLayer(tempLayerPts);
    
    // ALTIMETRIE
    tempSourcePts_alti = new ol.source.Vector({});
    tempLayerPts_alti = new ol.layer.Vector();
    tempLayerPts_alti.setSource(tempSourcePts_alti);
    map.addLayer(tempLayerPts_alti);

    //------------------------------------------------------------
    // FILTER STATIONS
    //------------------------------------------------------------
    // planimetrie
    tempSourcePts_sta = new ol.source.Vector({});
    tempLayerPts_sta = new ol.layer.Vector({
        zIndex: 0,
    });
    tempLayerPts_sta.setSource(tempSourcePts_sta);
    map.addLayer(tempLayerPts_sta);

    // altimetrie
    tempSourcePts_sta_alti = new ol.source.Vector({});
    tempLayerPts_sta_alti = new ol.layer.Vector({
        zIndex: 99,
    });
    tempLayerPts_sta_alti.setSource(tempSourcePts_sta_alti);
    map.addLayer(tempLayerPts_sta_alti);

}