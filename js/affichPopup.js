map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature; 
    })
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
                </div>`,
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