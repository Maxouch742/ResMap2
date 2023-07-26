function affichPrecisionAltiRela(pts, xml){

    // Define source layer
    const altiEllRel_source = new ol.source.Vector({});

    // Niveau de confiance ellipses
    const progvers = xml.getElementsByTagName("progvers")[0];
    const nameProg = progvers.childNodes[0].textContent;

    let kSigma;
    if (nameProg == '1'){
        kSigma = 2.45;
    } else {
        kSigma = 1.0;
    };

    // Define style
    const altiEll_style = new ol.style.Style({
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
    const altiEll_styleSymbole = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#800374',
            width: 1,
            lineDash: [6,1]
        }),
    });

    // Elements du fichier HTML
    const altiAbriss = xml.getElementsByTagName('relativeEllipses');
    for (let i=0; i<altiAbriss.length; i++){

        const altiAbriss_type = altiAbriss[i].getAttribute('type');
        if (altiAbriss_type === 'altimetric'){

            // Add checkbox to html page
            htmlAddCheckboxPrecisionAltiRela();

            const ellipses = altiAbriss[i].getElementsByTagName('ellipse');
            for (let j=0; j <ellipses.length ;j++){
                const ellip = ellipses[j];
                const pt1 = ellip.getAttribute('point1');
                const pt2 = ellip.getAttribute('point2');

                if (pts.has(pt1) === true && pts.has(pt2) === true){
                    const ellip_value = parseFloat(ellip.getAttribute('meanErrorA'))/1000.0;
                    console.log(ellip_value, ellip_value*1000.0);
                    
                    // Calculate coordinates
                    const pt_moy_E = (pts.get(pt1)['east'] + pts.get(pt2)['east']) / 2.0;
                    const pt_moy_N = (pts.get(pt1)['north'] + pts.get(pt2)['north']) / 2.0;
                     
                    // Create feature
                    const altiEllRel_feature = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [ pt_moy_E, pt_moy_N - ellip_value*kSigma*echelleEllipses/2.0  ],
                            [ pt_moy_E, pt_moy_N + ellip_value*kSigma*echelleEllipses/2.0  ]
                        ]),
                        properties: String(parseFloat(ellip_value*1000).toFixed(2))+"mm"
                    });
                    console.log(altiEllRel_feature.get("properties"));
                    altiEll_style.getText().setText(altiEllRel_feature.get("properties"));
                    altiEllRel_feature.setStyle( function(feature) {
                        altiEll_style.getText().setText(feature.get("properties"));
                        return altiEll_style;
                    });
                    altiEllRel_source.addFeature(altiEllRel_feature);

                    const altiEllRel_featureSymbol = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [pts.get(pt1)['east'], pts.get(pt1)['north']],
                            [pts.get(pt2)['east'], pts.get(pt2)['north']]
                        ])
                    });
                    altiEllRel_featureSymbol.setStyle(altiEll_styleSymbole);
                    altiEllRel_source.addFeature(altiEllRel_featureSymbol);
                }
            }
        }
    };

    // Set source
    altiEllRel_layer.setSource(altiEllRel_source);
    changeLayerVisibility('alti_ellRel');
}