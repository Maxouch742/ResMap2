function refresh(){
    document.getElementById("outputTest").textContent = "";
    console.log(xmlDoc);
    if (fileName === false){
        alert("Aucun fichier n'est importé. Importez un fichier .PRNx afin de mettre à jour la map");
    } else {
        // Requête sur le fichier python pour rafrâichir la map
        const urlPath = url + '/?path:'+String();
        $.ajax({
            url: urlPath,
            type: 'GET',
            error: function(request, status, error) { 
              console.log("Error: " + error)
            }
        });


        readFile();
    }
}


function initializeLayers(){
    if (typeof pointsLayer != 'undefined'){

        // Altimetrie
        map.removeLayer(pointsLayerAltimetric);
        map.removeLayer(pointsVariableLayerAltimetric);
        map.removeLayer(deniveleeLayer);
        map.removeLayer(gnssLayerAltimetric);
        map.removeLayer(obsCoordHLayer);
        map.removeLayer(ellipseLayerAltimetric);
        map.removeLayer(ellipRelaAltiLayer);
        map.removeLayer(rectangleLayerAltimetric);
        map.removeLayer(rectangleRelaLayerAlti);
        map.removeLayer(fiabLocalLayerAlti);
        map.removeLayer(deniveleeLayer);
        map.removeLayer(wiLayerAlti);
        map.removeLayer(vectLayerAlti);

        // Planimetrie
        map.removeLayer(pointsLayer);
        map.removeLayer(pointsVariableLayer);
        map.removeLayer(directionLayer);
        map.removeLayer(distanceLayer);
        map.removeLayer(ellipseLayer);
        map.removeLayer(ellipseRelaLayer);
        map.removeLayer(rectangleLayer);
        map.removeLayer(rectangleRelaLayer);
        map.removeLayer(gnssLayer);
        map.removeLayer(obsCoordELayer);
        map.removeLayer(obsCoordNLayer);
        map.removeLayer(fiabLocalLayer);
        map.removeLayer(wiLayer);
        map.removeLayer(vectLayer);

        // Coordonnée
        listAllPoints = [];
        listCoordsProject = [];
        xmlDoc = false;
    }
}


function dropFilePRNx(ev){
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                console.log(`… file[${i}].name = ${file.name}`);
            }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.dataTransfer.files].forEach((file, i) => {
            console.log(`file[${i}].name = ${file.name}`);
        });
    }
}

function dragOverFilePRNx(ev){
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}