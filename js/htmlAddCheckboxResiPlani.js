function htmlAddCheckboxResiPlani(observation){

    let div;

    switch (observation){

        case 'direction':
            div = document.getElementById("wi_plani_direction");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_Dir" onchange="changeLayerVisibility('plani_resi_dir')">`
                          + `<label class="checkboxLabel" for="checkboxResi_Dir" style="margin-left:5px;">WI/ Directions</label>`
            break;
        case 'distance':
            div = document.getElementById("wi_plani_distance");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_Dis" onchange="changeLayerVisibility('plani_resi_dis')">`
                          + `<label class="checkboxLabel" for="checkboxResi_Dis" style="margin-left:5px;">WI/ Distances</label>`;
            break;
        case 'gnss':
            div = document.getElementById("wi_plani_gnss");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_GNSS" onchange="changeLayerVisibility('plani_resi_GNSS')">`
                          + `<label class="checkboxLabel" for="checkboxResi_GNSS" style="margin-left:5px;">WI/ Session GNSS</label>`;
            break;
        case 'coord_E':
            div = document.getElementById("wi_plani_coordE");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_CoordE" onchange="changeLayerVisibility('plani_resi_coordE')">`
                        + `<label class="checkboxLabel" for="checkboxResi_CoordE" style="margin-left:5px;">WI/ Coordonnée Est</label>`;
            break;
        case 'coord_N':
            div = document.getElementById("wi_plani_coordN");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_CoordN" onchange="changeLayerVisibility('plani_resi_coordN')">`
                          + `<label class="checkboxLabel" for="checkboxResi_CoordN" style="margin-left:5px;">WI/ Coordonnée Nord</label>`;
            break;
    }
}