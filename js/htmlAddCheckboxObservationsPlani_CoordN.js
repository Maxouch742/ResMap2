function htmlAddCheckboxObservationsPlani_CoordN(){
    
    const div = document.getElementById("obs_plani_coordN");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxCoordN" onchange="changeLayerVisibility('plani_coordN')">`
                  + `<label class="checkboxLabel" for="checkboxCoordN" style="margin-left:5px;">Obs. coordonnée Nord (axe X)</label>`;
                  
}