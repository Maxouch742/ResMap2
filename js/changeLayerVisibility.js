function changeLayerVisibility(item){

    switch (item){

        case 'plani_affich':
            if (document.getElementById('checkboxAffich').checked === true) {
                document.getElementById('checkboxAffich').checked = false;
                
                document.getElementById('checkboxPtsF').checked = false;
                changeLayerVisibility('plani_ptsF');
                document.getElementById('checkboxPtsN').checked = false;
                changeLayerVisibility('plani_ptsN');

                if (document.getElementById('checkboxDir') !== null) {
                    document.getElementById('checkboxDir').checked = false;
                    changeLayerVisibility('plani_dir');
                };
                if (document.getElementById('checkboxDis') !== null) {
                    document.getElementById('checkboxDis').checked = false;
                    changeLayerVisibility('plani_dis');
                };
                if (document.getElementById('checkboxGNSS') !== null) {
                    document.getElementById('checkboxGNSS').checked = false;
                    changeLayerVisibility('plani_GNSS');
                };
                if (document.getElementById('checkboxCoordE') !== null) {
                    document.getElementById('checkboxCoordE').checked = false;
                    changeLayerVisibility('plani_coordE');
                };
                if (document.getElementById('checkboxCoordN') !== null) {
                    document.getElementById('checkboxCoordN').checked = false;
                    changeLayerVisibility('plani_coordN');
                };
                
                document.getElementById('checkboxEll').checked = false;
                changeLayerVisibility('plani_ell');
                if (document.getElementById('checkboxEllRel') !== null) {
                    document.getElementById('checkboxEllRel').checked = false;
                    changeLayerVisibility('plani_ellRel');
                };
                document.getElementById('checkboxRect').checked = false;
                changeLayerVisibility('plani_rect');
                if (document.getElementById('checkboxRectRel') !== null) {
                    document.getElementById('checkboxRectRel').checked = false;
                    changeLayerVisibility('plani_rectRel');
                };

                if (document.getElementById('checkboxFiabLoc_Dir') !== null) {
                    document.getElementById('checkboxFiabLoc_Dir').checked = false;
                    changeLayerVisibility('plani_fiabLoc_dir');
                };
                if (document.getElementById('checkboxFiabLoc_Dis') !== null) {
                    document.getElementById('checkboxFiabLoc_Dis').checked = false;
                    changeLayerVisibility('plani_fiabLoc_dis');
                };
                if (document.getElementById('checkboxFiabLoc_GNSS') !== null) {
                    document.getElementById('checkboxFiabLoc_GNSS').checked = false;
                    changeLayerVisibility('plani_fiabLoc_GNSS');
                };
                if (document.getElementById('checkboxFiabLoc_CoordE') !== null) {
                    document.getElementById('checkboxFiabLoc_CoordE').checked = false;
                    changeLayerVisibility('plani_fiabLoc_coordE');
                };
                if (document.getElementById('checkboxFiabLoc_CoordN') !== null) {
                    document.getElementById('checkboxFiabLoc_CoordN').checked = false;
                    changeLayerVisibility('plani_fiabLoc_coordN');
                };

                if (document.getElementById('checkboxResi_Dir') !== null) {
                    document.getElementById('checkboxResi_Dir').checked = false;
                    changeLayerVisibility('plani_resi_dir');
                };
                if (document.getElementById('checkboxResi_Dis') !== null) {
                    document.getElementById('checkboxResi_Dis').checked = false;
                    changeLayerVisibility('plani_resi_dis');
                };
                if (document.getElementById('checkboxResi_GNSS') !== null) {
                    document.getElementById('checkboxResi_GNSS').checked = false;
                    changeLayerVisibility('plani_resi_GNSS');
                };
                if (document.getElementById('checkboxResi_CoordE') !== null) {
                    document.getElementById('checkboxResi_CoordE').checked = false;
                    changeLayerVisibility('plani_resi_coordE');
                };
                if (document.getElementById('checkboxResi_CoordN') !== null) {
                    document.getElementById('checkboxResi_CoordN').checked = false;
                    changeLayerVisibility('plani_resi_coordN');
                };

                document.getElementById('checkboxVect').checked = false;
                changeLayerVisibility('plani_vect');                
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
        case 'plani_dir':
            if (document.getElementById('checkboxDir').checked === true){
                planiDir_layer.setVisible(true);
            } else {
                planiDir_layer.setVisible(false);
            };
            break;
        case 'plani_dis':
            if (document.getElementById('checkboxDis').checked === true){
                planiDis_layer.setVisible(true);
            } else {
                planiDis_layer.setVisible(false);
            };
            break;
        case 'plani_GNSS':
            if (document.getElementById('checkboxGNSS').checked === true){
                planiGNSS_layer.setVisible(true);
            } else {
                planiGNSS_layer.setVisible(false);
            };
            break;
        case 'plani_coordE':
            if (document.getElementById('checkboxCoordE').checked === true){
                planiCoordE_layer.setVisible(true);
            } else {
                planiCoordE_layer.setVisible(false);
            };
            break;
        case 'plani_coordN':
            if (document.getElementById('checkboxCoordN').checked === true){
                planiCoordN_layer.setVisible(true);
            } else {
                planiCoordN_layer.setVisible(false);
            };
            break;
        case 'plani_ell':
            if (document.getElementById('checkboxEll').checked === true){
                planiEll_layer.setVisible(true);
            } else {
                planiEll_layer.setVisible(false);
            };
            break;
        case 'plani_ellRel':
            if (document.getElementById('checkboxEllRel').checked === true){
                planiEllRel_layer.setVisible(true);
            } else {
                planiEllRel_layer.setVisible(false);
            };
            break;
        case 'plani_rect':
            if (document.getElementById('checkboxRect').checked === true) {
                planiRect_layer.setVisible(true);
            } else {
                planiRect_layer.setVisible(false);
            };
            break;
        case 'plani_rectRel':
            if (document.getElementById('checkboxRectRel').checked === true) {
                planiRectRel_layer.setVisible(true);
            } else {
                planiRectRel_layer.setVisible(false);
            };
            break;
        case 'plani_fiabLoc_dir':
            if (document.getElementById('checkboxFiabLoc_Dir').checked === true){
                planiFiabLocDir_layer.setVisible(true);
            } else {
                planiFiabLocDir_layer.setVisible(false);
            };
            break;
        case 'plani_fiabLoc_dis':
            if (document.getElementById('checkboxFiabLoc_Dis').checked === true){
                planiFiabLocDis_layer.setVisible(true);
            } else {
                planiFiabLocDis_layer.setVisible(false);
            };
            break;
        case 'plani_fiabLoc_GNSS':
            if (document.getElementById('checkboxFiabLoc_GNSS').checked === true){
                planiFiabLocGNSS_layer.setVisible(true);
            } else {
                planiFiabLocGNSS_layer.setVisible(false);
            };
            break;
        case 'plani_fiabLoc_coordE':
            if (document.getElementById('checkboxFiabLoc_CoordE').checked === true){
                planiFiabLocCoordE_layer.setVisible(true);
            } else {
                planiFiabLocCoordE_layer.setVisible(false);
            };
            break;
        case 'plani_fiabLoc_coordN':
            if (document.getElementById('checkboxFiabLoc_CoordN').checked === true){
                planiFiabLocCoordN_layer.setVisible(true);
            } else {
                planiFiabLocCoordN_layer.setVisible(false);
            };
            break;
        case 'plani_resi_dir':
            if (document.getElementById('checkboxResi_Dir').checked === true){
                planiResiDir_layer.setVisible(true);
            } else {
                planiResiDir_layer.setVisible(false);
            };
            break;
        case 'plani_resi_dis':
            if (document.getElementById('checkboxResi_Dis').checked === true){
                planiResiDis_layer.setVisible(true);
            } else {
                planiResiDis_layer.setVisible(false);
            };
            break;
        case 'plani_resi_GNSS':
            if (document.getElementById('checkboxResi_GNSS').checked === true){
                planiResiGNSS_layer.setVisible(true);
            } else {
                planiResiGNSS_layer.setVisible(false);
            };
            break;
        case 'plani_resi_coordE':
            if (document.getElementById('checkboxResi_CoordE').checked === true){
                planiResiCoordE_layer.setVisible(true);
            } else {
                planiResiCoordE_layer.setVisible(false);
            };
            break;
        case 'plani_resi_coordN':
            if (document.getElementById('checkboxResi_CoordN').checked === true){
                planiResiCoordN_layer.setVisible(true);
            } else {
                planiResiCoordN_layer.setVisible(false);
            };
            break;
        case 'plani_vect':
            if (document.getElementById('checkboxVect').checked === true){
                planiVect_layer.setVisible(true);
            } else {
                planiVect_layer.setVisible(false);
            };
            break;
        
        case 'alti_affich':
            if (document.getElementById('checkboxAffich_alti').checked === true) {
                document.getElementById('checkboxAffich_alti').checked = false;
                
                document.getElementById('checkboxPtsF_alti').checked = false;
                changeLayerVisibility('alti_ptsF');
                document.getElementById('checkboxPtsN_alti').checked = false;
                changeLayerVisibility('alti_ptsN');

                if (document.getElementById('checkboxDH_alti') !== null){
                    document.getElementById('checkboxDH_alti').checked = false;
                    changeLayerVisibility('alti_DH');
                };
                if (document.getElementById('checkboxGNSS_alti') !== null){
                    document.getElementById('checkboxGNSS_alti').checked = false;
                    changeLayerVisibility('alti_GNSS');
                };
                if (document.getElementById('checkboxCoordH_alti') !== null){
                    document.getElementById('checkboxCoordH_alti').checked = false;
                    changeLayerVisibility('alti_coordH');
                };
                
                document.getElementById('checkboxEll_alti').checked = false;
                changeLayerVisibility('alti_ell');
                if (document.getElementById('checkboxEllRel_alti') !== null){
                    document.getElementById('checkboxEllRel_alti').checked = false;
                    changeLayerVisibility('alti_ellRel');
                };

                document.getElementById('checkboxRect_alti').checked = false;
                changeLayerVisibility('alti_rect');
                if (document.getElementById('checkboxRectRel_alti') !== null){
                    document.getElementById('checkboxRectRel_alti').checked = false;
                    changeLayerVisibility('alti_rectRel');
                };

                if (document.getElementById('checkboxFiabLoc_GNSS_alti') !== null){
                    document.getElementById('checkboxFiabLoc_GNSS_alti').checked = false;
                    changeLayerVisibility('alti_fiabLoc_GNSS');
                };
                if (document.getElementById('checkboxFiabLoc_DH_alti') !== null){
                    document.getElementById('checkboxFiabLoc_DH_alti').checked = false;
                    changeLayerVisibility('alti_fiabLoc_DH');
                };
                if (document.getElementById('checkboxFiabLoc_Coord_alti') !== null){
                    document.getElementById('checkboxFiabLoc_Coord_alti').checked = false;
                    changeLayerVisibility('alti_fiabLoc_coord');
                };

                if (document.getElementById('checkboxResi_GNSS_alti') !== null){
                    document.getElementById('checkboxResi_GNSS_alti').checked = false;
                    changeLayerVisibility('alti_resi_GNSS');
                };
                if (document.getElementById('checkboxResi_DH_alti') !== null){
                    document.getElementById('checkboxResi_DH_alti').checked = false;
                    changeLayerVisibility('alti_resi_DH');
                };

                if (document.getElementById('checkboxVect_alti') !== null){
                    document.getElementById('checkboxVect_alti').checked = false;
                    changeLayerVisibility('alti_vect');
                };

                if (document.getElementById('checkboxResi_Coord_alti') !== null){
                    document.getElementById('checkboxResi_Coord_alti').checked = false;
                    changeLayerVisibility('alti_resi_coord');
                };
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
            };
            break;
        case 'alti_GNSS':
            if (document.getElementById('checkboxGNSS_alti').checked === true){
                altiGNSS_layer.setVisible(true);
            } else {
                altiGNSS_layer.setVisible(false);
            };
            break;
        case 'alti_coordH':
            if (document.getElementById('checkboxCoordH_alti').checked === true){
                altiCoordH_layer.setVisible(true);
            } else {
                altiCoordH_layer.setVisible(false);
            };
            break;
        case 'alti_ell':
            if (document.getElementById('checkboxEll_alti').checked === true){
                altiEll_layer.setVisible(true);
            } else {
                altiEll_layer.setVisible(false);
            };
            break;
        case 'alti_ellRel':
            if (document.getElementById('checkboxEllRel_alti').checked === true){
                altiEllRel_layer.setVisible(true);
            } else {
                altiEllRel_layer.setVisible(false);
            };
            break;
        case 'alti_rect':
            if (document.getElementById('checkboxRect_alti').checked === true){
                altiRect_layer.setVisible(true);
            } else {
                altiRect_layer.setVisible(false);
            };
            break;
        case 'alti_rectRel':
            if (document.getElementById('checkboxRectRel_alti').checked === true){
                altiRectRel_layer.setVisible(true);
            } else {
                altiRectRel_layer.setVisible(false);
            };
            break;
        case 'alti_fiabLoc_GNSS':
            if (document.getElementById('checkboxFiabLoc_GNSS_alti').checked === true){
                altiFiabLocGNSS_layer.setVisible(true);
            } else {
                altiFiabLocGNSS_layer.setVisible(false);
            };
            break;
        case 'alti_fiabLoc_DH':
            if (document.getElementById('checkboxFiabLoc_DH_alti').checked === true){
                altiFiabLocDH_layer.setVisible(true);
            } else {
                altiFiabLocDH_layer.setVisible(false);
            };
            break;
        case 'alti_fiabLoc_coord':
            if (document.getElementById('checkboxFiabLoc_Coord_alti').checked === true){
                altiFiabLocCoordH_layer.setVisible(true);
            } else {
                altiFiabLocCoordH_layer.setVisible(false);
            };
            break;
        case 'alti_resi_GNSS':
            if (document.getElementById('checkboxResi_GNSS_alti').checked === true){
                altiResiGNSS_layer.setVisible(true);
            } else {
                altiResiGNSS_layer.setVisible(false);
            };
            break;
        case 'alti_resi_DH':
            if (document.getElementById('checkboxResi_DH_alti').checked === true){
                altiResiDH_layer.setVisible(true);
            } else {
                altiResiDH_layer.setVisible(false);
            };
            break;
        case 'alti_vect':
            if (document.getElementById('checkboxVect_alti').checked === true){
                altiVect_layer.setVisible(true);
            } else {
                altiVect_layer.setVisible(false);
            };
            break;
        case 'alti_resi_coord':
            if (document.getElementById('checkboxResi_Coord_alti').checked === true){
                altiResiCoordH_layer.setVisible(true);
            } else {
                altiResiCoordH_layer.setVisible(false);
            };
            break;
    }
}