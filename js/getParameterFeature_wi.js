function getParameterFeature_wi(wi, limitWi, limitInf){
    let colorWi;
    let widthWi;
    if (wi >= limitWi) {
        colorWi = "#FF1700"; //rouge
        widthWi = 3;
    } else if (wi > limitInf) {
        colorWi = "#FFD000"; //jaune
        widthWi = 2;
    } else if (wi < limitInf) {
        colorWi = "#2AE100"; //vert
        widthWi = 1;
    };
    return [colorWi,widthWi];
}