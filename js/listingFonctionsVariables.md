# Listing des fonctions et variables

## Fichier `altimetricAbriss.js`

### Fonction `parsingVisees_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

**Variables globales :**
- observationsTerrestresAltimetric (array) : liste des observations avec tous les paramètres (fiabilité, précision, ...) sur les dénivelées de hauteur


### Fonction `layerObservationsTerrestres_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

**Variables globales :**
- deniveleeLayer (ol.layer.Vector) : 
- deniveleeSource (ol.source.Vector) :


### Fonction `gisement`
**Description :**
-

**Parameters :**
- dx (Number) : différence de coordonnée Est, unité : mètres
- dy (Number) : différence de coordonnée Nord, unité : mètres

**Returns :**
- gisement (Number) : gisement des deltas de coordonnées, unité : radians

** Variables globales :**
None


### Fonction `parsingObsCoord_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- obsCoordHLayer (ol.layer.Vector) :


### Fonction `parsingGNSS_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- gnssLayerAltimetric (ol.layer.Vector) :


### Fonction `parsingEllipsesXML_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- ellipseLayerAltimetric (ol.layer.Vector) :


### Fonction `parsingEllipsesRelaXML_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- ellipRelaAltiLayer (ol.layer.Vector) :


### Fonction `parsingRectanglesXML_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- rectangleRelaLayerAlti (ol.layer.Vector) :


### Fonction `parsingVectXML_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- vectLayerAlti (ol.layer.Vector) :


### Fonction `fiabLocale_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- fiabLocaleSourceAlti (ol.source.Vector) :
- fiabLocalLayerAlti (ol.layer.Vector) :


### Fonction `normedResidualsWi_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
- limitWiAlti (Number)
- limitInfAlti (Number)
- wiLayerAlti (ol.layer.Vector) :



## Fichier `altimetricAbrissChangeLayers.js`

### Fonction `changeLayerVisibilityFixedPoints_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityVariablePoints_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityDenivelee_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityGnss_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityCoordH`

**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityEllipses_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityEllipsesRela_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityRect_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityRectRela_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityFiabiliteLocales_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityResidusNormes_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `changeLayerVisibilityVect_altimetric`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


### Fonction `altimetricActivateCheckBox`
**Description :**
-

**Parameters :**
None

**Returns :**
None

** Variables globales :**
None


## Fichier `CenterViewOnProjet.js`
** Variables globales :**
- listCoordsProject (array) :

### Fonction `logMapElements`
** Description : **
-

** Parameters :**
- value :
- key :
- map

** Returns :**
None

** Variables globales :**
None

### Fonction `centerViewOnProjet.js`
** Description : **
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- extentProject (ol.extent.boudingExtent) :
- bufferProject (ol.extentbuffer) :


## Fichier `changeBackground`
### Fonction `changeBackground`
** Description :**
-

** Parameters: **
- layer (String) : nom de la couche souhaité par l'utilisateur

** Returns :**
None

** Variables globales: **
None



## Fichier `main.js`
** Variables globales :**
- nbObsSuppr (Number) : compte global du nombre d'observations supprimées
- fileName (String) : nom et chemin du fichier importé par l'utilisateur



## Fichier `MapInitialisation.js`
** Variables globales :**
- map (ol.Map) : 



## Fichier `parsingPointsXML.js`
### Fonction `parsingPointsXML`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- listAllPoints (Map) :
- pointsLayer (ol.layer.Vector) :
- pointsVariableLayer (ol.layer.Vector) :
- pointsLayerAltimetric (ol.layer.Vector) :
- pointsVariableLayerAltimetric (ol.layer.Vector) :



## Fichier `planimetricAbriss.js`
### Fonction `parsingEllipsesXML_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- ellipseLayer (ol.layer.Vector) :


### Fonction `range`
** Description :**
-

** Parameters :**
- start (Number) :
- stop (Number) :
- step (Number) :

** Returns :**
- arr (array) :

** Variables globales :**
None


### Fonction `parsingEllipsesRelaXML_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- ellipseRelaLayer (ol.layer.Vector) :


### Fonction `parsingRectanglesXML_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- rectangleLayer (ol.layer.Vector) :


### Fonction `parsingRectanglesRelaXML_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- rectangleRelaLayer (ol.layer.Vector) :


### Fonction `parsingGNSS_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- gnssLayer (ol.layer.Vector) :


### Fonction `parsingObsCoord_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- obsCoordSourceE (ol.source.Vector) :
- obsCoordSourceN (ol.source.Vector) :
- obsCoordELayer (ol.layer.Vector) :
- obsCoordNLayer (ol.layer.Vector) :


### Fonction `parsingVectXML_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- vectLayer (ol.layer.Vector) :


### Fonction `parsingVisee`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- observationsTerrestres (array) :


### Fonction `layerObservationsTerrestres`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- directionLayer (ol.layer.Vector) :
- distanceLayer (ol.layer.Vector) :


### Fonction `fiabLocale_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- fiabLocalLayer (ol.layer.Vector) :


### Fonction `normedResidualsWi_planimetric`
** Description :**
-

** Parameters :**
None

** Returns :**
None

** Variables globales :**
- wiSource (ol.source.Vector) :
- limitWi (Number) :
- limitInf (Number) :
- wiLayer (ol.layer.Vector) :