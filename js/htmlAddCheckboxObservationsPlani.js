function htmlAddCheckboxObservationsPlani(item) {

    let div;

    switch( item ){

        case 'dir':
            div = document.getElementById("obs_plani_dir");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxDir" onchange="changeLayerVisibility('plani_dir')">`
                        + `<label class="checkboxLabel" for="checkboxDir" style="margin-left:5px;">Obs. Directions</label>`;
            break;
        
        case 'dis':
            div = document.getElementById("obs_plani_dis");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxDis" onchange="changeLayerVisibility('plani_dis')">`
                        + `<label class="checkboxLabel" for="checkboxDis" style="margin-left:5px;">Obs. Distances</label>`;
            break;
        
        case 'gnss':
            div = document.getElementById("obs_plani_GNSS");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxGNSS" onchange="changeLayerVisibility('plani_GNSS')">`
                        + `<label class="checkboxLabel" for="checkboxGNSS" style="margin-left:5px;">Obs. Session GNSS</label>`;
            break;

        case 'coord_E':
            div = document.getElementById("obs_plani_coordE");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxCoordE" onchange="changeLayerVisibility('plani_coordE')">`
                          + `<label class="checkboxLabel" for="checkboxCoordE" style="margin-left:5px;">Obs. coordonnée Est (axe Y)</label>`;
            break;
        
        case 'coord_N':
            div = document.getElementById("obs_plani_coordN");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxCoordN" onchange="changeLayerVisibility('plani_coordN')">`
                        + `<label class="checkboxLabel" for="checkboxCoordN" style="margin-left:5px;">Obs. coordonnée Nord (axe X)</label>`;
            break;
        
    }
}