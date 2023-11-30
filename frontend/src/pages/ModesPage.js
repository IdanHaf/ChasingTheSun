import React from 'react';
import Labels from "../components/homePage/yellowcar.svg";
import Header from "../components/homePage/Header";
import '../styles/ModesPage.css'

//TODO:: maybe with useNavigate can take props such as socket.
//TODO:: use localStorage to keep track of refresh.

function ModesPage(){
    return (
        <div className="bg-gradient-to-r from-black to-gray-500 font-thin">
            <Header />
            <ModesHome/>
        </div>
    );
}


function ModesHome() {
    return (
        <>
            <div className="parallax">
                <div className="hero">
                    <div className="wrapper">
                        <h1 className="mode_title">
                            <span>Gear up!</span>
                            We're going intelligence mode!
                        </h1>
                        <button className="button">Start play mode</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModesPage;