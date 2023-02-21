/** This function Cette fonction permet de gérer 
 *  l'affichage des fonds WMTS selon le choix de 
 *  l'utilisateur
 */
function changeBackground() {

    if (document.getElementById("cb_CN").checked == false) {
        map.removeLayer(carteNationale);
    };
    if (document.getElementById("cb_CN").checked == true) {
        map.addLayer(carteNationale);
    };

    if (document.getElementById("cb_MO").checked == false) {
        map.removeLayer(MO_nb);
    };
    if (document.getElementById("cb_MO").checked == true) {
        map.addLayer(MO_nb);
    };

    if (document.getElementById("cb_img").checked == false) {
        map.removeLayer(swissImage);
    };
    if (document.getElementById("cb_img").checked == true) {
        map.addLayer(swissImage);
    };

    if (document.getElementById("cb_relief").checked == false) {
        map.removeLayer(SwissSURFACE3D);
    };
    if (document.getElementById("cb_relief").checked == true) {
        map.addLayer(SwissSURFACE3D);
    };


    if (document.getElementById("cb_none").checked == true) {
        map.removeLayer(swissImage);
        map.removeLayer(carteNationale);
        map.removeLayer(SwissSURFACE3D);
        map.removeLayer(MO_nb);
    };
};


/*************************** DROPDOWN pour les layers ***************************/

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function functionLayers(){
    document.getElementById("myDropdown").classList.toggle("show");
};


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }