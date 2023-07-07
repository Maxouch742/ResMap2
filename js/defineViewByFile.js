function defineViewByFile(){

    const listPoints = []
    points.forEach((value, key) => {
        
        let E = value.east;
        let N = value.north;
        if (E > 450000.0 && E < 2000000.0 && N > 70000.0 && N < 1000000.0){
            E = E + 2000000.0;
            N = N + 1000000.0;
        };

        listPoints.push([E, N]);
    });

    extentProject = ol.extent.boundingExtent(listPoints);
    bufferProject = ol.extent.buffer(extentProject, 50);
    view.fit(bufferProject);

}