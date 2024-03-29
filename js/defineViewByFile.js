function defineViewByFile(points){
    const listPoints = []
    points.forEach((value, key) => {
        listPoints.push([value.east, value.north]);
    });
    extentProject = ol.extent.boundingExtent(listPoints);
    bufferProject = ol.extent.buffer(extentProject, 75);
    view.fit(bufferProject);
}