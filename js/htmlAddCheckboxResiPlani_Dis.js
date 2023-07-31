function htmlAddCheckboxPrecisionPlani_Dis(){

    const div = document.getElementById("wi_plani_distance");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_Dis" onchange="changeLayerVisibility('plani_resi_dis')">`
                  + `<label class="checkboxLabel" for="checkboxResi_Dis" style="margin-left:5px;">Distances</label>`;

}