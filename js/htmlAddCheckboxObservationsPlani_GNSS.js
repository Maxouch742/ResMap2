function htmlAddCheckboxObservationsPlani_GNSS() {

    const div = document.getElementById("obs_plani_GNSS");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxGNSS" onchange="changeLayerVisibility('plani_GNSS')">`
                  + `<label class="checkboxLabel" for="checkboxGNSS" style="margin-left:5px;">Obs. Session GNSS</label>`;

}