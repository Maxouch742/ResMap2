function readFilePRNx(){
    
    // Get file and path
    let fileName = document.getElementById('inputfile').files[0]

    // Reading the contents of the .PRNx file
    let fr = new FileReader();
    fr.onload=function() {
      const xmlToParse = fr.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlToParse,"text/xml");

      // Define layers
      defineLayers();

      // Point management
      affichPoints(xmlDoc, 'planimetric');
      defineViewByFile();   // Zoom view

      //------- PLANIMETRIC
      affichMeasure(xmlDoc, 'planimetric');


      //------- ALTIMETRIC
      affichPoints(xmlDoc, 'altimetric');
      

      
      

      document.getElementById("outputTest").textContent = "Import effectué ✓";
    };
    fr.readAsText(fileName);

};