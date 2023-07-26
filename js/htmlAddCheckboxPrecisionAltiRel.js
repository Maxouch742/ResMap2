function htmlAddCheckboxPrecisionAltiRela(){

    const div = document.getElementById('ellipseRelativeAlti');
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxEllRel_alti" onchange="changeLayerVisibility('alti_ellRel')">`
                  + `<label class="checkboxLabel" for="checkboxEllRel_alti">`
                  + `Intervalles de confiance relatives`
                  + `</label>`;
    
}