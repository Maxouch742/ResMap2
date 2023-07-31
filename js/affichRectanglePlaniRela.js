function affichRectanglePlaniRela(pts, xml, constante){
    
    // Create source layer
    const planiRectRela_source = new ol.source.Vector({});

    // Create style
    const styleRectangle = new ol.style.Style({
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
            color: "#ffffff", width: 3
            }),
            offsetX: -10,
            offsetY: 10,
            rotation: 0,
            placement: "point"
        })
    });
    const styleRectangleSymbol = new ol.style.Style({
        stroke: new ol.style.Stroke({ 
            color: '#00AD02', 
            width: 1,
            lineDash: [6,1]
        }),
    });

    const planiAbriss = xml.getElementsByTagName('relativeRectangles');
    for (let i=0; i<planiAbriss.length; i++){

        const planiAbriss_type = planiAbriss[i].getAttribute('type');
        if (planiAbriss_type === 'planimetric'){

            // display checkbox
            if (constante === 0){
                htmlAddCheckboxFiabilitePlaniRela();
            };

            const rectangles = planiAbriss[i].getElementsByTagName('rectangle');
            for (let j=0; j<rectangles.length ;j++){
                const rect = rectangles[j];
                const pt1 = rect.getAttribute('point1');
                const pt2 = rect.getAttribute('point2');

                if (pts.has(pt1) === true && pts.has(pt2) === true){
                    const rectNA = parseFloat(rect.getAttribute('na'))/1000.0;
                    const rectNB = parseFloat(rect.getAttribute('nb'))/1000.0;
                    let rectGisNA = parseFloat(rect.getAttribute('azimuthA'));
                    
                    if (rectGisNA < 0.0){ rectGisNA = rectGisNA + 400.0 };
                    rectGisNA = rectGisNA + 100.0;
                    if (rectGisNA >= 400.0){ rectGisNA = rectGisNA - 400.0 };
                    let rota = rectGisNA*Math.PI/200.0;
            
                    // Calculate coordinates
                    const pt_moy_E = (pts.get(pt1)['east'] + pts.get(pt2)['east']) / 2.0;
                    const pt_moy_N = (pts.get(pt1)['north'] + pts.get(pt2)['north']) / 2.0;
 
                    // Line feature
                    const rect1 = [ pt_moy_E + rectNA*echelleEllipses, pt_moy_N + rectNB*echelleEllipses ];
                    const rect2 = [ pt_moy_E + rectNA*echelleEllipses, pt_moy_N - rectNB*echelleEllipses ];
                    const rect3 = [ pt_moy_E - rectNA*echelleEllipses, pt_moy_N - rectNB*echelleEllipses ];
                    const rect4 = [ pt_moy_E - rectNA*echelleEllipses, pt_moy_N + rectNB*echelleEllipses ];

                    // Create feature
                    const planiRect_feature = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            rect1, rect2, rect3, rect4, rect1
                        ]),
                        properties: String(rectNA*1000.0)+'mm'
                    });
                    planiRect_feature.getGeometry().rotate(-rota, [pt_moy_E, pt_moy_N]);
                    planiRect_feature.setStyle( function(feature) {
                        styleRectangle.getText().setText(feature.get("properties"));
                        return styleRectangle;
                    });
                    planiRectRela_source.addFeature(planiRect_feature);

                    const planiRect_featureSymbol = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [
                                pts.get(pt1)['east'], 
                                pts.get(pt1)['north']
                            ],
                            [
                                pts.get(pt2)['east'],
                                pts.get(pt2)['north']
                            ],
                        ])
                    });
                    planiRect_featureSymbol.setStyle(styleRectangleSymbol);
                    planiRectRela_source.addFeature(planiRect_featureSymbol);
                }
            }
        }
    }
  
    // Add to map
    planiRectRel_layer.setSource( planiRectRela_source );
    changeLayerVisibility('plani_rectRel');
}