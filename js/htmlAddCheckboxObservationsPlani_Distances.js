function htmlAddCheckboxObservationsPlani_Distances() {

    const div = document.getElementById("obs_plani_dis");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxDis" onchange="changeLayerVisibility('plani_dis')">`
                  + `<label class="checkboxLabel" for="checkboxDis" style="margin-left:5px;">Obs. Distances</label>`;

}