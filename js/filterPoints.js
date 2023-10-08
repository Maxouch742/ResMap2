function filterPoints(){

    input = document.getElementById("filterPoint");
    matricule = input.value;

    console.log("Matricule cherché:", matricule)

    if (pts_Map.has(matricule)){
        console.log("Point existe");
    } else {
        document.getElementById("filterPointNot").innerHTML = 'Le point n\'existe pas !';
    }
}