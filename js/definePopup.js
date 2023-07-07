elementPopup = document.getElementById('popup');
popup = new ol.Overlay({
    element: elementPopup,
    positioning: 'bottom-center',
    stopEvent: false
});
map.addOverlay(popup);

