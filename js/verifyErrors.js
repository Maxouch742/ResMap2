function verifyErrors(xml){

    // Chercher la présence d'erreurs dans le PRNx
    const error = xml.getElementsByTagName("LTOPError");
    if (error.length >= 1){
        let error_string = "";
        for (let i=0;i<error.length;++i){
            const code = error[i].getAttribute("code");
            error_string += "-> "
            error_string += code;
            error_string += " ;\n";
        }

        alert("Le calcul n'a pas été exécuté correctement!\nLTOP retourne les erreurs suivantes :\n" + error_string);
    }
}