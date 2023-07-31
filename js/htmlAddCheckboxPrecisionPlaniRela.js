function htmlAddCheckboxPrecisionPlaniRela() {
    
    const div = document.getElementById("plani_ell_rela");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxEllRel" onchange="changeLayerVisibility('plani_ellRel')">` 
                  + `<label class="checkboxLabel" for="checkboxEllRel" style="margin-left:5px">Ellipses de confiance relatives</label>`;
                  
}