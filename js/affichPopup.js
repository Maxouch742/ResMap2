map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature; 
    })
    console.log(feature.getProperties());
    $(elementPopup).popover('dispose');

    // Si l'utilisateur a cliqué à côté d'une feature
    if (feature) {

        // Si "height" est dans la 
        if ("height" in feature.getProperties()){

            // Création du popoup
            popupOverlay.setPosition(evt.coordinate);
            $(elementPopup).popover({
                placement: 'top',
                html: true,
                content: `
                <div>
                    Point: ${feature.getProperties().name}<br>
                    Statut: ${feature.getProperties().statut}<br>
                    E = ${feature.getProperties().east.toFixed(4)} [m]<br>
                    N = ${feature.getProperties().north.toFixed(4)} [m]<br>
                    H = ${feature.getProperties().height.toFixed(4)} [m]<br>
                    Xi = ${feature.getProperties().xi.toFixed(2)} [cc]<br>
                    Eta = ${feature.getProperties().eta.toFixed(2)} [cc]<br>
                </div>`
                
                
                
                /*`
                <div style="font-weight:bold">Point : &nbsp;&nbsp;&nbsp;${feature.getProperties().name}</div>
                <hr>
                <div class="">Statut : &nbsp;&nbsp;&nbsp;${feature.getProperties().statut}</div>
                <hr>
                <div class="">E : &nbsp;&nbsp;&nbsp;${feature.getProperties().east.toFixed(4)} [m]</div>
                <div class="">N : &nbsp;&nbsp;&nbsp;${feature.getProperties().north.toFixed(4)} [m]</div>
                <div class="">H : &nbsp;&nbsp;&nbsp;${feature.getProperties().height.toFixed(4)} [m]</div>
                <div class="">Xi : &nbsp;&nbsp;&nbsp;${feature.getProperties().xi.toFixed(2)} [cc]</div>
                <div class="">Eta : &nbsp;&nbsp;&nbsp;${feature.getProperties().eta.toFixed(2)} [cc]</div>`
                */
            });
            $(elementPopup).popover("show");

        } else if ("obs" in feature.getProperties()) {

            if (feature.getProperties().obs === "direction" || 
                feature.getProperties().obs === "distance"  ||
                feature.getProperties().obs === "heightDiff" ){

                let unit = "[mm]"
                if (feature.getProperties().obs === "direction"){
                    unit = "[cc]"
                }

                // Création du popoup
                popupOverlay.setPosition(evt.coordinate);
                $(elementPopup).popover({
                    placement: 'top',
                    html: true,
                    content: `
                    <div>
                        Station : ${feature.getProperties().station}<br>
                        Visée : ${feature.getProperties().visee}<br>
                        Obs n° : ${feature.getProperties().id}<br>
                        Groupe : ${feature.getProperties().group}<br>
                        Type : ${feature.getProperties().obs}<br>
                        Wi = ${feature.getProperties().wi.toFixed(2)} ${unit}<br>
                        Zi = ${feature.getProperties().zi}%<br>
                        &#8711;li = ${feature.getProperties().nabla.toFixed(2)} ${unit}
                    </div>`
                });
                $(elementPopup).popover("show");
            }
        }
    }
})