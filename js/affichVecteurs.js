function affichVecteurs(pts, visee=false){

    // Create source
    const planiVect_source = new ol.source.Vector({});

    // Liste map
    pts.forEach((value, key) => {
        if (value.dE != undefined){

            if (visee === false || (visee !== false && visee === key)){
            
                // Variable
                const east = value.east;
                const north = value.north;
                const dy = value.dE/1000.0;
                const dx = value.dN/1000.0;
                const gisVect = gisement2(dy, dx);
                const norm = Math.sqrt(dy*dy+dx*dx);
                const distance = norm*1000.0;

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
                const planiVect_feature = new ol.Feature({
                    name: key,
                    geometry: new ol.geom.LineString([ start, end, left, end, right ]),
                    properties: String(distance.toFixed(2)+"mm")
                });
                planiVect_source.addFeature(planiVect_feature);
            }
        }
    });

    // Ajout à la map
    planiVect_layer.setSource( planiVect_source );
    styleUpdate('planiVect');
    changeLayerVisibility('plani_vect');            
}