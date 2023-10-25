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

      zi0_2D = 0;
      zi25_2D = 0;
      zi50_2D = 0;
      zi75_2D = 0;

      zi0_1D = 0;
      zi25_1D = 0;
      zi50_1D = 0;
      zi75_1D = 0;

      wiInf_2D = 0;
      wi2_2D = 0;
      wi0_2D = 0;

      wiInf_1D = 0;
      wi2_1D = 0;
      wi0_1D = 0;

      verifyErrors(xmlDoc);
      
      // Measure
      echelleEllipses = document.getElementById("myRange").value;

      // Points management
      pts_Map = parseXML_points(xmlDoc);
      pts_planiVar = parseXML_variablePoints_fixBug(pts_Map, 'planimetric');
      [pts_planiObs, planiStation] = parseXML_planiObsPoints(xmlDoc);  // get points to targets
      pts_altiVar = [];
      pts_altiObs = [];

      // Vérifier la présence de l'abriss altimétrique
      const altiAbriss = xmlDoc.getElementsByTagName('altimetricAbriss');
      if (altiAbriss.length >= 1){
        
        // Points management
        pts_altiVar = parseXML_variablePoints_fixBug(pts_Map, 'altimetric');
        [pts_altiObs, altiStation] = parseXML_altiObsPoints(xmlDoc);

        // Layers
        affichMeasAlti(xmlDoc, pts_Map);
        affichPrecisionAlti(pts_Map, xmlDoc);
        affichPrecisionAltiRela(pts_Map, xmlDoc, 0);
        affichRectangleAlti(pts_Map, xmlDoc); 
        affichRectangleAltiRela(pts_Map, xmlDoc, 0);
        affichFiabLocAlti(pts_Map, xmlDoc);
        affichResiNormesAlti(pts_Map, xmlDoc);
        affichVecteursAlti(pts_Map);

        // Afficher le radio button 1D pour l'altimétrie
        window_affichFilter1D();
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
      document.getElementById("zoomButton").disabled = false;
      document.getElementById("openSidebar").disabled = false;

      document.getElementById("zi0_2D").textContent = zi0_2D;
      document.getElementById("zi25_2D").textContent = zi25_2D;
      document.getElementById("zi50_2D").textContent = zi50_2D;
      document.getElementById("zi75_2D").textContent = zi75_2D;
      
      document.getElementById("zi0_1D").textContent = zi0_1D;
      document.getElementById("zi25_1D").textContent = zi25_1D;
      document.getElementById("zi50_1D").textContent = zi50_1D;
      document.getElementById("zi75_1D").textContent = zi75_1D;
      
      document.getElementById("wiInf_2D").textContent = wiInf_2D;
      document.getElementById("wi2_2D").textContent = wi2_2D;
      document.getElementById("wi0_2D").textContent = wi0_2D;
      document.getElementById("wiInf_1D").textContent = wiInf_1D;
      document.getElementById("wi2_1D").textContent = wi2_1D;
      document.getElementById("wi0_1D").textContent = wi0_1D;
    };
    fr.readAsText(fileName);

};