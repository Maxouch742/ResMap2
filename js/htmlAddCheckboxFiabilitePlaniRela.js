function htmlAddCheckboxFiabilitePlaniRela(){

    const div = document.getElementById("plani_rect_rela");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxRectRel" onchange="changeLayerVisibility('plani_rectRel')">`
                  + `<label class="checkboxLabel" for="checkboxRectRel" style="margin-left:5px;">Rectangles de fiabilité relatifs</label>`
    
}