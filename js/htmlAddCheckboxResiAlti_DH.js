function htmlAddCheckboxResiAlti_DH(){
    
    document.getElementById("altitude_wi").disabled = false;
    const div = document.getElementById("wi_altitude_DH");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_DH_alti" onchange="changeLayerVisibility('alti_resi_DH')">`
                  + `<label class="checkboxLabel" for="checkboxResi_DH_alti" style="margin-left:5px">Obs. DH</label>`;
                  
}