function htmlAddCheckboxObservationsPlani_CoordE() {

    const div = document.getElementById("obs_plani_coordE");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxCoordE" onchange="changeLayerVisibility('plani_coordE')">`
                  + `<label class="checkboxLabel" for="checkboxCoordE">Obs. coordonnée Est (axe Y)</label>`;

}