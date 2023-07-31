function htmlAddCheckboxResiPlani_Dir(){

    const div = document.getElementById("wi_plani_direction");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_Dir" onchange="changeLayerVisibility('plani_resi_dir')">`
                  + `<label class="checkboxLabel" for="checkboxResi_Dir" style="margin-left:5px;">Directions</label>`

}