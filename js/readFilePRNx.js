function readFilePRNx(){
    
    // Get file and path
    let fileName = document.getElementById('inputfile').files[0]

    // Reading the contents of the .PRNx file
    let fr = new FileReader();
    fr.onload=function() {
      const xmlToParse = fr.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlToParse,"text/xml");

      // Points management
      const pts_Map = parseXML_points(xmlDoc);
      const pts_planiVar = parseXML_variablePoints(xmlDoc, 'planimetric');
      const pts_planiObs = parseXML_planiObsPoints(xmlDoc);  // get points to targets
      const pts_altiVar = parseXML_variablePoints(xmlDoc, 'altimetric');
      const pts_altiObs = parseXML_altiObsPoints(xmlDoc);

      defineViewByFile(pts_Map);   // Zoom view
      affichPointsPlani(pts_Map, pts_planiVar, pts_planiObs);
      affichPointsAlti(pts_Map, pts_altiVar, pts_altiObs);

      // Measure
      affichMeasPlani(xmlDoc, pts_Map);


      //affichPoints(xmlDoc, 'planimetric');
      //

      //------- PLANIMETRIC
      //affichMeasure(xmlDoc, 'planimetric');


      //------- ALTIMETRIC
      //affichPoints(xmlDoc, 'altimetric');
      

      
      

      document.getElementById("outputTest").textContent = "Import effectué ✓";
    };
    fr.readAsText(fileName);

};