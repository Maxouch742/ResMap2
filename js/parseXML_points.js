function parseXML_points(xml){

    const points = new Map();   
    
    // Final coordinates of file
    const coordFinal = xml.getElementsByTagName('finalCoords')[0];
    const coordFinal_list = coordFinal.getElementsByTagName('point');

    for (let i=0; i<coordFinal_list.length; i++){
        const pt = coordFinal_list[i];

        pt_name = pt.getAttribute('name');
        if (pt_name != 'NULLBERN'){

            east_temp = parseFloat(pt.getAttribute('easting'));
            if (east_temp > 450000.0 && east_temp < 2000000.0){
                east_temp = east_temp + 2000000.0;
            };
            north_temp = parseFloat(pt.getAttribute('northing'));
            if (north_temp > 70000.0 && north_temp < 1000000.0){
                north_temp = north_temp + 1000000.0;
            };
            
            const pt_object = {
                type: pt.getAttribute('type'),
                east: east_temp, //.toFixed(5),
                north: north_temp, //.toFixed(5),
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
    };

    // Extern reliability
    const reliability = xml.getElementsByTagName('externalReliabilityApriori')[0];
    const reliability_list = reliability.getElementsByTagName('point');

    for (let i=0; i<reliability_list.length; i++){
        const pt = reliability_list[i];
        const pt_name = pt.getAttribute('name');
        if (points.has(pt_name) === true){
            if (pt.getAttribute('na') != null){ points.get(pt_name).NA = parseFloat(pt.getAttribute('na')) };
            if (pt.getAttribute('nb') != null){ points.get(pt_name).NB = parseFloat(pt.getAttribute('nb')) };
            if (pt.getAttribute('azimuthN') != null){ points.get(pt_name).Gis_NA = parseFloat(pt.getAttribute('azimuthN')) };
            if (pt.getAttribute('nh') != null){ points.get(pt_name).NH = parseFloat(pt.getAttribute('NH')) };
        }
    };

    return points
}