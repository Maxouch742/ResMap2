function htmlAddCheckboxObservationsPlani_Directions(){

    const div = document.getElementById("obs_plani_dir");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxDir" onchange="changeLayerVisibility('plani_dir')">`
                  + `<label class="checkboxLabel" for="checkboxDir">Obs. Directions</label>`;

}