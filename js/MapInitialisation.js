// ---------------  INITIALISATION DE LA MAP  ---------------

// Définition de projection MN95 
proj4.defs(
    "EPSG:2056",
    "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1"
    + " +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
);
ol.proj.proj4.register(proj4);


// Fond WMTS CN à échelle dynamique
const carteNationale = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.pixelkarte-farbe" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS CarteNationale / geo.admin.ch</a>"]
    }),
    opacity: 0.2
});

// Fond WMTS swissImage à échelle dynamique
const swissImage = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.swissimage" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS SWISSIMAGE / geo.admin.ch</a>"]
    }),
    opacity: 0.5
});

// Fond SwissALTI3D relief multidirectionnel à échelle dynamique
const SwissSURFACE3D = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.swisssurface3d-reliefschattierung-multidirektional" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS Relief multidir. issu de SwissSURFACE3D / geo.admin.ch</a>"]
    }),
    opacity: 0.5
});

// MO noir et blanc
const MO_nb = new ol.layer.Tile({
    id: "background-layer",
    source: new ol.source.TileWMS({
        url: `https://geodienste.ch/db/av_0/fra?`,
        params: { 'LAYERS': 'LCSF,LCSFPROJ,Conduites,SOLI,SOSF,SOPT,Adresses_des_batiments,Nomenclature,Biens_fonds,Biens_fonds_projetes,Limites_territoriales', 'TILED': true },
        attributions: [ "Fond de plan &copy; <a href=\"https://geodienste.ch\">geodienste</a>" ],
    }),
    zIndex: -99,
    opacity: 0.5
});

// Vue de base (centre et zoom), avec projection
const view = new ol.View({
    center: [2660156.229, 1183629.320], // centre de la suisse géographique
    projection: new ol.proj.Projection({
        code: "EPSG:2056",
        units: "m"
    }),
    zoom: 9
});

// Ajout de la Map
const map = new ol.Map({
    target: "map",
    layers: [
        carteNationale,
    ],
    view,
    controls: ol.control.defaults({
        attributionOptions: {
            collapsible: true, // Copyright affiché 
            visible: false
        }
    })
});
