function affichPrecisionAlti(pts, xml){

    // Définition des sources
    const altiEll_source = new ol.source.Vector({});

    // Niveau de confiance ellipses
    const progvers = xml.getElementsByTagName("progvers")[0];
    const nameProg = progvers.childNodes[0].textContent;

    let kSigma;
    if (nameProg == '1'){
        kSigma = 2.45;
    } else {
        kSigma = 1.0;
    };
    
    // Liste map
    pts.forEach((value, key) => {
            
        if (value.EMH != undefined){

            const east = value.east;
            const north = value.north;
            const emh = value.EMH/1000.0;

            
            const altiEll_feature = new ol.Feature({
                geometry: new ol.geom.LineString([
                    [ east, north + emh*kSigma*echelleEllipses/2 ],
                    [ east, north - emh*kSigma*echelleEllipses/2 ]
                ]),
                properties: String(emh*1000)+"mm"
            });
            altiEll_source.addFeature(altiEll_feature);
        }
    });

    // Define style
    const altiEll_featureStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF6BF1',
            width: 6
        }),
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "italic 13px Calibri",
            fill: new ol.style.Fill({
                color: "#FF6BF1"
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

    // Add to the map
    altiEll_layer.setSource( altiEll_source );
    altiEll_layer.setStyle( function(feature) {
        altiEll_featureStyle.getText().setText(feature.get("properties"));
        return altiEll_featureStyle;
    });
    changeLayerVisibility('alti_ell');
}