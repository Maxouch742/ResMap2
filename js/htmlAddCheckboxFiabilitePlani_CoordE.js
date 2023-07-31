function htmlAddCheckboxFiabilitePlani_CoordE(){

    const div = document.getElementById("zi_plani_coordE");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxFiabLoc_CoordE" onchange="changeLayerVisibility('plani_fiabLoc_coordE')">`
                  + `<label class="checkboxLabel" for="checkboxFiabLoc_CoordE" style="margin-left:5px;">Coordonnée E.</label>`

}