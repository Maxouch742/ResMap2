function affichPointsAlti(pts_map, pts_var, pts_obs){
    
    // Create source layer
    const altiPtsN_source = new ol.source.Vector({});
    const altiPtsF_source = new ol.source.Vector({});

    // Create feature
    pts_map.forEach((value, key) => {
        if (pts_obs.includes(key) === true){
            pt_feature = new ol.Feature({
                name: key,
                geometry: new ol.geom.Point([ 
                    value.east, 
                    value.north 
                ]),
                east: value.east,
                north: value.north,
                height: value.height,
                xi: value.xi,
                eta: value.eta
            })
            pt_feature.setId(key);

            // Check if the point is new
            if (pts_var.includes(key) === true){
                pt_feature.setProperties({"statut":"nouveau"});
                altiPtsN_source.addFeature(pt_feature);
            } else {
                pt_feature.setProperties({"statut":"fixe"});
                altiPtsF_source.addFeature(pt_feature);
            }
        }
    });
    
    // Create layer
    if (altiPtsF_source.getFeatures().length >= 1){
        altiPtsF_layer.setSource(altiPtsF_source);
        altiPtsF_layer.setStyle( function(feature) {
            stylePtsF.getText().setText(feature.getId());
            return stylePtsF;
        });
        changeLayerVisibility('alti_ptsF');
    };

    if (altiPtsN_source.getFeatures().length >= 1){
        altiPtsN_layer.setSource(altiPtsN_source);
        altiPtsN_layer.setStyle( function(feature) {
            stylePtsN_alti.getText().setText(feature.getId());
            return stylePtsN_alti;
        });
        changeLayerVisibility('alti_ptsN');
    };
}