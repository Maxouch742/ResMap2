function htmlAddCheckboxFiabilitePlani(observation){

    let div;

    switch (observation) {

        case 'direction':
            div = document.getElementById('zi_plani_direction');
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_Dir" onchange="changeLayerVisibility('plani_fiabLoc_dir')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_Dir" style="margin-left:5px;">ZI/ Directions</label>`;
            break;
        case 'distance':
            div = document.getElementById("zi_plani_distance");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_Dis" onchange="changeLayerVisibility('plani_fiabLoc_dis')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_Dis" style="margin-left:5px;">ZI/ Distances</label>`;
            break;
        case 'gnss':
            div = document.getElementById("zi_plani_gnss");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_GNSS" onchange="changeLayerVisibility('plani_fiabLoc_GNSS')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_GNSS" style="margin-left:5px;">ZI/ Session GNSS</label>`;
            break;
        case 'coord_E':
            div = document.getElementById("zi_plani_coordE");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_CoordE" onchange="changeLayerVisibility('plani_fiabLoc_coordE')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_CoordE" style="margin-left:5px;">ZI/ Coordonnée E.</label>`;
            break;
        case 'coord_N':
            div = document.getElementById("zi_plani_coordN");
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_CoordN" onchange="changeLayerVisibility('plani_fiabLoc_coordN')">`
                          + `<label class="checkboxLabel" for="checkboxFiabLoc_CoordN" style="margin-left:5px;">ZI/ Coordonnée N.</label>`;
            break;
    }

    
}