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
            const emh_number = value.EMH/1000.0;
            const emh_string = String(value.EMH.toFixed(2));
            
            const altiEll_feature = new ol.Feature({
                name: key,
                geometry: new ol.geom.LineString([
                    [ east, north + emh_number*kSigma*echelleEllipses/2 ],
                    [ east, north - emh_number*kSigma*echelleEllipses/2 ]
                ]),
                properties: emh_string+"mm"
            });
            altiEll_source.addFeature(altiEll_feature);
        }
    });

    // Add to the map
    altiEll_layer.setSource( altiEll_source );
    styleUpdate('altiEll', false);
    changeLayerVisibility('alti_ell');
}