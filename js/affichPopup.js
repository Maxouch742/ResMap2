map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature; 
    })
    console.log(feature);
    $(elementPopup).popover('dispose');

    // Si l'utilisateur a cliqué à côté d'une feature
    if (feature) {

        // Si "height" est dans la 
        if ("height" in feature.getProperties().properties){
            console.log(feature.getProperties());

            // Création du popoup
            popupOverlay.setPosition(evt.coordinate);
            $(elementPopup).popover({
                placement: 'top',
                html: true,
                content: `
                <div class="">Point ${feature.getProperties().name}</div>
                <div class="">Est: [m]</div>
                <div class="">Nord: [m]</div>
                <div class="">Hauteur: ${feature.getProperties().properties.height.toFixed(4)} [m]</div>`
            });
            $(elementPopup).popover("show");
        }
    }
})