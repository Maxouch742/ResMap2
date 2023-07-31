function htmlAddCheckboxResiPlani_CoordN(){

    const div = document.getElementById("wi_plani_coordN");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxResi_CoordN" onchange="changeLayerVisibility('plani_resi_coordN')">`
                  + `<label class="checkboxLabel" for="checkboxResi_CoordN" style="margin-left:5px;">Coordonnée Nord</label>`;

}