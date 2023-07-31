function readFilePRNx(){
    
    // Get file and path
    let fileName = document.getElementById('inputfile').files[0]
    
    // Reading the contents of the .PRNx file
    let fr = new FileReader();
    fr.onload=function() {
      const xmlToParse = fr.result;
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlToParse,"text/xml");

      response = verifyErrors(xmlDoc);
      if (response === 0){

        // Vérifier la présence de l'abriss altimétrique
        const altiAbriss = xmlDoc.getElementsByTagName('altimetricAbriss');
        if (altiAbriss.length >= 1){
          document.getElementById("buttonAbrissAltimetrique").disabled = false;
        }

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
        echelleEllipses = document.getElementById("myRange").value;
      
        //------- PLANIMETRIC
        affichMeasPlani(xmlDoc, pts_Map);
        affichPrecisionPlani(pts_Map, xmlDoc);
        affichRectanglePlani(pts_Map);
        affichFiabLocPlani(xmlDoc, pts_Map);
        affichResiNormesPlani(xmlDoc, pts_Map);
        affichVecteurs(pts_Map);

        //------- ALTIMETRIC
        affichMeasAlti(xmlDoc, pts_Map);
        affichPrecisionAlti(pts_Map, xmlDoc);
        affichRectangleAlti(pts_Map, xmlDoc); 
        affichFiabLocAlti(pts_Map, xmlDoc);
        affichResiNormesAlti(pts_Map, xmlDoc);
        affichVecteursAlti(pts_Map);

        //------ Relatif
        affichPrecisionPlaniRela(pts_Map, xmlDoc, 0);
        affichRectanglePlaniRela(pts_Map, xmlDoc, 0);
        
        affichPrecisionAltiRela(pts_Map, xmlDoc, 0);
        affichRectangleAltiRela(pts_Map, xmlDoc, 0);

        document.getElementById("outputTest").textContent = "Import effectué ✓";
      };
    };
    fr.readAsText(fileName);

};