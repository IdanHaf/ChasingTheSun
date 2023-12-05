import React from 'react';
import '../styles/ModesPage.css';
import Header from "../components/homePage/Header";

function IntelligenceMode(){
    return (
        <div className="bg-gradient-to-r from-black to-gray-700 font-thin">
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
                    <div className="wrapper flex flex-col">
                        <h1 className="mode_title">
                            <span>Gear up!</span>
                            We're going intelligence mode!
                        </h1>

                        <a className="button w-1/4 text-center hover:scale-110" href="/cluesGame">
                            Start play mode
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IntelligenceMode;

