function window_affichFilter(){

    const div = document.getElementById("filterDiv");
    div.innerHTML = `<div class="w3-dropdown-hover w3-right" id="filterSelection">`
                  + `<button class="w3-button" id="filterButton"><img id="imgFilter" src="./img/filter-svgrepo-com.svg" alt="Filter view"></button>`
                  + `<div class="w3-dropdown-content w3-bar-block" style="right:0">`
                  + `<p>N° de point :</p><input class="w3-input-filter" id="filterPoint" onchange="filterPoints()" type="text">`
                  + `<p class="filter-not-match" id="filterPointNot"></p>`
                  + `<p>N° de station :</p><input class="w3-input-filter" id="filterStation" onchange="filterStations()" type="text">`
                  + `<p class="filter-not-match" id="filterStationNot"></p>`
                  + `<button class="button-reinit">Réinitialiser</button>`
                  + `</div>`;
}