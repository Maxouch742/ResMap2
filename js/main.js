// Compte global du nombre d'observations supprimées
nbObsSuppr = 0

// Nom et chemin du fichier
fileName = false;

// Définition de l'adresse URL pour le script python
let url = $('#server-url').val();
url = 'http://localhost:8000';


function readFile(xmlcontent){
    // Supprimer les couches déjà existants (utile dans le cas d'un rappel sur le bouton)
    initializeLayers();
    console.log("Layers initialisés");

    // Récupération du nom de fichier PRNx
    fileName = document.getElementById('inputfile').files[0]
    console.log("Fichier :",fileName);

    // Lecture du contenu du fichier PRNx et appel des fonctions de parsing et création d'entités
    let fr = new FileReader();
    console.log("Fr :",fr);
    fr.onload = function(){

        console.log("Début des layers");
        
        xmlToParse = fr.result;
        parser = new DOMParser();
        console.log(parser);
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

        console.log("Fin des layers");

        // Dire à l'utilisateur que l'import s'est bien effectué
        document.getElementById("outputTest").textContent = "Import effectué ✓";
    }
    fr.error = function(){
        console.log("ERREUR DE MERDE");
    };
    console.log("ok");
    fr.readAsText(fileName);
    console.log("2707");
    console.log(fr.result);
}

/*
// Import du fichier .PRNx (ajout d'écouteur d'événement sur le "change" du open-folder)
document.getElementById('inputfile').addEventListener('change', function() {

    // Supprimer les couches déjà existants (utile dans le cas d'un rappel sur le bouton)
    initializeLayers();

    // Récupération du nom de fichier PRNx
    fileName = document.getElementById('inputfile').files[0]

    // Lecture du contenu du fichier PRNx et appel des fonctions de parsing et création d'entités
    let fr = new FileReader();
    fr.onload = function(){
        
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
    }
    fr.readAsText(fileName);
});
*/