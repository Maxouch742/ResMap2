function affichPrecisionPlani(pts, xml){

    // Définiiton des sources
    const planiEll_source = new ol.source.Vector({});

    // ------- NIVEAU DE CONFIANCE ELLIPSES -------
    const progvers = xml.getElementsByTagName("progvers")[0];
    const nameProg = progvers.childNodes[0].textContent;
    
    let nivConfianceEllipses;
    let kSigma;

    switch (nameProg){
        case '1':
            nivConfianceEllipses = "95%";
            kSigma = 2.45; //  pour passer de 1 sigma à k sigma
            break;
        case '2':
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
        case '3':
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
        case '4':
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
        case '5':
            nivConfianceEllipses = "68%";
            kSigma = 1.0;
            break;
    };

    const print = document.getElementById('nivConfianceValue');
    print.innerHTML = nivConfianceEllipses;
    
    let t = range(0, 390, 10);

    // Liste map
    pts.forEach((value, key) => {
        
        if (value.EMA != undefined){
            
            // Variable
            const east = value.east;
            const north = value.north;
            const ema = value.EMA/1000.0;
            const emb = value.EMB/1000.0;
            let gis_ema = value.Gis_EMA;

            if (gis_ema < 0.0){ gis_ema = gis_ema + 400.0 };
            gis_ema = gis_ema + 100.0;
            if (gis_ema >= 400.0){ gis_ema = gis_ema - 400.0 };
            let rota = gis_ema*Math.PI/200.0;
            
            // Définition de l'ellipse
            let listENellipse = [];
            t.forEach(gis => listENellipse.push([
                ema*kSigma*echelleEllipses*Math.cos(gis*Math.PI/180.0)+east,
                emb*kSigma*echelleEllipses*Math.sin(gis*Math.PI/180.0)+north
            ]));

            // Création du feature
            const planiEll_feature = new ol.Feature({
                geometry: new ol.geom.LineString(listENellipse),
                properties: String(ema*1000.0)+"mm",
            });
            planiEll_feature.getGeometry().rotate(-rota, [east, north]);
            planiEll_source.addFeature(planiEll_feature);
        }
    });

    // Ajout à la map
    planiEll_layer.setSource( planiEll_source );
    planiEll_layer.setStyle( function (feature) { 
        styleEllipse.getText().setText(feature.get("properties")); 
        return styleEllipse;
    });
    changeLayerVisibility('plani_ell');
}