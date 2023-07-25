function affichVecteursAlti(pts){
    // Create source
    const altiVect_source = new ol.source.Vector({});

    // Liste map
    pts.forEach((value, key) => {
        if (value.dH != undefined){
            
            // Variable
            const east = value.east;
            const north = value.north;
            const dh = value.dH/1000.0;
            const norm = Math.sqrt(dh*dh);
            const distance = norm*1000.0;

            let gisVect;
            if (dh < 0){
                gisVect = 200.0;
            } else {
                gisVect = 0.0;
            };

            const gisArrow1 = gisVect + 250.0;
            const gisArrow2 = gisVect + 150.0;
            
            // Définition de la flèche
            const start = [ 
                east, 
                north
            ];
            const end = [ 
                east + echelleEllipses * norm * Math.sin( gisVect*Math.PI/200.0 ), 
                north + echelleEllipses * norm * Math.cos( gisVect*Math.PI/200.0 )
            ];
            const left = [ 
                end[0] + (norm/5) * echelleEllipses * Math.sin( gisArrow1*Math.PI/200.0 ), 
                end[1] + (norm/5) * echelleEllipses * Math.cos( gisArrow1*Math.PI/200.0 )
            ];
            const right = [ 
                end[0] + (norm/5) * echelleEllipses * Math.sin( gisArrow2*Math.PI/200.0 ), 
                end[1] + (norm/5) * echelleEllipses * Math.cos( gisArrow2*Math.PI/200.0 )
            ];

            // Feature
            const altiVect_feature = new ol.Feature({
                geometry: new ol.geom.LineString([ start, end, left, end, right ]),
                properties: String(distance.toFixed(2)+"mm")
            });
            altiVect_source.addFeature(altiVect_feature);
        }
    });

    // Création du style vecteurs
    let styleVect = new ol.style.Style({
        stroke: new ol.style.Stroke({ 
            color: '#FF0000', 
            width: 1 
        }),
        text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "13px Calibri",
            fill: new ol.style.Fill({
            color: "#FF0000"
            }),
            stroke: new ol.style.Stroke({
            color: "#ffffff", width: 3
            }),
            offsetX: 10,
            offsetY: -10,
            rotation: 0,
            placement: "point"
        })
    });

    // Ajout à la map
    altiVect_layer.setSource( altiVect_source );
    altiVect_layer.setStyle( function(feature){
        styleVect.getText().setText(feature.get("properties"));
        return styleVect;
    });
    changeLayerVisibility('alti_vect');            
}