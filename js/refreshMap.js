function refresh(){

    console.log(fileName);

    if (fileName === false){
        alert("Aucun fichier n'est importé. Importez un fichier .PRNx afin de mettre à jour la map");
    }
    console.log(fileName);

}


function initializeLayers(){
    // Altimetrie
    pointsLayerAltimetric = 0;
    pointsVariableLayerAltimetric = 0;
    deniveleeLayer = 0;
    gnssLayerAltimetric = 0;
    obsCoordHLayer = 0;
    ellipseLayerAltimetric = 0;
    ellipRelaAltiLayer = 0;
    rectangleLayerAltimetric = 0;
    rectangleRelaLayerAlti = 0;
    fiabLocalLayerAlti = 0;
    deniveleeLayer = 0;
    wiLayerAlti = 0;
    vectLayerAlti = 0;

    // Planimetrie
    pointsLayer = 0;
    pointsVariableLayer = 0;
    directionLayer = 0;
    distanceLayer = 0;
    ellipseLayer = 0;
    ellipseRelaLayer = 0;
    rectangleLayer = 0;
    rectangleRelaLayer = 0;
    gnssLayer = 0;
    obsCoordELayer = 0;
    obsCoordNLayer = 0;
    fiabLocalLayer = 0;
    wiLayer = 0;
    vectLayer = 0;

    // Coordonnée
    listAllPoints = [];
    listCoordsProject = [];
}