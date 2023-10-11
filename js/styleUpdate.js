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
                tempLayerPts_alti.setStyle( function(feature) {
                    stylePtsF.getText().setText(feature.getId());
                    return stylePtsF;
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
                tempLayerPts_alti.setStyle( function(feature) {
                    stylePtsN_alti.getText().setText(feature.getId());
                    return stylePtsN_alti;
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