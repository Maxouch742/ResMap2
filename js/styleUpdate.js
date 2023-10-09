function styleUpdate(layer) {

    switch (layer) {
        case 'planiPtsF':
            planiPtsF_layer.setStyle( function(feature) {
                stylePtsF.getText().setText(feature.getId());
                return stylePtsF;
            });
            break;
        case 'planiPtsN':
            planiPtsN_layer.setStyle( function(feature) {
                stylePtsN.getText().setText(feature.getId());
                return stylePtsN;
            });
            break;
    }
}