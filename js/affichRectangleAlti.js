function affichRectangleAlti(pts, xml, visee=false) {
    
    // Layer source
    const altiRect_source = new ol.source.Vector({});

    // Liste map
    pts.forEach((value, key) => {

        if (value.NH != undefined){

            if (visee === false || (visee !== false && visee === key)){
    
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
                    name: key,
                    geometry: new ol.geom.LineString([
                        rect1, rect2, rect3, rect4, rect1
                    ]),
                    properties: String(nh*1000.0)+'mm'
                });
                altiRect_source.addFeature(altiRect_feature);
            }
        }
    });
  
    // Add to map
    altiRect_layer.setSource( altiRect_source );
    styleUpdate("altiRect");
    changeLayerVisibility('alti_rect');
}
