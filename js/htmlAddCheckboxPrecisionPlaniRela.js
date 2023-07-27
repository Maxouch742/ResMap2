function htmlAddCheckboxPrecisionPlaniRela() {
    
    const div = document.getElementById("plani_ell_rela");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxEllRel" onchange="changeLayerVisibility('plani_ellRel')">` 
                  + `<label class="checkboxLabel" for="checkboxEllRel">Ellipses de confiance relatives</label>`;
                  
}