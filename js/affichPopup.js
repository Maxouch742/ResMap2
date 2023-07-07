map.on('click', function(evt){
    const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature){
        return feature;
    });
    $(elementPopup).popover('dispose');

    // si on a bien cliqué à proximité d'un feature
    if (feature){
        console.log(feature);

        
    }
})

// Close the popup when the map is moved
map.on('movestart', function () {
    $(elementPopup).popover('dispose');
  });
  