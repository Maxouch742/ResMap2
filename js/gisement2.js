function gisement2(dx, dy){
    let gisement = 2*Math.atan( dx / (Math.sqrt(dx*dx + dy*dy)+dy) )*200/Math.PI;
    if (gisement < 0){ gisement += 400 };
    return gisement;
}