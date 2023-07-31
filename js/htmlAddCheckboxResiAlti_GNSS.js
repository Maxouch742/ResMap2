function htmlAddCheckboxResiAlti_GNSS(){

    document.getElementById("altitude_wi").disabled = false;
    const div = document.getElementById("wi_altitude_GNSS");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_GNSS_alti" onchange="changeLayerVisibility('alti_resi_GNSS')">`
                  + `<label class="checkboxLabel" for="checkboxResi_GNSS_alti" style="margin-left:5px;">Session GNSS</label>`;

}