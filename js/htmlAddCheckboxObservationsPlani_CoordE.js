function htmlAddCheckboxObservationsPlani_CoordE() {

    const div = document.getElementById("obs_plani_coordE");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxCoordE" onchange="changeLayerVisibility('plani_coordE')">`
                  + `<label class="checkboxLabel" for="checkboxCoordE" style="margin-left:5px;">Obs. coordonnée Est (axe Y)</label>`;
}