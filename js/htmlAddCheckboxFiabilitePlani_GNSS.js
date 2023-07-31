function htmlAddCheckboxFiabilitePlani_GNSS(){

    const div = document.getElementById("zi_plani_gnss");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_GNSS" onchange="changeLayerVisibility('plani_fiabLoc_GNSS')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_GNSS" style="margin-left:5px;">Session GNSS</label>`

}