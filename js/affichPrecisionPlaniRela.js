function affichPrecisionPlaniRela(pts, xml){

    // Define source layer
    const planiEllRel_source = new ol.source.Vector({});

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
    const planiEll_style = new ol.style.Style({
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
    const planiEll_styleSymbole = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#800374',
            width: 1,
            lineDash: [6,1]
        }),
    });

    let t = range(0, 390, 10);

    // Elements du fichier HTML
    const planiAbriss = xml.getElementsByTagName('relativeEllipses');
    for (let i=0; i<planiAbriss.length; i++){

        const planiAbriss_type = planiAbriss[i].getAttribute('type');
        if (planiAbriss_type === 'planimetric'){

            // Add checkbox to html page
            htmlAddCheckboxPrecisionPlaniRela();

            const ellipses = planiAbriss[i].getElementsByTagName('ellipse');
            for (let j=0; j <ellipses.length ;j++){
                const ellip = ellipses[j];
                const pt1 = ellip.getAttribute('point1');
                const pt2 = ellip.getAttribute('point2');

                if (pts.has(pt1) === true && pts.has(pt2) === true){
                    const ellip_ema = parseFloat(ellip.getAttribute('meanErrorA'))/1000.0;
                    const ellip_emb = parseFloat(ellip.getAttribute('meanErrorB'))/1000.0;
                    let ellip_gisEma = parseFloat(ellip.getAttribute('azimuthA'));
                    
                    // Calculate coordinates
                    const pt_moy_E = (pts.get(pt1)['east'] + pts.get(pt2)['east']) / 2.0;
                    const pt_moy_N = (pts.get(pt1)['north'] + pts.get(pt2)['north']) / 2.0;
                     
                    if (ellip_gisEma < 0.0){ ellip_gisEma = ellip_gisEma + 400.0 };
                    ellip_gisEma = ellip_gisEma + 100.0;
                    if (ellip_gisEma >= 400.0){ ellip_gisEma = ellip_gisEma - 400.0 };
                    let rota = ellip_gisEma*Math.PI/200.0;
                    
                    // Définition de l'ellipse
                    let listENellipse = [];
                    t.forEach(gis => listENellipse.push([
                        ellip_ema*kSigma*echelleEllipses*Math.cos(gis*Math.PI/180.0)+pt_moy_E,
                        ellip_emb*kSigma*echelleEllipses*Math.sin(gis*Math.PI/180.0)+pt_moy_N
                    ]));

                    // Création du feature
                    const planiEllRel_feature = new ol.Feature({
                        geometry: new ol.geom.LineString(listENellipse),
                        properties: String(ellip_ema*1000.0)+"mm",
                    });
                    planiEllRel_feature.getGeometry().rotate(-rota, [pt_moy_E, pt_moy_N]);
                    planiEllRel_feature.setStyle( function(feature) {
                        planiEll_style.getText().setText(feature.get("properties"));
                        return planiEll_style;
                    });
                    planiEllRel_source.addFeature(planiEllRel_feature);

                    const planiEllRel_featureSymbol = new ol.Feature({
                        geometry: new ol.geom.LineString([
                            [pts.get(pt1)['east'], pts.get(pt1)['north']],
                            [pts.get(pt2)['east'], pts.get(pt2)['north']]
                        ])
                    });
                    planiEllRel_featureSymbol.setStyle(planiEll_styleSymbole);
                    planiEllRel_source.addFeature(planiEllRel_featureSymbol);
                }
            }
        }
    };

    // Set source
    planiEllRel_layer.setSource(planiEllRel_source);
    changeLayerVisibility('plani_ellRel');

};