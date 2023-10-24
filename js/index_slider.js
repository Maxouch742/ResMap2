var slider = document.getElementById("myRange");
const output = document.getElementById("echelleValue");
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  echelleEllipses = this.value;
  output.innerHTML = echelleEllipses;

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

  if (matricule !== false){
    const check = document.getElementsByName("AbrissPlani");
    let dim;
    for (let i=0; i<check.length; i++) {
      if (check[i].checked){
        dim = check[i].value;
      }
    };

    switch (dim) {
        case 'AbrissPlani':

          // Suppression des features non utiles
          const list_layer = [
              planiDir_layer, 
              planiDis_layer,
              planiGNSS_layer,
              planiCoordE_layer,
              planiCoordN_layer,

              planiFiabLocDir_layer,
              planiFiabLocDis_layer,
              planiFiabLocGNSS_layer,
              planiFiabLocCoordE_layer,
              planiFiabLocCoordN_layer,

              planiResiDir_layer,
              planiResiDis_layer,
              planiResiGNSS_layer,
              planiResiCoordE_layer,
              planiResiCoordN_layer,
          ];
          const liste_points_stations = [matricule];
          for (let i=0; i<list_layer.length; i++){
              if (list_layer[i].getSource() !== null){
                  list_layer[i].getSource().getFeatures().forEach(function (feature){
                      if (feature.getProperties().visee !== matricule){
                          list_layer[i].getSource().removeFeature(feature);
                      } else {
                          if (liste_points_stations.includes(feature.getProperties().station) === false){
                              liste_points_stations.push(feature.getProperties().station);
                          }
                      }
                  });
              };
          };  

          // Sélection de points pour les ellipses et les rectangles
          const list_layer_PrecFiab = [
              planiEll_layer,
              planiRect_layer,
              planiVect_layer
          ];
          for (let i=0; i<list_layer_PrecFiab.length; i++){
              if (list_layer_PrecFiab[i].getSource() !== null){
                  list_layer_PrecFiab[i].getSource().getFeatures().forEach(function (feature){
                      if (liste_points_stations.includes(feature.getProperties().name) === false){
                          list_layer_PrecFiab[i].getSource().removeFeature(feature);
                      }
                  })
              }
          }; 
          break;

        case 'AbrissAlti':

          // Créer une liste de points visées
          const list_points_station_alti = [matricule];

          // Suppression des features non utiles
          const list_layer_alti = [
              altiDH_layer, 
              altiGNSS_layer,
              altiCoordH_layer,

              altiFiabLocDH_layer,
              altiFiabLocGNSS_layer,
              altiFiabLocCoordH_layer,

              altiResiDH_layer,
              altiResiGNSS_layer,
              altiResiCoordH_layer,
          ];
          for (let i=0; i<list_layer_alti.length; i++){
              if (list_layer_alti[i].getSource() !== null){
                  list_layer_alti[i].getSource().getFeatures().forEach(function (feature){
                      if (feature.getProperties().visee !== matricule){
                          list_layer_alti[i].getSource().removeFeature(feature);
                      } else {
                          if (list_points_station_alti.includes(feature.getProperties().station) === false){
                              list_points_station_alti.push(feature.getProperties().station);
                          }
                      }
                  });

              };
          };

          // Sélection des points pour les ellipses et les rectangles
          const list_layer_PrecFiab_alti = [
              altiEll_layer,
              altiRect_layer,
              altiVect_layer
          ];
          for (let i=0; i<list_layer_PrecFiab_alti.length; i++){
              if (list_layer_PrecFiab_alti[i].getSource() !== null){
                  list_layer_PrecFiab_alti[i].getSource().getFeatures().forEach(function (feature){
                      if (list_points_station_alti.includes(feature.getProperties().name) === false){
                          list_layer_PrecFiab_alti[i].getSource().removeFeature(feature);
                      }
                  })
              }
          };
          break;
    }
  }

  if (matricule_sta !== false){

    // Récupérer l'abriss choisie
    const check = document.getElementsByName("AbrissPlani");
    let dim;
    for (let i=0; i<check.length; i++) {
        if (check[i].checked){
            dim = check[i].value;
        }
    };

    switch(dim){
      case 'AbrissPlani':
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
          planiRect_layer,
          planiVect_layer
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
        break;
      case 'AbrissAlti':
        // Créer une liste de points visées
        const list_points_visees_alti = [matricule_sta];

        // Suppression des features non utiles
        const list_layer_alti = [
            altiDH_layer, 
            altiGNSS_layer,
            altiCoordH_layer,

            altiFiabLocDH_layer,
            altiFiabLocGNSS_layer,
            altiFiabLocCoordH_layer,

            altiResiDH_layer,
            altiResiGNSS_layer,
            altiResiCoordH_layer,
        ];
        for (let i=0; i<list_layer_alti.length; i++){
            if (list_layer_alti[i].getSource() !== null){

                list_layer_alti[i].getSource().getFeatures().forEach(function (feature){
                    if (feature.getProperties().station !== matricule_sta){
                        list_layer_alti[i].getSource().removeFeature(feature);
                    } else {
                        if (list_points_visees_alti.includes(feature.getProperties().visee) === false){
                            list_points_visees_alti.push(feature.getProperties().visee);
                        }
                    }
                });

            };
        };

        // Sélection des points pour les ellipses et les rectangles
        const list_layer_PrecFiab_alti = [
            altiEll_layer,
            altiRect_layer,
            altiVect_layer
        ];
        for (let i=0; i<list_layer_PrecFiab_alti.length; i++){
            if (list_layer_PrecFiab_alti[i].getSource() !== null){
                list_layer_PrecFiab_alti[i].getSource().getFeatures().forEach(function (feature){
                    if (list_points_visees_alti.includes(feature.getProperties().name) === false){
                        list_layer_PrecFiab_alti[i].getSource().removeFeature(feature);
                    }
                })
            }
        };
        break;
    }    
  }
}