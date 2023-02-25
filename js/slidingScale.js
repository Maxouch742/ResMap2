
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
    map.removeLayer(ellipseLayerAltimetric);
    map.removeLayer(rectangleLayerAltimetric);
    map.removeLayer(vectLayerAlti);
    if (xmlDoc.getElementsByTagName("relativeEllipses").length != 0){ // On retire uniquement le Layer ellipseRelaLayer si il y en a
        map.removeLayer(ellipseRelaLayer);
        map.removeLayer(ellipRelaAltiLayer);
    }; 
    if (xmlDoc.getElementsByTagName("relativeRectangles").length != 0){ // On retire uniquement le Layer rectangleRelaLayer si il y en a
        map.removeLayer(rectangleRelaLayer);
        map.removeLayer(rectangleRelaLayerAlti);
    };
    echelleEllipses = parseFloat(this.value);
    parsingEllipsesXML_planimetric();
    parsingEllipsesRelaXML_planimetric();
    parsingRectanglesXML_planimetric();
    parsingRectanglesRelaXML_planimetric();
    parsingVectXML_planimetric();

    parsingEllipsesXML_altimetric();
    parsingEllipsesRelaXML_altimetric();
    parsingRectanglesXML_altimetric();
    parsingRectanglesRelaXML_altimetric();
    parsingVectXML_altimetric();
};
