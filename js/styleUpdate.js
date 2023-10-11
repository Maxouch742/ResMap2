function styleUpdate(layer, temp) {

    switch (layer) {
        case 'planiPtsF':
            if (temp){
                tempLayerPts.setStyle( function(feature) {
                    stylePtsF.getText().setText(feature.getId());
                    return stylePtsF;
                });
            }
            else {
                planiPtsF_layer.setStyle( function(feature) {
                    stylePtsF.getText().setText(feature.getId());
                    return stylePtsF;
                });
            };            
            break;
        case 'planiPtsN':
            if (temp){
                tempLayerPts.setStyle( function(feature) {
                    stylePtsN_plani.getText().setText(feature.getId());
                    return stylePtsN_plani;
                });
            }
            else {
                planiPtsN_layer.setStyle( function(feature) {
                    stylePtsN_plani.getText().setText(feature.getId());
                    return stylePtsN_plani;
                });
            };
            break;
        case 'planiEll':
            if (temp){
                tempLayerEll.setStyle( function (feature) { 
                    styleEllipse.getText().setText(feature.get("properties")); 
                    return styleEllipse;
                });
            }
            else {
                planiEll_layer.setStyle( function (feature) { 
                    styleEllipse.getText().setText(feature.get("properties")); 
                    return styleEllipse;
                });
            };
            break;
        case 'planiRect':
            if (temp){
                tempLayerRect.setStyle( function(feature) {
                    styleRectangle.getText().setText(feature.get("properties"));
                    return styleRectangle;
                });
            }
            else {
                planiRect_layer.setStyle( function(feature) {
                    styleRectangle.getText().setText(feature.get("properties"));
                    return styleRectangle;
                })
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