function readFilePRNx(){
    
    // Get file and path
    let fileName = document.getElementById('inputfile').files[0];
    
    //console.log(fileName.path);
    //const path = (window.URL || window.webkitURL).createObjectURL(fileName); 
    //console.log(`path: ${path}`);
    
    // Reading the contents of the .PRNx file
    let fr = new FileReader();
    fr.onload=function() {
      const xmlToParse = fr.result;
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlToParse,"text/xml");

      verifyErrors(xmlDoc);

      //window_affichFilter();
      
      // Measure
      echelleEllipses = document.getElementById("myRange").value;

      // Points management
      pts_Map = parseXML_points(xmlDoc);
      const pts_planiVar = parseXML_variablePoints_fixBug(pts_Map, 'planimetric');
      const pts_planiObs = parseXML_planiObsPoints(xmlDoc);  // get points to targets
      let pts_altiVar = [];
      let pts_altiObs = [];

      // Vérifier la présence de l'abriss altimétrique
      const altiAbriss = xmlDoc.getElementsByTagName('altimetricAbriss');
      if (altiAbriss.length >= 1){
        
        // Points management
        pts_altiVar = parseXML_variablePoints_fixBug(pts_Map, 'altimetric');
        pts_altiObs = parseXML_altiObsPoints(xmlDoc);

        // Layers
        affichMeasAlti(xmlDoc, pts_Map);
        affichPrecisionAlti(pts_Map, xmlDoc);
        affichPrecisionAltiRela(pts_Map, xmlDoc, 0);
        affichRectangleAlti(pts_Map, xmlDoc); 
        affichRectangleAltiRela(pts_Map, xmlDoc, 0);
        affichFiabLocAlti(pts_Map, xmlDoc);
        affichResiNormesAlti(pts_Map, xmlDoc);
        affichVecteursAlti(pts_Map);
      };

      defineViewByFile(pts_Map);   // Zoom view
      affichPointsPlani(pts_Map, pts_planiVar, pts_planiObs);
      affichPointsAlti(pts_Map, pts_altiVar, pts_altiObs);

      //------- PLANIMETRIC
      affichMeasPlani(xmlDoc, pts_Map);
      affichPrecisionPlani(pts_Map, xmlDoc);
      affichPrecisionPlaniRela(pts_Map, xmlDoc, 0);
      affichRectanglePlani(pts_Map);
      affichRectanglePlaniRela(pts_Map, xmlDoc, 0);
      affichFiabLocPlani(xmlDoc, pts_Map);
      affichResiNormesPlani(xmlDoc, pts_Map);
      affichVecteurs(pts_Map);

      document.getElementById("outputTest").textContent = "Import effectué ✓";
    };
    fr.readAsText(fileName);

};