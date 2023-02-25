function changeProjection(value) {
    console.log("EPSG:"+String(value));

    // Récupérer la vue actuelle et la projection
    const currentView = map.getView();
    const currentProjection = currentView.getProjection();

    // Création de la nouvelle projection
    const newProjection =  new ol.proj.Projection({
        code: "EPSG:"+String(value),
        units: "m"
    });
    
    // Récupérer le centre de la vue et le transformer dans le nouveau système
    const currentCenter = currentView.getCenter();
    const newCenter = ol.proj.transform(currentCenter, currentProjection, newProjection);
    console.log(newCenter);
    console.log(newProjection);

    // Création de la nouvelle vue
    const newView = new ol.View({
        center: newCenter,
        projection: newProjection,
    });

    // Mettre à jour la nouvelle vue
    map.setView(newView);
}