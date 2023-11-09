import React from 'react';
import PanoramaMap from '../components/PanoramaMap';



function IntelligenceMode(){

    return (
        <div>
            <PanoramaMap
              isManager={false}
              setData={false}
            />
        </div>
    );
}

export default IntelligenceMode;

