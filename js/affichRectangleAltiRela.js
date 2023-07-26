function affichRectangleAltiRela(pts, xml){

    // Define source layer
    const altiRectRel_source = new ol.source.Vector({});

    // Define style
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
    const altiRect_featureStyleSymbol = new ol.style.Style({
        stroke: new ol.style.Stroke({ 
            color: '#00AD02', 
            width: 1,
            lineDash: [6,1]
        }),
    });

    // Elements du fichier HTML
    const altiAbriss = xml.getElementsByTagName('relativeRectangles');
    for (let i=0; i<altiAbriss.length; i++){

        const altiAbriss_type = altiAbriss[i].getAttribute('type');
        if (altiAbriss_type === 'altimetric'){

            // display checkbox
            htmlAddCheckboxFiabiliteAltiRel();

            const rectangles = altiAbriss[i].getElementsByTagName('rectangle');
            for (let j=0; j <rectangles.length ;j++){
                const rect = rectangles[j];
                const pt1 = rect.getAttribute('point1');
                const pt2 = rect.getAttribute('point2');

                if (pts.has(pt1) === true && pts.has(pt2) === true){
                    const rect_value = parseFloat(rect.getAttribute('na'))/1000.0;
                    
                    // Calculate coordinates
                    const pt_moy_E = (pts.get(pt1)['east'] + pts.get(pt2)['east']) / 2.0;
                    const pt_moy_N = (pts.get(pt1)['north'] + pts.get(pt2)['north']) / 2.0;
                    
                    const rect1 = [ pt_moy_E + 1, pt_moy_N + rect_value*echelleEllipses/2 ];
                    const rect2 = [ pt_moy_E + 1, pt_moy_N - rect_value*echelleEllipses/2 ];
                    const rect3 = [ pt_moy_E - 1, pt_moy_N - rect_value*echelleEllipses/2 ];
                    const rect4 = [ pt_moy_E - 1, pt_moy_N + rect_value*echelleEllipses/2 ];
 

                    // Create feature
                    const altiRectRel_feature = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            rect1, rect2, rect3, rect4, rect1
                        ]),
                        properties: String(parseFloat(rect_value*1000).toFixed(2))+"mm"
                    });
                    altiRectRel_feature.setStyle( function(feature) {
                        altiRect_featureStyle.getText().setText(feature.get("properties"));
                        return altiRect_featureStyle;
                    });
                    altiRectRel_source.addFeature(altiRectRel_feature);

                    const altiRectRel_featureSymbol = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [pts.get(pt1)['east'], pts.get(pt1)['north']],
                            [pts.get(pt2)['east'], pts.get(pt2)['north']]
                        ])
                    });
                    altiRectRel_featureSymbol.setStyle(altiRect_featureStyleSymbol);
                    altiRectRel_source.addFeature(altiRectRel_featureSymbol);
                }
            }
        }
    };

    // Set source
    altiRectRel_layer.setSource(altiRectRel_source);
    changeLayerVisibility('alti_rectRel');
};