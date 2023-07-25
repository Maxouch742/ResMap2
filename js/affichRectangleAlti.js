function affichRectangleAlti(pts, xml) {
    
    // Layer source
    const altiRect_source = new ol.source.Vector({});

    // Liste map
    pts.forEach((value, key) => {

        if (value.NH != undefined){
    
            // Variable
            const east = value.east;
            const north = value.north;
            const nh = value.NH/1000.0;
            
            // Line feature
            const rect1 = [ east + 1, north + nh*echelleEllipses/2 ];
            const rect2 = [ east + 1, north - nh*echelleEllipses/2 ];
            const rect3 = [ east - 1, north - nh*echelleEllipses/2 ];
            const rect4 = [ east - 1, north + nh*echelleEllipses/2 ];

            // Create feature
            const altiRect_feature = new ol.Feature({
                geometry: new ol.geom.LineString([
                    rect1, rect2, rect3, rect4, rect1
                ]),
                properties: String(nh*1000.0)+'mm'
            });
            altiRect_source.addFeature(altiRect_feature);
        }
    });

    // Create style
    const altiRect_featureStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({ 
            color: '#00AD02', 
            width: 1 
        }),
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "italic 13px Calibri",
            fill: new ol.style.Fill({
                color: "#00AD02"
            }),
            stroke: new ol.style.Stroke({
                color: "#ffffff",
                width: 3
            }),
            offsetX: -10,
            offsetY: 10,
            rotation: 0,
            placement: "point"
        })
    });
  
    // Add to map
    altiRect_layer.setSource( altiRect_source );
    altiRect_layer.setStyle( function(feature){
        altiRect_featureStyle.getText().setText(feature.get("properties")); 
        return altiRect_featureStyle;
    });
    changeLayerVisibility('alti_rect');
}
