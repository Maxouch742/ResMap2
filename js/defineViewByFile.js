function defineViewByFile(points){
    console.log("OK pour le zoom");
    const listPoints = []
    points.forEach((value, key) => {
        console.log(key, value.east, value.north);
        listPoints.push([value.east, value.north]);
    });
    extentProject = ol.extent.boundingExtent(listPoints);
    bufferProject = ol.extent.buffer(extentProject, 50);
    view.fit(bufferProject);
}