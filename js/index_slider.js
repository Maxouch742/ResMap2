var slider = document.getElementById("myRange");
const output = document.getElementById("echelleValue");
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  echelleEllipses = this.value;
  output.innerHTML = echelleEllipses;

  affichPrecisionPlani(pts_Map, xmlDoc);
  affichRectanglesPlani(pts_Map);
  affichVecteurs(pts_Map);
  
  affichPrecisionAlti(pts_Map, xmlDoc);
  affichRectangleAlti(pts_Map, xmlDoc);
  affichVecteursAlti(pts_Map);
}
