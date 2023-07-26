function htmlAddCheckboxObservationsAlti_DH(){

    const div = document.getElementById("obs_altitude_DH");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxDH_alti" onchange="changeLayerVisibility('alti_DH')">`
                  + `<label class="checkboxLabel" for="checkboxDH_alti" style="margin-left:5px">Obs. DH</label>`;
    
}