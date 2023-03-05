function importFilePRNx(){

  initializeLayers();

  // Rcéupérer le path
  const path = document.getElementById("pathFile").value;

  // Requête
  const contentFile = getDataPRNx(path);
  contentFile.then(function(results){
    const data = results['data'];
    const path = results['path'];

    if (data == '0' && path == '0'){
      alert("Aucun fichier .PRNx n'est contenu dans le dossier."); 
    } else {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data,"text/xml");
      readFileXML();
    }
  });
};


async function getDataPRNx(path){
  const url_file = url + '/?path:'+String(path);
  return await getData(url_file);
};


function getData(urlPath){
  return $.ajax({
    url: urlPath,
    type: 'GET',
    error: function(request, status, error) { 
      console.log("Error: " + error)
    }
  });
};


function readFileXML(){
  // CHANGER ECHELLE ELLIPSES ET RECTANGLES PAR DEFAULT CI-DESSSOUS 
  echelleEllipses = 1000.0

  //------------------------ Parsing du XML -- Points
  parsingPointsXML();
  centerViewOnProject();
        
  //-------------------------------- Abriss planimétrique
  parsingVisee();
  layerObservationsTerrestres();
  parsingEllipsesXML_planimetric();
  parsingEllipsesRelaXML_planimetric();
  parsingRectanglesXML_planimetric();
  parsingRectanglesRelaXML_planimetric();
  parsingGNSS_planimetric();
  parsingObsCoord_planimetric();
  parsingVectXML_planimetric();
  fiabLocale_planimetric();
  normedResidualsWi_planimetric();


  //-------------------------------- Abriss altimétrique
  parsingVisees_altimetric();
  layerObservationsTerrestres_altimetric();
  parsingGNSS_altimetric();
  parsingObsCoord_altimetric();
  parsingEllipsesXML_altimetric();
  parsingEllipsesRelaXML_altimetric();
  parsingRectanglesXML_altimetric();
  parsingRectanglesRelaXML_altimetric();
  fiabLocale_altimetric();
  normedResidualsWi_altimetric();
  parsingVectXML_altimetric();
  // Activer les boutons altimetriques
  altimetricActivateCheckBox();

  // Dire à l'utilisateur que l'import s'est bien effectué
  document.getElementById("outputTest").textContent = "Import effectué ✓";
}
