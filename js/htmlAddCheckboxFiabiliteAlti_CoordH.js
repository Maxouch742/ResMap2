function htmlAddCheckboxFiabiliteAlti_CoordH(){

    const div = document.getElementById("zi_altitude_coordH");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_Coord_alti" onchange="changeLayerVisibility('alti_fiabLoc_coord')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_Coord_alti">Coordonnée H</label>`;
    
}