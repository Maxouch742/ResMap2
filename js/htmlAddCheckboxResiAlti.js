function htmlAddCheckboxResiAlti(observation){

    let div;

    switch (observation) {
        case 'dh':
            div = document.getElementById("wi_altitude_DH");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_DH_alti" onchange="changeLayerVisibility('alti_resi_DH')">`
                        + `<label class="checkboxLabel" for="checkboxResi_DH_alti" style="margin-left:5px">WI/ Obs. DH</label>`;
            break;
        case 'gnss':
            div = document.getElementById("wi_altitude_GNSS");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_GNSS_alti" onchange="changeLayerVisibility('alti_resi_GNSS')">`
                        + `<label class="checkboxLabel" for="checkboxResi_GNSS_alti" style="margin-left:5px;">WI/ Session GNSS</label>`;
            break;
        case 'coord_H':
            div = document.getElementById("wi_altitude_coordH");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_Coord_alti" onchange="changeLayerVisibility('alti_resi_coord')">`
                          + `<label class="checkboxLabel" for="checkboxResi_Coord_alti" style="margin-left:5px">WI/ Coordonnée H</label>`;
            break;
    }
}