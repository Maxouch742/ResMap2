# Listing des fonctions et variables

## accordionMenu.js
### Description
Permet de gérer l'accordéon des abriss planimétrique et altimétrique


## CenterViewOnProject.js
### Fonctions
- logMapElements(value, key, map) : ajout des coordonnées dans un tableau
- centerViewOnProject(listAllPoints) : centrer la vue de la carte sur le réseau géodésique


## ChangeBackground.hs
### Fonctions
- changeBackground() : change le fond de carte selon le souhait de l'utilisateur


## CheckboxChangeLayers.js
### Fonctions
- changeLayerVisibilityFixedPoints()
- changeLayerVisibilityVariablePoints()
- changeLayerVisibilityDistances()
- changeLayerVisibilityDirections()
- changeLayerVisibilityEllipses()
- changeLayerVisibilityEllipsesRela()
- changeLayerVisibilityRectangles()
- changeLayerVisibilityRectanglesRela()
- changeLayerVisibilityGnss()
- changeLayerVisibilityCoordE()
- changeLayerVisibilityCoordN()
- changeLayerVisibilityFiabLoc()
- changeLayerVisibilityWi()
- changeLayerVisibilityVect()
- changeLayerVisibilityTextFixedPoints()
- changeLayerVisibilityTextVariablePoints()


## ParsingGnssXML.js
### Fonctions
- parsingGNSS(xmlToParse)


## MapInitialisation.js
### Variables
- carteNationale (const) : layer.Tile de la carte nationale de swisstopo
- swissImage (const) : layer.Tile de l'orthophoto de swisstopo
- SwissSURFACE3D (const) : layer.Tile du modèle de relief de swisstopo
- MO_nb (const) : layer.Tile du cadastre suisse en niveaux de gris
- view (const) : paramètre de la view de la carte
- map (const) : carte du site avec OpenLayers


## ParsingObsCoordXML.js
### Fonctions
- parsingObsCoord(xmlToParse) : récupérer les coordonnées du .PRNx pour les compensations libre-ajusté


## ParsingPointsXML.js
### Fonctions
- parsingPointsXML(xmlToParse) : récupérer tous les points du calcul


## ParsingRectanglesRelaXML.js
### Fonctions
- parsingRectanglesRelaXML(xmlToParse) : récupérer les rectangles de fiabilité relatifs


## ParsingRectanglesXML.js
### Fonctions
- parsingRectanglesXML(xmlToParse) : récupérer les rectangles de fiabilité des points nouveaux

## ParsingVectXML.js
### Fonctions
- parsingVectXML(xmlToParse) : récupérer les vecteurs d'accroissements des coordonnées

## ParsingViseesXML.js
### Fonctions
- parsingViseesXML(xmlToParse) : récupérer les observations des stations


