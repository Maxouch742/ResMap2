function changeBackground(name){

    // Desactive layers
    map.removeLayer(background_CN);
    map.removeLayer(swissImage);
    map.removeLayer(swissSURFACE3D);
    map.removeLayer(MO_nb);

    // add layer
    switch (name){
        case 'CN' :
            map.addLayer(background_CN);
            break;
        case 'swissImage' :
            map.addLayer(swissImage);
            break;
        case 'swissSurface3D' :
            map.addLayer(swissSURFACE3D);
            break;
        case 'MO' :
            map.addLayer(MO_nb);
            break;
    };
}