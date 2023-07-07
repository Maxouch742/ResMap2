function gisement(dx, dy){
    
    let gisement = 2*Math.atan( dx / (Math.sqrt(dx*dx + dy*dy)+dy) )*200/Math.PI;
    gisement = gisement + 200.0;
    
    if (gisement < 0){ gisement += 400 };
    return gisement*Math.PI/200.0
};