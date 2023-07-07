function readFilePRNx(){
    
    // Get file and path
    let fileName = document.getElementById('inputfile').files[0]

    // Reading the contents of the .PRNx file
    let fr = new FileReader();
    fr.onload=function() {
      const xmlToParse = fr.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlToParse,"text/xml");

      console.log(xmlDoc);

      // Points management
      affichPoints(xmlDoc, 'planimetric');

      // Zoom view
      defineViewByFile();
      

      document.getElementById("outputTest").textContent = "Import effectué ✓";
    };
    fr.readAsText(fileName);

};