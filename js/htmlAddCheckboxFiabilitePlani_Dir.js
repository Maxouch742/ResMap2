function htmlAddCheckboxFiabilitePlani_Dir(){
    
    const div = document.getElementById('zi_plani_direction');
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_Dir" onchange="changeLayerVisibility('plani_fiabLoc_dir')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_Dir" style="margin-left:5px;">Directions</label>`

}