function htmlAddCheckboxObservationsAlti(item){

    let div;
    switch (item){

        case 'dh':
            div = document.getElementById("obs_altitude_DH");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxDH_alti" onchange="changeLayerVisibility('alti_DH')">`
                        + `<label class="checkboxLabel" for="checkboxDH_alti" style="margin-left:5px">Obs. DH</label>`;
            break;
        
        case 'gnss':
            div = document.getElementById("obs_altitude_GNSS");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxGNSS_alti" onchange="changeLayerVisibility('alti_GNSS')">`
                        + `<label class="checkboxLabel" for="checkboxGNSS_alti" style="margin-left:5px">Obs. GNSS</label>`;
            break;
        
        case 'coord_H':
            div = document.getElementById("obs_altitude_coordH");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxCoordH_alti" onchange="changeLayerVisibility('alti_coordH')">`
                        + `<label class="checkboxLabel" for="checkboxCoordH_alti" style="margin-left:5px">Obs. coordonnée H</label>`;
            break;
                  
    }
}