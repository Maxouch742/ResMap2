function affichPoints(xml, type){

    parseXML_points(xml);
    const points_varPlani = parseXML_variablePoints(xml, type);
    const points_obs = parseXML_planiObsPoints(xml);

    // Create source layer
    const planiPtsN_source = new ol.source.Vector({});
    const planiPtsF_source = new ol.source.Vector({});

    // Create feature
    points.forEach((value, key) => {

        if (points_obs.includes(key) === true){

            pt_feature = new ol.Feature({
                name: key,
                geometry: new ol.geom.Point([ value.east, value.north ]),
                property: {
                    height: value.height
                }
            })
            pt_feature.setId(key);

            // Check if the point is new
            if (points_varPlani.includes(key) === true){
                planiPtsN_source.addFeature(pt_feature);
            } else {
                planiPtsF_source.addFeature(pt_feature);
            }
        }
    });

    // Create style
    const stylePtsF = new ol.style.Style({
        image: new ol.style.Icon({
            src: './img/triangle-filled-blue-svgrepo-com.png',
            scale: '0.07'
        }),
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "bold 14px Calibri",
            fill: new ol.style.Fill({
              color: "blue"
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
            src: './img/triangle-filled-red-svgrepo-com.png',
            scale: '0.07'
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
    planiPtsF_layer = new ol.source.Vector({
        source: planiPtsF_source
    });
    planiPtsF_layer.setStyle( function(feature) {
        stylePtsF.getText().setText(feature.getId());
        return stylePtsF;
    });
    planiPtsF_layer.setZIndex(98);
    map.addLayer(planiPtsF_layer);

    planiPtsN_layer = new ol.source.Vector({
        source: planiPtsN_source
    });
    planiPtsN_layer.setStyle( function(feature) {
        stylePtsN.getText().setText(feature.getId());
        return stylePtsN;
    });
    planiPtsN_layer.setZIndex(97);
    map.addLayer(planiPtsN_layer);
};