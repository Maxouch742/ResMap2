function getParameterFeature_zi(zi, dimension = '2D'){
    let colorFiab;
    let widthFiab;
    let zIndex;
    if (zi < 25.0) {
        colorFiab = "#FF1700"; //red
        widthFiab = 3;
        zIndex = 99;
        if (dimension === '2D'){
            zi0_2D += 1;
        } else {
            zi0_1D += 1;
        }
    } 
    else if (zi <= 50.0) {
        colorFiab = "#FFD000"; //yellow
        widthFiab = 1.5;
        zIndex = 98;
        if (dimension === '2D'){
            zi25_2D += 1;
        } else {
            zi25_1D += 1;
        }
    } 
    else if (zi <= 75.0) {
        colorFiab = "#ABFF00"; //green
        widthFiab = 1.2;
        zIndex = 1;
        if (dimension === '2D'){
            zi50_2D += 1;
        } else {
            zi50_1D += 1;
        }
    } 
    else if (zi <= 100.0) {
        colorFiab = "#2AE100"; //green
        widthFiab = 1.2;
        zIndex = 1;
        if (dimension === '2D'){
            zi75_2D += 1;
        } else {
            zi75_1D += 1;
        }
    };
    return [colorFiab, widthFiab, zIndex]
}