function parseXML_variablePoints(xml, type){

    const variablePoints = [];

    const points = xml.getElementsByTagName('variablePoints');
    
    for (let i=0; i<points.length; i++){
        if (points[i].getAttribute("type") === type && points[i].getAttribute("count") != null){
            variablePointList_plani = points[i].getElementsByTagName("variablePoint");
        };
    };

    for (let i=0; i<variablePointList_plani.length; i++){
        variablePoints.push(variablePointList_plani[i].getAttribute('name'))
    };
    
    return variablePoints;
}