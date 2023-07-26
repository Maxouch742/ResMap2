function htmlAddCheckboxObservationsAlti_GNSS(){

    const div = document.getElementById("obs_altitude_GNSS");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxGNSS_alti" onchange="changeLayerVisibility('alti_GNSS')">`
                  + `<label class="checkboxLabel" for="checkboxGNSS_alti" style="margin-left:5px">Obs. GNSS</label>`;

}