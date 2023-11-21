import React, {useState} from 'react';
import PanoramaMap from '../components/PanoramaMap';



function IntelligenceMode(){

    const [ctrlPressed, setCtrlPressed] = useState(false);

    // TODO: prevent many re-renders at ctrl press
    function handleCtrlPressed(isPressed) {
        setCtrlPressed(isPressed);
    }

    return (
        <div>
            <PanoramaMap
              mapMode={"intelligence"}
              active = {true}
              onCtrlPressed={handleCtrlPressed}
            />
        </div>
    );
}

export default IntelligenceMode;

