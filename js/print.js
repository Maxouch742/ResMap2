// Impression
let printControl = new ol.control.PrintDialog();
printControl.setSize('A4');
map.addControl(printControl);

/* On print > save image file */
printControl.on(['print', 'error'], function(e) {
    // Print success
    if (e.image) {
      if (e.pdf) {
        // Export pdf using the print info
        var pdf = new jsPDF({
          orientation: e.print.orientation,
          unit: e.print.unit,
          format: e.print.size
        });
        pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
        pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf');
      } else  {
        // Save image as file
        e.canvas.toBlob(function(blob) {
          var name = (e.print.legend ? 'legend.' : 'map.')+e.imageType.replace('image/','');
          saveAs(blob, name);
        }, e.imageType, e.quality);
      }
    } else {
      console.warn('No canvas to export');
    }
  });