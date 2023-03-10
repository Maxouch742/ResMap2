// Compte global du nombre d'observations supprimées
nbObsSuppr = 0

// Import du fichier .PRNx (ajout d'écouteur d'événement sur le "change" du open-folder)
document.getElementById('inputfile').addEventListener('change', function() {

    // Récupération du nom de fichier PRNx
    fileName = document.getElementById('inputfile').files[0]

    // Lecture du contenu du fichier PRNx et appel des fonctions de parsing et création d'entités
    let fr = new FileReader();
    fr.onload=function() {
        xmlToParse = fr.result;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlToParse,"text/xml");
        parsingPointsXML(xmlToParse);
        centerViewOnProject();
        // CHANGER ECHELLE ELLIPSES ET RECTANGLES PAR DEFAULT CI-DESSSOUS 
        echelleEllipses = 1000.0

        
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
        // Activer les boutons
        altimetricActivateCheckBox();


        // Dire à l'utilisateur que l'import s'est bien effectué
        document.getElementById("outputTest").textContent = "Import effectué ✓";

    };
    fr.readAsText(fileName);
});
      