function parseXML_planiObsPoints(xml){

    const planiObs = [];
    
    const planiAbriss = xml.getElementsByTagName('planimetricAbriss')[0];
    const stations = planiAbriss.getElementsByTagName('station');

    for (let i=0; i<stations.length; i++){
        
        const station_type = stations[i].getAttribute('obsType');

        switch (station_type){
            case 'gpsSession' :
                const targets = stations[i].getElementsByTagName('target');
                for (let j=0; j<targets.length; j++){
                    pt_name = targets[j].getAttribute('name');
                    if (planiObs.includes(pt_name) === false){
                        planiObs.push(pt_name);
                    }
                };
                break;
            
            case 'direction':
                // Station id
                const sta = stations[i].getAttribute('name');
                if (planiObs.includes(sta) === false){
                    planiObs.push(sta)
                };
                // target id
                const obs = stations[i].getElementsByTagName('obs')
                for (let j=0; j<obs.length; j++){
                    obs_id = obs[j].getAttribute('target');
                    if (planiObs.includes(obs_id) === false){
                        planiObs.push(obs_id)
                    }
                };
                break;
            
            case 'distance':
                // Station id
                const staa = stations[i].getAttribute('name');
                if (planiObs.includes(staa) === false){
                    planiObs.push(staa)
                };
                // target id
                const obss = stations[i].getElementsByTagName('obs')
                for (let j=0; j<obss.length; j++){
                    obs_id = obss[j].getAttribute('target');
                    if (planiObs.includes(obs_id) === false){
                        planiObs.push(obs_id)
                    }
                };
                break;
        };
    };

    return planiObs
}