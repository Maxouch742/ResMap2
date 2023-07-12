var slider = document.getElementById("myRange");
const output = document.getElementById("echelleValue");
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  echelleEllipses = this.value;
  output.innerHTML = echelleEllipses;

  affichPrecision(pts_Map, xmlDoc);
  affichRectangles(pts_Map);
  affichVecteurs(pts_Map);
}
