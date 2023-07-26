function htmlAddCheckboxResiAlti_CoordH() {
    
    document.getElementById("altitude_wi").disabled = false;
    const div = document.getElementById("wi_altitude_coordH");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_Coord_alti" onchange="changeLayerVisibility('alti_resi_coord')">`
                  + `<label class="checkboxLabel" for="checkboxResi_Coord_alti" style="margin-left:5px">Coordonnée H</label>`

}