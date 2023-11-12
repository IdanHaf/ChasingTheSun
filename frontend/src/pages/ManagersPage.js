import React, {useEffect, useState} from 'react';
import PanoramaMap from '../components/PanoramaMap';
import {
    setObjectData,
} from "../utility/LabelSelectorHelpers";



function ManagersPage(){
    const [isEmpty, setIsEmpty] = useState(true);

    //TODO:: remove when db is not empty.
    const dbEmpty = () =>{
        if(isEmpty) {
            setObjectData([{
                lat:
                    40.75986013487,
                lng:
                    -73.980449311431,
                zoom:
                    1,
                xRatio:
                    0.48417721518987344,
                yRatio:
                    0.616,
                pitch:
                    1.1723691162628143,
                heading:
                    350.05105100094835,
                labelH:
                    0.07466666666666667,
                labelW:
                    0.042495479204339964
            }])

            setIsEmpty(false);
        }
    }

    //TODO:: remove when db is not empty.
    // useEffect(() => {
    //     dbEmpty();
    // }, [])

    return (
        <div>
            <PanoramaMap
                isManager={true}
            />
        </div>
    );
}

export default ManagersPage;

