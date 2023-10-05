function parseXML_variablePoints_fixBug(pts_Map, type){
    // LTOP bug lorsque il compile les PRNx.
    // Il ne met pas tout les points variables dans le PRNx malgré un compte juste.

    const variablePoints = [];

    pts_Map.forEach((value, key) => {
        switch (type){
            case 'planimetric':
                if (value.EMA == undefined){
                    variablePoints.push(key);
                };
                break;
            case 'altimetric':
                if (value.EMH == undefined){
                    variablePoints.push(key);
                }
                break;
            }
    });
    
    return variablePoints;
}