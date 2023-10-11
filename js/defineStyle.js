//----------------------------------------------------------------------------------------------------------------------
// POINTS
//----------------------------------------------------------------------------------------------------------------------

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

// PLANIMETRIE
stylePtsN_plani = new ol.style.Style({
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

// ALTIMETRIE
stylePtsN_alti = new ol.style.Style({
    image: new ol.style.Icon({
        src: './img/triangle-filled-inversed-svgrepo-com.png',
        scale: '0.07',
        color: '#0C80ED',
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "bold 14px Calibri",
        fill: new ol.style.Fill({
            color: '#0C80ED',
        }),
        stroke: new ol.style.Stroke({
          color: "#ffffff", width: 3
        }),
        offsetX: 15.0,
        offsetY: -10.0,
        rotation: 0
    })
});


//----------------------------------------------------------------------------------------------------------------------
// ELLIPSES
//----------------------------------------------------------------------------------------------------------------------

// Planimetrie
styleEllipse = new ol.style.Style({
    stroke: new ol.style.Stroke({ 
        color: '#FF6BF1', 
        width: 1 
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "italic 13px Calibri",
        fill: new ol.style.Fill({
            color: "#FF6BF1"
        }),
        stroke: new ol.style.Stroke({
            color: "#ffffff", width: 3
        }),
        offsetX: -10,
        offsetY: 10,
        rotation: 0,
        placement: "point"
    })
});

// Altimetrie
altiEll_featureStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#FF6BF1',
        width: 6
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "italic 13px Calibri",
        fill: new ol.style.Fill({
            color: "#FF6BF1"
        }),
        stroke: new ol.style.Stroke({
            color: "#ffffff", 
            width: 3
        }),
        offsetX: -10,
        offsetY: 10,
        rotation: 0,
        placement: "point"
    })
});


//----------------------------------------------------------------------------------------------------------------------
// RECTANGLES
//----------------------------------------------------------------------------------------------------------------------

// Planimetrie
styleRectangle = new ol.style.Style({
    stroke: new ol.style.Stroke({ 
        color: '#00AD02', 
        width: 1 
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "italic 13px Calibri",
        fill: new ol.style.Fill({
        color: "#00AD02"
        }),
        stroke: new ol.style.Stroke({
        color: "#ffffff", width: 3
        }),
        offsetX: -10,
        offsetY: 10,
        rotation: 0,
        placement: "point"
    })
});

// Altimetrie
altiRect_featureStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({ 
        color: '#00AD02', 
        width: 1 
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "italic 13px Calibri",
        fill: new ol.style.Fill({
            color: "#00AD02"
        }),
        stroke: new ol.style.Stroke({
            color: "#ffffff",
            width: 3
        }),
        offsetX: -10,
        offsetY: 10,
        rotation: 0,
        placement: "point"
    })
});


//----------------------------------------------------------------------------------------------------------------------
// VECTEUR
//----------------------------------------------------------------------------------------------------------------------

// Planimetrie et altimetrie
styleVecteur = new ol.style.Style({
    stroke: new ol.style.Stroke({ 
        color: '#FF0000', 
        width: 1 
    }),
    text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "13px Calibri",
        fill: new ol.style.Fill({
            color: "#FF0000"
        }),
        stroke: new ol.style.Stroke({
            color: "#ffffff", width: 3
        }),
        offsetX: 10,
        offsetY: -10,
        rotation: 0,
        placement: "point"
    })
});