listCoordsProject = []

/** This function add coordinates to array for zoom of the project
 * 
 * @param {*} value 
 * @param {*} key 
 * @param {*} map 
 */
function logMapElements(value, key, map) {
    listCoordsProject.push(value);
};

/** This function set view and zoom on the zone of the project (mean of coords)
 * 
 * @param {array} listAllPoints 
 */
function centerViewOnProject(listAllPoints) {
    listAllPoints.forEach(logMapElements);
    extentProject = ol.extent.boundingExtent(listCoordsProject);
    bufferProject = ol.extent.buffer(extentProject,50);
    view.fit(bufferProject)
};