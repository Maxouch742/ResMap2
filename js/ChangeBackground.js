/** This function Cette fonction permet de gérer 
 *  l'affichage des fonds WMTS selon le choix de 
 *  l'utilisateur
 */
function changeBackground(layer) {

    // Désactivation des couches
    map.removeLayer(carteNationale);
    map.removeLayer(swissImage);
    map.removeLayer(SwissSURFACE3D);
    map.removeLayer(MO_nb);

    // Ajout du layer choisi par l'utilisateur
    switch (layer){
        case 'CN' :
            map.addLayer(carteNationale);
            break;
        case 'swissImage' :
            map.addLayer(swissImage);
            break;
        case 'swissSurface3D' :
            map.addLayer(SwissSURFACE3D);
            break;
        case 'MO' :
            map.addLayer(MO_nb);
            break;
    };
};

