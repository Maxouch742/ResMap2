function htmlAddCheckboxFiabilitePlani_CoordN(){

    const div = document.getElementById("zi_plani_coordN");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_CoordN" onchange="changeLayerVisibility('plani_fiabLoc_coordN')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_CoordN" style="margin-left:5px;">Coordonnée N.</label>`

}