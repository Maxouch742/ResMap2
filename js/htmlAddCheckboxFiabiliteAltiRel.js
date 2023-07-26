function htmlAddCheckboxFiabiliteAltiRel(){

    const div = document.getElementById('rectangleRelativeAlti');
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxRectRel_alti" onchange="changeLayerVisibility('alti_rectRel')">`
                  + `<label class="checkboxLabel" for="checkboxRectRel_alti">`
                  + `Rectangles de fiabilité relatifs`
                  + `</label>`;
    
}