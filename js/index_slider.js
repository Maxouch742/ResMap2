var slider = document.getElementById("myRange");
const output = document.getElementById("echelleValue");
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  echelleEllipses = this.value;
  output.innerHTML = echelleEllipses;

  if (matricule !== false){
    affichPrecisionPlani(pts_Map, xmlDoc, matricule);
    affichRectanglePlani(pts_Map, matricule);
    affichVecteurs(pts_Map, matricule);
  
    affichPrecisionAlti(pts_Map, xmlDoc, matricule);
    affichRectangleAlti(pts_Map, xmlDoc, matricule);
    affichVecteursAlti(pts_Map, matricule);
  };

  affichPrecisionPlani(pts_Map, xmlDoc);
  affichRectanglePlani(pts_Map);
  affichVecteurs(pts_Map);
  affichPrecisionPlaniRela(pts_Map, xmlDoc);
  affichRectanglePlaniRela(pts_Map, xmlDoc);
  
  affichPrecisionAltiRela(pts_Map, xmlDoc);
  affichRectangleAltiRela(pts_Map, xmlDoc);
  affichPrecisionAlti(pts_Map, xmlDoc);
  affichRectangleAlti(pts_Map, xmlDoc);
  affichVecteursAlti(pts_Map);

  if (matricule_sta !== false){
    // Suppression des features non utiles
    const list_layer = [
      planiDir_layer, 
      planiDis_layer,
      planiGNSS_layer,
      planiCoordE_layer,
      planiCoordN_layer,
    ];

    const liste_points_visees = [matricule_sta];

    for (let i=0; i<list_layer.length; i++){
      if (list_layer[i].getSource() !== null){
        list_layer[i].getSource().getFeatures().forEach(function (feature){
          if (feature.getProperties().station === matricule_sta){
            if (liste_points_visees.includes(feature.getProperties().visee) === false){
              liste_points_visees.push(feature.getProperties().visee);
            }
          }
        });
      };
    };

    // Sélection de points pour les ellipses et les rectangles
    const list_layer_PrecFiab = [
      planiEll_layer,
      planiRect_layer
    ];
    for (let i=0; i<list_layer_PrecFiab.length; i++){
      if (list_layer_PrecFiab[i].getSource() !== null){
        list_layer_PrecFiab[i].getSource().getFeatures().forEach(function (feature){
          if (liste_points_visees.includes(feature.getProperties().name) === false){
            list_layer_PrecFiab[i].getSource().removeFeature(feature);
          }
        })
      }
    };
  }
}