function affichRectanglePlani(pts){
    
    // Create source layer
    const planiRect_source = new ol.source.Vector({});

    // Liste map
    pts.forEach((value, key) => {

        if (value.NA != undefined){
    
            // Variable
            const east = value.east;
            const north = value.north;
            const na = value.NA/1000.0;
            const nb = value.NB/1000.0;
            let gis_na = value.Gis_NA;

            if (gis_na < 0.0){ gis_na = gis_na + 400.0 };
            gis_na = gis_na + 100.0;
            if (gis_na >= 400.0){ gis_na = gis_na - 400.0 };
            let rota = gis_na*Math.PI/200.0;
            

            // Line feature
            const rect1 = [ east + na*echelleEllipses, north + nb*echelleEllipses ];
            const rect2 = [ east + na*echelleEllipses, north - nb*echelleEllipses ];
            const rect3 = [ east - na*echelleEllipses, north - nb*echelleEllipses ];
            const rect4 = [ east - na*echelleEllipses, north + nb*echelleEllipses ];

            // Create feature
            const planiRect_feature = new ol.Feature({
                name: key,
                geometry: new ol.geom.LineString([
                    rect1, rect2, rect3, rect4, rect1
                ]),
                properties: String(na*1000.0)+'mm'
            });
            planiRect_feature.getGeometry().rotate(-rota, [east, north]);
            planiRect_source.addFeature(planiRect_feature);
        }
    });
  
    // Add to map
    planiRect_layer.setSource( planiRect_source );
    styleUpdate('planiRect');
    changeLayerVisibility('plani_rect');
}