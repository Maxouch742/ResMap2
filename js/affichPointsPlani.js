function affichPointsPlani(pts, pts_var, pts_obs){

    // Create source layer
    const planiPtsN_source = new ol.source.Vector({});
    const planiPtsF_source = new ol.source.Vector({});

    // Create feature
    pts.forEach((value, key) => {
        if (pts_obs.includes(key) === true){
            console.log(value.xi);
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
                planiPtsN_source.addFeature(pt_feature);
            } else {
                pt_feature.setProperties({"statut":"fixe"});
                planiPtsF_source.addFeature(pt_feature);
            }
        }
    });

    // Create layer
    if (planiPtsF_source.getFeatures().length >= 1){
        planiPtsF_layer.setSource(planiPtsF_source);
        styleUpdate('planiPtsF');
        changeLayerVisibility('plani_ptsF');
    };

    if (planiPtsN_source.getFeatures().length >= 1){
        planiPtsN_layer.setSource(planiPtsN_source);
        styleUpdate('planiPtsN');
        changeLayerVisibility('plani_ptsN');
    };
}