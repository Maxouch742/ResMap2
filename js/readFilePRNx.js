function readFilePRNx(){
    
    // Get file and path
    let fileName = document.getElementById('inputfile').files[0]
    
    // Reading the contents of the .PRNx file
    let fr = new FileReader();
    fr.onload=function() {
      const xmlToParse = fr.result;
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlToParse,"text/xml");

      // Points management
      pts_Map = parseXML_points(xmlDoc);
      const pts_planiVar = parseXML_variablePoints(xmlDoc, 'planimetric');
      const pts_planiObs = parseXML_planiObsPoints(xmlDoc);  // get points to targets
      const pts_altiVar = parseXML_variablePoints(xmlDoc, 'altimetric');
      const pts_altiObs = parseXML_altiObsPoints(xmlDoc);

      defineViewByFile(pts_Map);   // Zoom view
      affichPointsPlani(pts_Map, pts_planiVar, pts_planiObs);
      affichPointsAlti(pts_Map, pts_altiVar, pts_altiObs);

      // Measure
      affichMeasPlani(xmlDoc, pts_Map);
      affichMeasAlti(xmlDoc, pts_Map);

      // indicateurs plani
      echelleEllipses = document.getElementById("myRange").value;
      affichPrecisionPlani(pts_Map, xmlDoc);
      affichRectanglesPlani(pts_Map);
      affichFiabLocPlani(xmlDoc, pts_Map);
      affichResiNormesPlani(xmlDoc, pts_Map);
      affichVecteurs(pts_Map);

      //------- ALTIMETRIC
      affichPrecisionAlti(pts_Map, xmlDoc);
      affichRectangleAlti(pts_Map, xmlDoc);
      

      
      

      document.getElementById("outputTest").textContent = "Import effectué ✓";
    };
    fr.readAsText(fileName);

};