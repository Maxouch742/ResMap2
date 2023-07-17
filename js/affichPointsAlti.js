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
                property: {
                    height: value.height
                }
            })
            pt_feature.setId(key);

            // Check if the point is new
            if (pts_var.includes(key) === true){
                altiPtsN_source.addFeature(pt_feature);
            } else {
                altiPtsF_source.addFeature(pt_feature);
            }
        }
    });

    // Create style
    const stylePtsF = new ol.style.Style({
        image: new ol.style.Icon({
            src: './img/triangle-filled-inversed-svgrepo-com.png',
            scale: '0.07',
            color: '#0C80ED',
        }),
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "bold 14px Calibri",
            fill: new ol.style.Fill({
                color: '#0C80ED',
            }),
            stroke: new ol.style.Stroke({
              color: "#ffffff", width: 3
            }),
            offsetX: 15.0,
            offsetY: -10.0,
            rotation: 0
        })
    });
    const stylePtsN = new ol.style.Style({
        image: new ol.style.Icon({
            src: './img/circle-filled-svgrepo-com.png',
            scale: '0.07',
            color: '#FF2121',
        }),
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "bold 14px Calibri",
            fill: new ol.style.Fill({
              color: "red"
            }),
            stroke: new ol.style.Stroke({
              color: "#ffffff", width: 3
            }),
            offsetX: 15.0,
            offsetY: -10.0,
            rotation: 0
        })
    });

    // Create layer
    altiPtsF_layer.setSource(altiPtsF_source);
    altiPtsF_layer.setStyle( function(feature) {
        stylePtsF.getText().setText(feature.getId());
        return stylePtsF;
    });
    changeLayerVisibility('alti_ptsF');

    altiPtsN_layer.setSource(altiPtsN_source);
    altiPtsN_layer.setStyle( function(feature) {
        stylePtsN.getText().setText(feature.getId());
        return stylePtsN;
    });
    changeLayerVisibility('alti_ptsN');
}