function htmlAddCheckboxFiabiliteAlti(observation){

    let div;

    switch (observation) {
        case 'dh':
            div = document.getElementById("zi_altitude_DH");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_DH_alti" onchange="changeLayerVisibility('alti_fiabLoc_DH')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_DH_alti" style="margin-left:5px">ZI/ Obs. DH</label>`;
            break;
        case 'gnss':
            div = document.getElementById("zi_altitude_GNSS");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_GNSS_alti" onchange="changeLayerVisibility('alti_fiabLoc_GNSS')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_GNSS_alti" style="margin-left:5px">ZI/ Session GNSS</label>`;
            break;
        case 'coord_H':
            div = document.getElementById("zi_altitude_coordH");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_Coord_alti" onchange="changeLayerVisibility('alti_fiabLoc_coord')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_Coord_alti" style="margin-left:5px">ZI/ Coordonnée H</label>`;
            break;
    }
}