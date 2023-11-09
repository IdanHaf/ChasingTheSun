import React, { useState } from 'react';
import PanoramaMap from '../components/PanoramaMap';



function ManagersPage(){
    const [sendData, setSendData] = useState(false);

    const handleButtonClick = () => {
        setSendData(true);
    }

        return (
        <div>
            <PanoramaMap
                isManager={true}
                setData={sendData}
            />

            <button className="addButton select-none" onClick={handleButtonClick}>
                Add Data
            </button>
        </div>
    );
}

export default ManagersPage;

