function htmlAddCheckboxResiPlani_CoordE(){

    const div = document.getElementById("wi_plani_coordE");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_CoordE" onchange="changeLayerVisibility('plani_resi_coordE')">`
                  + `<label class="checkboxLabel" for="checkboxResi_CoordE" style="margin-left:5px;">Coordonnée Est</label>`;

}