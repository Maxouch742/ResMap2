function styleUpdate(layer, temp) {

    switch (layer) {
        case 'planiPtsF':
            planiPtsF_layer.setStyle( function(feature) {
                stylePtsF.getText().setText(feature.getId());
                return stylePtsF;
            });
            if (temp){
                tempLayerPts.setStyle( function(feature) {
                    stylePtsF.getText().setText(feature.getId());
                    return stylePtsF;
                });
            };
            break;
        case 'planiPtsN':
            planiPtsN_layer.setStyle( function(feature) {
                stylePtsN_plani.getText().setText(feature.getId());
                return stylePtsN_plani;
            });
            if (temp){
                tempLayerPts.setStyle( function(feature) {
                    stylePtsN_plani.getText().setText(feature.getId());
                    return stylePtsN_plani;
                });
            };
            break;
        case 'altiPtsN':
            altiPtsF_layer.setStyle( function(feature) {
                stylePtsF.getText().setText(feature.getId());
                return stylePtsF;
            });  
            break;
        case 'altiPtsN':
            altiPtsN_layer.setStyle( function(feature) {
                stylePtsN_alti.getText().setText(feature.getId());
                return stylePtsN_alti;
            });
            break;
    }
}