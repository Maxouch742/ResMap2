function window_affichFilter1D(){
    const div = document.getElementById("filter_1D");
    div.innerHTML = `<input class="form-check-input" type="radio" name="AbrissPlani" value="AbrissAlti">`
                  + `<label class="checkboxLabel" for="filterAbrissAlti" style="margin-left:5px">1D</label>`;
}