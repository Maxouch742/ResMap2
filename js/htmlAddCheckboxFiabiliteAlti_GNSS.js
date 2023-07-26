function htmlAddCheckboxFiabiliteAlti_GNSS(){
    
    document.getElementById("altitude_zi").disabled = false;
    const div = document.getElementById("zi_altitude_GNSS");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_GNSS_alti" onchange="changeLayerVisibility('alti_fiabLoc_GNSS')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_GNSS_alti" style="margin-left:5px">Session GNSS</label>`;
    
}