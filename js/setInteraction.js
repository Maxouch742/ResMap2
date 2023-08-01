function setInteraction() {

    if (dragAndDropInteraction){
        map.removeInteraction(dragAndDropInteraction);
    }
    dragAndDropInteraction = new ol.interaction.DragAndDrop({
        formatConstructors: [
            ol.format.GPX,
            ol.format.GeoJSON,
            ol.format.IGC,
            ol.format.KML,
            ol.format.TopoJSON,
        ],
    });
    dragAndDropInteraction.on('addfeatures', function (event) {
        const vectorSource = new ol.source.Vector({
            features: event.features,
        });
        map.addLayer(
            new ol.layer.Vector({
                source: vectorSource
            })
        );
        map.getView().fit(vectorSource.getExtent());
    });
    map.addInteraction(dragAndDropInteraction);
};