// Points nouveaux
stylePtsN = new ol.style.Style({
    image: new ol.style.Icon({
        src: './img/triangle-filled-svgrepo-com.png',
        scale: '0.07',
        color: '#0C80ED',  // bleu
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "bold 14px Calibri",
        fill: new ol.style.Fill({
            color: '#0C80ED'
        }),
        stroke: new ol.style.Stroke({
          color: "#ffffff", width: 3
        }),
        offsetX: 15.0,
        offsetY: -10.0,
        rotation: 0
    })
});

// Points fixes
stylePtsF = new ol.style.Style({
    image: new ol.style.Icon({
        src: './img/circle-filled-svgrepo-com.png',
        scale: '0.07',
        color: '#FF2121',  //Rouge
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "bold 14px Calibri",
        fill: new ol.style.Fill({
            color: "#FF2121"
        }),
        stroke: new ol.style.Stroke({
            color: "#ffffff", width: 3
        }),
        offsetX: 15.0,
        offsetY: -10.0,
        rotation: 0
    })
});