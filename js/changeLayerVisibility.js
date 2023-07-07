function changeLayerVisibility(item){

    switch (item){

        case 'plani_ptsF':
            if (document.getElementById('checkboxPtsF').checked === true){
                planiPtsF_layer.setVisible(true);
            } else {
                planiPtsF_layer.setVisible(false);
            }
            break;
        case 'plani_ptsN':
            if (document.getElementById('checkboxPtsN').checked === true){
                planiPtsN_layer.setVisible(true);
            } else {
                planiPtsN_layer.setVisible(false);
            }
            break;
        case 'plani_GNSS':
            if (document.getElementById('checkboxGNSS').checked === true){
                planiGNSS_layer.setVisible(true);
            } else {
                planiGNSS_layer.setVisible(false);
            }
            break;
    }
}