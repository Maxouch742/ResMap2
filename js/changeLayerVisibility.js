function changeLayerVisibility(item){

    switch (item){

        case 'plani_affich':
            if (document.getElementById('labelAffich').textContent == 'Tout supprimer'){
                // Décocher la case
                //document.getElementById('labelAffich').checked = false;

                // Changer le texte du bouton
                document.getElementById('labelAffich').textContent = 'Tout afficher';
                
                // Décocher les cases
                document.getElementById('checkboxPtsF').checked = false;
                document.getElementById('checkboxPtsN').checked = false;
                document.getElementById('checkboxGNSS').checked = false;
                document.getElementById('checkboxDir').checked = false;
                document.getElementById('checkboxDis').checked = false;

                // Désafficher les couches
                changeLayerVisibility('plani_ptsF');
                changeLayerVisibility('plani_ptsN');
                changeLayerVisibility('plani_GNSS');
                changeLayerVisibility('plani_Dir');
                changeLayerVisibility('plani_Dis');
            } else if (document.getElementById('labelAffich').textContent == 'Tout afficher'){
                // Décocher la case
                //document.getElementById('labelAffich').checked = false;

                // Changer le texte du bouton
                document.getElementById('labelAffich').textContent = 'Tout supprimer';
                
                // Cocher les cases
                document.getElementById('checkboxPtsF').checked = true;
                document.getElementById('checkboxPtsN').checked = true;
                document.getElementById('checkboxGNSS').checked = true;
                document.getElementById('checkboxDir').checked = true;
                document.getElementById('checkboxDis').checked = true;
            };
            break;
        case 'plani_ptsF':
            if (document.getElementById('checkboxPtsF').checked === true){
                planiPtsF_layer.setVisible(true);
            } else {
                planiPtsF_layer.setVisible(false);
            };
            break;
        case 'plani_ptsN':
            if (document.getElementById('checkboxPtsN').checked === true){
                planiPtsN_layer.setVisible(true);
            } else {
                planiPtsN_layer.setVisible(false);
            };
            break;
        case 'plani_GNSS':
            if (document.getElementById('checkboxGNSS').checked === true){
                planiGNSS_layer.setVisible(true);
            } else {
                planiGNSS_layer.setVisible(false);
            };
            break;
        case 'plani_Dir':
            if (document.getElementById('checkboxDir').checked === true){
                planiDir_layer.setVisible(true);
            } else {
                planiDir_layer.setVisible(false);
            };
            break;
        case 'plani_Dis':
            if (document.getElementById('checkboxDis').checked === true){
                planiDis_layer.setVisible(true);
            } else {
                planiDis_layer.setVisible(false);
            };
            break;
        case 'alti_ptsF':
            if (document.getElementById('checkboxPtsF_alti').checked === true){
                altiPtsF_layer.setVisible(true);
            } else {
                altiPtsF_layer.setVisible(false);
            };
            break;
        case 'alti_ptsN':
            if (document.getElementById('checkboxPtsN_alti').checked === true){
                altiPtsN_layer.setVisible(true);
            } else {
                altiPtsN_layer.setVisible(false);
            };
            break;
        case 'alti_DH':
            if (document.getElementById('checkboxDH_alti').checked === true){
                altiDH_layer.setVisible(true);
            } else {
                altiDH_layer.setVisible(false);
            }
        case 'alti_GNSS':
            if (document.getElementById('checkboxGNSS_alti').checked === true){
                altiGNSS_layer.setVisible(true);
            } else {
                altiGNSS_layer.setVisible(false);
            }
    }
}