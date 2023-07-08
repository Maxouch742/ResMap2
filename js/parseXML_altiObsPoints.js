function parseXML_altiObsPoints(xml){
    
    const altiObs = [];
    
    const altiAbriss = xml.getElementsByTagName('altimetricAbriss')[0];
    const stations = altiAbriss.getElementsByTagName('station');

    for (let i=0; i<stations.length; i++){
        
        const station_type = stations[i].getAttribute('obsType');

        switch (station_type){
            case 'gpsSession' :
                const targets = stations[i].getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    pt_name = targets[j].getAttribute('name');
                    if (altiObs.includes(pt_name) === false){
                        altiObs.push(pt_name);
                    }
                };
                break;
            
            case 'heightDiff':
                // Station id
                const sta = stations[i].getAttribute('name');
                if (altiObs.includes(sta) === false){
                    altiObs.push(sta)
                };
                // target id
                const obs = stations[i].getElementsByTagName('obs')
                for (let j=0; j<obs.length; j++){
                    obs_id = obs[j].getAttribute('target');
                    if (altiObs.includes(obs_id) === false){
                        altiObs.push(obs_id)
                    }
                };
                break;
        };
    };

    return altiObs
}