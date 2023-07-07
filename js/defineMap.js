// Ajout de la Map
map = new ol.Map({
    target: "map",
    layers: [background_CN],
    overlays: [overlay],
    view,
});