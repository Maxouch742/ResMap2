elementPopup = document.getElementById('popup');
popupOverlay = new ol.Overlay({
    element: elementPopup,
    positioning: 'bottom-center',
    stopEvent: false
});
map.addOverlay(popupOverlay);

