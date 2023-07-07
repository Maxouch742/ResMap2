function changeLayerVisibility(item){

    switch (item){

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
    }
}