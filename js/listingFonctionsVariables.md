# Listing des fonctions et variables

## Fonction *parsingViseesXML_planimetric*
### Description
Parsage du fichier .PRNx pour récupérer et afficher les observations terrestres du réseau géodésique

### Parameters
None

### Returns
None

### Variables globales
- planimetricAbriss   ()                           :
- stationsList        ()                           :
- noPointsDistances   (array)                      :
- geometryDistances   (array)                      :
- distanceLayer       (ol.layer.Vector, Zindex=2)  :
- distanceLineSource  (ol.source.Vector)           :
- noPointsDirections  (array)                      :
- geometryDirections  (array)                      :
- directionLayer      (ol.layer.Vector, Zindex=1)  :
- directionLineSource (ol.source.Vector)           :


## Fonction *parsingEllipsesXML_planimetric*
### Description
Parsage du fichier .PRNx pour récupérer et afficher les ellipses de confiance planimétrique des points nouveaux

### Parameters
None

### Returns
None

### Variables globales
- coordinates          () :
- pointsList           () :
- progvers             () :
- nameProg             () :
- nivConfianceEllipses () :
- t                    (array) : tableau de valeurs entre 0 et 390 avec un pas de 10
- allListENellipse     (array)                      : 
- allListAzimut        (array)                      :
- allListCenter        (array)                      :
- listA                (array)                      :
- ellipsesLineSource   (ol.source.Vector)           :
- textStyleEllipse     (ol.style.Text)              :
- styleEllipse         (ol.style.Style)             :
- ellipseLayer         (ol.layer.Vector, Zindex=89) :


## Fonction *range*
### Description
Créer un tableau de valeurs avec des spécifités

### Parameters
- start (int) : valeur de début du tableau
- stop  (int) : valeur de fin du tableau
- step  (int) : pas entre 2 valeurs

### Returns
- arr (array) : tableau des valeurs
  

## Fonction *parsingEllipsesRelaXML_planimetric*
### Description
Parsage du fichier .PRNx pour récupérer et afficher les ellipses de confiance relatives entre 2 points du réseau géodésique

### Parameters
None

### Returns
None

### Variables globales
- relativeEllipses       () : 
- ellRelaList            () : 
- t                      (array) : tableau de valeurs entre 0 et410 avec un pas de 10
- allListENellipse       (array)                      : 
- allListAzimut          (array)                      : 
- allListCenter          (array)                      : 
- allListP1P2            (array)                      : 
- listA                  (array)                      : 
- ellipsesRelaLineSource (ol.source.Vector)           : 
- textStyleEllipse       (ol.style.Text)              : 
- styleEllipse           (ol.style.Style)             : 
- ellipseRelaLayer       (ol.layer.Vector, Zindex=90) : 


## Fonction *parsingRectanglesXML_planimetric*
### Description
Parsage du fichier .PRNx pour récupérer et afficher les rectangles de fiabilité des points nouveaux du réseau géodésique

### Parameters
None

### Returns
None

### Variables globales
- externalReliabilityApriori () :
- pointsList () :
- allListENrectangle (array) :
- allListAzimut      (array) :
- allListCenter      (array) :
- listNA             (array) :
- rectanglesLineSource (ol.source.Vector) :
- textStyleRectangle   (ol.style.Text)    :
- styleRectangle       (ol.style.Style)   :
- rectangleLayer       (ol.layer.Vector)  :
  

## Fonction *parsingRectanglesRelaXML_planimetric*
### Description
Parsage du fichier .PRNx pour récupérer et afficher les rectangles de fiabilité entre des points

### Parameters
None

### Returns
None

### Variables globales
- relativeRectangles () :
- rectRelaList       () :
- allListENrect      (array) :
- allListAzimut      (array) :
- allListCenters     (array) :
- allListP1P2        (array) :
- listNA             (array) :
- rectanglesRelaLineSource (ol.source.Vector) :
- textStyleRectangle       (ol.style.Text)    :
- styleRectangle           (ol.style.Style)   :
- rectangleRelaLayer       (ol.layer.Vector, Zindex=91) :

## Fonction *parsingGNSS_planimetric*
### Description

### Parameters

### Returns

### Variables globales
- planimetricAbriss () :
- stationsList      (array) :
- gnssSource (ol.source.Vector) :
- gnssStyle (ol.style.Style) :
- sessionNo (number) :
- gnssLayer (ol.layer.Vector, Zindex=80) :

## Fonction *parsingObsCoord_planimetric*
### Description
### Parameters
None

### Returns
None

### Variables globales
- planimetricAbriss () :
- stationsList (array):
- obsCoordSourceE (ol.source.Vector) :
- obsCoordSourceN (ol.source.Vector) :
- obsCoordELayer (ol.layer.Vector, Zindex=99) :
- obsCoordNLayer (ol.layer.Vector, Zindex=99) :


## Fonction *parsingVectXML_planimetric*
### Description
### Parameters
None

### Returns
None

### Variables globales
- coordinates () : 
- pointsList (array) :
- vectLineSource (ol.source.Vector) :
- textStyleVect (ol.style.Text) :
- styleVect (ol.style.Style) :
- ol.style.Style (ol.layer.Vector, Zindex=99) :


## Fonction *fiabLocale_planimetric*
### Description
### Parameters
None

### Returns
None

### Variables globales
- fiabLocaleSourceBase (ol.source.Vector) :
- fiabLocaleSource (ol.source.Vector) :
- fiabLocalLayer (ol.layer.Vector, Zindex=80) :


## Fonction *normedResidualsWi_planimetric*
### Description
### Parameters
None

### Returns
None

### Variables globales
- wiSourceBase (ol.source.Vector) :
- wiSource (ol.source.Vector) :
- wiLayer (ol.layer.Vector, Zindex=80) :