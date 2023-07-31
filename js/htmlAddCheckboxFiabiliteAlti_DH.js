function htmlAddCheckboxFiabiliteAlti_DH(){
    
    document.getElementById("altitude_zi").disabled = false;
    const div = document.getElementById("zi_altitude_DH");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_DH_alti" onchange="changeLayerVisibility('alti_fiabLoc_DH')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_DH_alti" style="margin-left:5px">Obs. DH</label>`;
    
}