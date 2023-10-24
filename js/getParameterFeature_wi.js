function getParameterFeature_wi(wi, limitWi, limitInf, dimension = "2D"){
    let colorWi;
    let widthWi;
    if (wi >= limitWi) {
        colorWi = "#FF1700"; //rouge
        widthWi = 3;
        if (dimension === '2D'){
            wiInf_2D += 1;
        } else {
            wiInf_1D += 1;
        }
    } else if (wi > limitInf) {
        colorWi = "#FFD000"; //jaune
        widthWi = 2;
        if (dimension === '2D'){
            wi2_2D += 1;
        } else {
            wi2_1D += 1;
        }
    } else if (wi < limitInf) {
        colorWi = "#2AE100"; //vert
        widthWi = 1;
        if (dimension === '2D'){
            wi0_2D += 1;
        } else {
            wi0_1D += 1;
        }
    };
    return [colorWi,widthWi];
}