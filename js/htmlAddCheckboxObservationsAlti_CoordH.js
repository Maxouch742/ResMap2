function htmlAddCheckboxObservationsAlti_CoordH(){
    
    const div = document.getElementById("obs_altitude_coordH");
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxCoordH_alti" onchange="changeLayerVisibility('alti_coordH')">`
                  + `<label class="checkboxLabel" for="checkboxCoordH_alti" style="margin-left:5px">Obs. coordonnée H</label>`;
                  
}