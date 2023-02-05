
// ---------------  SCRIPT POUR SLIDING BAR ECHELLE  ---------------

let slider = document.getElementById("myRange");
let output = document.getElementById("textEchelle");
output.innerHTML = slider.value;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    map.removeLayer(ellipseLayer);
    map.removeLayer(rectangleLayer);
    map.removeLayer(vectLayer);
    if (xmlDoc.getElementsByTagName("relativeEllipses").length != 0){ // On retire uniquement le Layer ellipseRelaLayer si il y en a
        map.removeLayer(ellipseRelaLayer);
    }; 
    if (xmlDoc.getElementsByTagName("relativeRectangles").length != 0){ // On retire uniquement le Layer rectangleRelaLayer si il y en a
        map.removeLayer(rectangleRelaLayer);
    };
    echelleEllipses = parseFloat(this.value);
    parsingEllipsesXML(xmlToParse);
    parsingRectanglesXML(xmlToParse);
    parsingEllipsesRelaXML(xmlToParse);
    parsingRectanglesRelaXML(xmlToParse);
    parsingVectXML(xmlToParse);
};
