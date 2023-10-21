var slider = document.getElementById("myRange");
const output = document.getElementById("echelleValue");
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  echelleEllipses = this.value;
  output.innerHTML = echelleEllipses;

  if (matricule !== ''){
    affichPrecisionPlani(pts_Map, xmlDoc, matricule);
    affichRectanglePlani(pts_Map, matricule);
  
    affichPrecisionAlti(pts_Map, xmlDoc, matricule);
    affichRectangleAlti(pts_Map, xmlDoc, matricule);
  };
  
  affichPrecisionPlaniRela(pts_Map, xmlDoc, 1);
  affichRectanglePlaniRela(pts_Map, xmlDoc, 1);
  affichVecteurs(pts_Map, matricule);
  
  affichPrecisionAltiRela(pts_Map, xmlDoc, 1);
  affichRectangleAltiRela(pts_Map, xmlDoc, 1);
  affichVecteursAlti(pts_Map, matricule);
}