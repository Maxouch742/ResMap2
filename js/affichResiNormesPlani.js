function affichResiNormesPlani(xml, pts){

    // Récupération des balises avec la limite du wi par l'utilisateur lors du calcul LTOP
    let biggestWi = xmlDoc.getElementsByTagName("biggestWi");
    let limitWi = parseFloat(biggestWi[0].getAttribute("biggerThan")); // PLANI uniquement = [0] , ALTI = [1]   // TODO: vérifier s'il y a 0 sans ajustement planimétrique
    let limitInf = limitWi - 0.2; // pour paliers

    
    // Create source
    const planiResiNorme_source = new ol.source.Vector({});
    
    
    // Elements du fichier HTML
    const planiAbriss = xml.getElementsByTagName('planimetricAbriss')[0];
    const stations = planiAbriss.getElementsByTagName('station');

    // Parcours de la liste des observations
    for (let i=0; i<stations.length; i++){
        const station = stations[i];
        const sta_type = station.getAttribute('obsType');

        switch(sta_type){
            case 'direction':
                // Station
                const sta_name = station.getAttribute('name');
                
                // Lister les observations
                const list_obsDir = station.getElementsByTagName('obs');
                for (let j=0; j<list_obsDir.length; j++){
                    const pt_name = list_obsDir[j].getAttribute('target');
                    const pt_obsNr = list_obsDir[j].getAttribute('obsNr');
                    const pt_wi = Math.abs(parseFloat(list_obsDir[j].getAttribute('wi')));
                    const [colorResi, widthResi, zIndex] = getParameterFeature(pt_wi, limitWi, limitInf);
                    
                    // Feature line
                    const planiDir_feature = new ol.Feature({
                        geometry: new ol.geom.LineString([ 
                            [ pts.get(sta_name)['east'], pts.get(sta_name)['north'] ], 
                            [ pts.get(pt_name)['east'], pts.get(pt_name)['north'] ] 
                        ]),
                    });

                    // Feature symbole
                    const east_symbol = pts.get(sta_name)['east'] + (pts.get(pt_name)['east'] - pts.get(sta_name)['east'])*0.1;
                    const north_symbol = pts.get(sta_name)['north'] + (pts.get(pt_name)['north'] - pts.get(sta_name)['north'])*0.1;
                    const gis = gisement(pts.get(sta_name)['east']-east_symbol, pts.get(sta_name)['north']-north_symbol);              

                    const planiDir_featureSymbol = new ol.Feature({
                        geometry: new ol.geom.Point([ 
                            east_symbol, 
                            north_symbol 
                        ])
                    });
                    
                    // Style
                    if (pt_obsNr != ''){
                        planiDir_feature.setStyle( new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: colorResi,
                                width: widthResi
                            }),
                            zIndex: zIndex
                        }));
                        planiDir_featureSymbol.setStyle( new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-svgrepo-com.png',
                                scale:'0.05',
                                color: colorResi,
                                rotation: gis
                            }),
                            zIndex: zIndex
                        }))
                    } else {
                        planiDir_feature.setStyle( new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color:'#717171',
                                width: 1
                            })
                        }));
                        planiDir_featureSymbol.setStyle( new ol.style.Style({
                            image: new ol.style.Icon({
                                src: './img/triangle-svgrepo-com.png',
                                scale:'0.05',
                                color:'#717171',
                                rotation: gis
                            })
                        }))
                    };
                    planiResiNorme_source.addFeature(planiDir_feature);
                    planiResiNorme_source.addFeature(planiDir_featureSymbol);
                };
                break;
        }
    };

    // Layer
    planiResi_layer.setSource( planiResiNorme_source );
    changeLayerVisibility('plani_resi');
};

function getParameterFeature_wi(wi, limitWi, limitInf){
    let colorWi;
    let widthWi;
    let zIndex;
    if (wi >= limitWi) {
        colorWi = "#FF1700";
        widthWi = 3;
        zIndex = 99;
    } else if (wi > limitInf) {
        colorWi = "#FFD000";
        widthWi = 2;
        zIndex = 98;
    } else if (wi < limitInf) {
        colorWi = "#2AE100";
        widthWi = 0;
        zIndex = 1;
    };
    return [colorWi,widthWi,zIndex];
}