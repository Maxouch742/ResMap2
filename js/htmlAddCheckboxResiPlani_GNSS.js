function htmlAddCheckboxResiPlani_GNSS(){

    const div = document.getElementById("wi_plani_gnss");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_GNSS" onchange="changeLayerVisibility('plani_resi_GNSS')">`
                  + `<label class="checkboxLabel" for="checkboxResi_GNSS" style="margin-left:5px;">Session GNSS</label>`;

}