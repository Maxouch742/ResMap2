// Fond WMTS CN à échelle dynamique
background_CN = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        projection: 'EPSG:2056',
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.pixelkarte-farbe" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS CarteNationale / geo.admin.ch</a>"]
    }),
    opacity: 0.2
});

// Fond WMTS swissImage à échelle dynamique
swissImage = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.swissimage" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS SWISSIMAGE / geo.admin.ch</a>"]
    }),
    opacity: 0.5
});

// Fond SwissALTI3D relief multidirectionnel à échelle dynamique
swissSURFACE3D = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.swisssurface3d-reliefschattierung-multidirektional" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS Relief multidir. issu de SwissSURFACE3D / geo.admin.ch</a>"]
    }),
    opacity: 0.5
});

// MO noir et blanc
MO_nb = new ol.layer.Tile({
    id: "background-layer",
    source: new ol.source.TileWMS({
        url: `https://geodienste.ch/db/av_0/fra?`,
        params: { 'LAYERS': 'LCSF,LCSFPROJ,Conduites,SOLI,SOSF,SOPT,Adresses_des_batiments,Nomenclature,Biens_fonds,Biens_fonds_projetes,Limites_territoriales', 'TILED': true },
        attributions: [ "Fond de plan &copy; <a href=\"https://geodienste.ch\">geodienste</a>" ],
    }),
    zIndex: -99,
    opacity: 0.5
});