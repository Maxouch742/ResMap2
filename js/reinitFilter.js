function reinitFilter(){
    document.getElementById("filterPointNot").innerHTML = '';
    document.getElementById("filterStationNot").innerHTML = '';

    document.getElementById("filterPoint").value = '';
    document.getElementById("filterStation").value = '';

    defineViewByFile(pts_Map);
}