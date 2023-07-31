function htmlAddCheckboxFiabilitePlani_Dis(){

    const div = document.getElementById("zi_plani_distance");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_Dis" onchange="changeLayerVisibility('plani_fiabLoc_dis')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_Dis" style="margin-left:5px;">Distances</label>`;

}