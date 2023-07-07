function parseXML_points(xml){

    const points = new Map();    
    
    // Final coordinates of file
    const coordFinal = xml.getElementsByTagName('finalCoords')[0];
    const coordFinal_list = coordFinal.getElementsByTagName('point');

    for (let i=0; i<coordFinal_list.length; i++){
        const pt = coordFinal_list[i];

        pt_name = pt.getAttribute('name');
        if (pt_name != 'NULLBERN'){
            
            const pt_object = {
                type: pt.getAttribute('type'),
                east: parseFloat(pt.getAttribute('easting')), //.toFixed(5),
                north: parseFloat(pt.getAttribute('northing')), //.toFixed(5),
                height: parseFloat(pt.getAttribute('height')), //.toFixed(5),
                geoidUnd: parseFloat(pt.getAttribute('geoidUnd')), //.toFixed(5),
                eta: parseFloat(pt.getAttribute('eta_cc')), //.toFixed(2),
                xi: parseFloat(pt.getAttribute('xi_cc')), //.toFixed(2),
            };

            points.set(pt_name, pt_object)
        }
    }

    // reliability and precision
    const coordinates = xml.getElementsByTagName('coordinates')[0];
    const coordinates_list = coordinates.getElementsByTagName('point');

    for (let i=0; i<coordinates_list.length; i++){
        const pt = coordinates_list[i];

        pt_name = pt.getAttribute('name');
        if (pt_name != 'NULLBERN'){

            if (points.has(pt_name) === true){

                if (pt.getAttribute('dy') != null){ points.get(pt_name).dE = parseFloat(pt.getAttribute('dy')) };
                if (pt.getAttribute('dx') != null){ points.get(pt_name).dN = parseFloat(pt.getAttribute('dx')) };
                if (pt.getAttribute('dh') != null){ points.get(pt_name).dH = parseFloat(pt.getAttribute('dh')) };

                if (pt.getAttribute('meanErrorA') != null){ points.get(pt_name).EMA = parseFloat(pt.getAttribute('meanErrorA')) };
                if (pt.getAttribute('meanErrorB') != null){ points.get(pt_name).EMB = parseFloat(pt.getAttribute('meanErrorB')) };
                if (pt.getAttribute('azimuthA') != null){ points.get(pt_name).Gis_EMA = parseFloat(pt.getAttribute('azimuthA')) };
                
                if (pt.getAttribute('meanErrorH') != null){ points.get(pt_name).EMH = parseFloat(pt.getAttribute('meanErrorH')) };
            }
        }
    }

    return points;
}