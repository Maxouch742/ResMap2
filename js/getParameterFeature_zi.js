function getParameterFeature_zi(zi){
    let colorFiab;
    let widthFiab;
    let zIndex;
    if (zi < 25.0) {
        colorFiab = "#FF1700"; //red
        widthFiab = 3;
        zIndex = 99;
    } 
    else if (zi <= 50.0) {
        colorFiab = "#FFD000"; //yellow
        widthFiab = 1.5;
        zIndex = 98;
    } 
    else if (zi <= 75.0) {
        colorFiab = "#ABFF00"; //green
        widthFiab = 1;
        zIndex = 1;
    } 
    else if (zi <= 100.0) {
        colorFiab = "#2AE100"; //green
        widthFiab = 1;
        zIndex = 1;
    };
    return [colorFiab, widthFiab, zIndex]
}