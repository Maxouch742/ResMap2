function styleUpdate(layer, temp = false) {

    switch (layer) {
        case 'planiPtsF':
            if (temp){
                planiPtsF_layer.setStyle( function(feature) {
                    stylePtsF_filter.getText().setText(feature.getId());
                    return stylePtsF_filter;
                });
            } else {
                planiPtsF_layer.setStyle( function(feature) {
                    stylePtsF.getText().setText(feature.getId());
                    return stylePtsF;
                });
            };            
            break;
        case 'planiPtsN':
            if (temp){
                planiPtsN_layer.setStyle( function(feature) {
                    stylePtsN_plani_filter.getText().setText(feature.getId());
                    return stylePtsN_plani_filter;
                });
            } else {
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
        case 'planiVect':
            if (temp){
                tempLayerVect.setStyle( function(feature) {
                    styleVecteur.getText().setText(feature.get("properties"));
                    return styleVecteur;
                });
            }
            else {
                planiVect_layer.setStyle( function(feature) {
                    styleVecteur.getText().setText(feature.get("properties"));
                    return styleVecteur;
                })
            };
            break;
        
        case 'altiPtsF':
            if (temp){
                altiPtsF_layer.setStyle( function(feature) {
                    stylePtsF_filter.getText().setText(feature.getId());
                    return stylePtsF_filter;
                })
            }
            else {
                altiPtsF_layer.setStyle( function(feature) {
                    stylePtsF.getText().setText(feature.getId());
                    return stylePtsF;
                }); 
            };
            break;
        case 'altiPtsN':
            if (temp){
                altiPtsN_layer.setStyle( function(feature) {
                    stylePtsN_alti_filter.getText().setText(feature.getId());
                    return stylePtsN_alti_filter;
                });
            }
            else {
                altiPtsN_layer.setStyle( function(feature) {
                    stylePtsN_alti.getText().setText(feature.getId());
                    return stylePtsN_alti;
                });
            };
            break;
        case 'altiEll':
            if (temp){
                tempLayerEll_alti.setStyle( function (feature) { 
                    altiEll_featureStyle.getText().setText(feature.get("properties")); 
                    return altiEll_featureStyle;
                });
            }
            else {
                altiEll_layer.setStyle( function (feature) { 
                    altiEll_featureStyle.getText().setText(feature.get("properties")); 
                    return altiEll_featureStyle;
                });
            };
            break;
        case 'altiRect':
            if (temp){
                tempLayerRect_alti.setStyle( function (feature) { 
                    altiRect_featureStyle.getText().setText(feature.get("properties")); 
                    return altiRect_featureStyle;
                });
            }
            else {
                altiRect_layer.setStyle( function (feature) { 
                    altiRect_featureStyle.getText().setText(feature.get("properties")); 
                    return altiRect_featureStyle;
                });
            };
            break;
        case 'altiVect':
            if (temp){
                tempLayerVect_alti.setStyle( function(feature) {
                    styleVecteur.getText().setText(feature.get("properties"));
                    return styleVecteur;
                });
            }
            else {
                altiVect_layer.setStyle( function(feature) {
                    styleVecteur.getText().setText(feature.get("properties"));
                    return styleVecteur;
                })
            };
            break;
    }
}