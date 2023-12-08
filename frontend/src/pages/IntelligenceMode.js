import React, { useRef } from 'react';
import '../styles/ModesPage.css';
import Header from "../components/homePage/Header";

function IntelligenceMode(){
    const scrollRef = useRef(null);

    const handleScrollClick = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-gradient-to-r from-black to-gray-700 font-thin">
            <Header />

            <div className="container_div flex flex-col">

                <div id="intelligence_mode_start" className="h-screen">
                    <ModesHome />
                    <div className="world_div -bottom-1/3 w-full h-1/2
                                    shadow-[rgba(183,0,154,0.5)_0px_0px_80px_10px]
                                    hover:shadow-[rgba(57,255,0,0.5)_0px_0px_40px_10px]"
                         onClick={handleScrollClick}
                    >
                    </div>
                </div>

                <ModesCircle />

                <div id="intelligence_mode" ref={scrollRef}
                     className="flex items-center w-full h-screen relative bg-black z-10"
                >
                    <div className="flex justify-around w-full h-1/2 mx-10 select-none">
                        <div className="h-full text-white flex flex-col gap-5 text-xl font-mono justify-around">
                            <p className="text-white flex-col flex gap-5 font-mono h-60">
                                <h1 className="mode_title">
                                    <span className="special_span">YOUR MISSION:</span>
                                </h1>
                                <span>We will give you the target.</span>
                                <span>You will have to find it on your own.</span>
                                <span>You have 5 minutes.</span>
                            </p>

                            <div>
                                <a className="play_button w-1/4 text-center border-2 border-white hover:bg-white
                                              hover:text-black"
                                   href="/cluesGame"
                                >
                                    Start play mode
                                </a>
                            </div>
                        </div>
                        <img className="intelligence_img rounded-lg
                                        hover:shadow-[rgba(0,0,154,0.5)_0px_0px_100px_20px]"
                             src={"detective_photo.png"}/>
                    </div>
                    <div className="absolute bottom-0 w-full h-0 flex justify-center">
                        <div className="w-1/3 shadow-[rgba(100,0,155,0.7)_0px_0px_80px_30px]">
                        </div>
                    </div>
                </div>

            </div>
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

                        <a className="button w-1/4 text-center hover:scale-110" href="#intelligence_mode_circle">
                            Mode Information
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

function ModesCircle() {
    const leftDivRef = useRef(null);
    const rightDivRef = useRef(null);

    const handleHover = () => {
        if (leftDivRef.current && rightDivRef.current) {
            leftDivRef.current.style.visibility = 'visible';
            leftDivRef.current.style.transform = 'translateX(20%)';
            rightDivRef.current.style.visibility = 'visible';
            rightDivRef.current.style.transform = 'translateX(-20%)';
        }
    };

    const handleLeave = () => {
        if (leftDivRef.current && rightDivRef.current) {
            leftDivRef.current.style.transform = 'translateX(10%)';
            rightDivRef.current.style.transform = 'translateX(-10%)';
        }
    };

    return (
        <div id="intelligence_mode_circle"
             className="flex items-center w-full h-screen relative z-10 bg-gradient-to-r from-black to-gray-800">
            <div className="flex justify-center items-center w-full h-1/2 mx-10 text-white select-none">
                <div ref={leftDivRef}
                     className="slide_on_car w-1/4 h-1/3 rounded-lg flex justify-center items-center
                                shadow-[rgba(183,0,154,0.5)_0px_0px_80px_10px]"
                >
                    <a className="modes_button rounded-lg w-1/2 text-center border-2 border-white
                                  hover:bg-white hover:text-black"
                       href="#intelligence_mode"
                    >
                        single-player
                    </a>
                </div>
                <div className="circle_modes_div w-96 h-96 flex items-center justify-center
                                bg-gradient-to-r from-black to-gray-800
                                shadow-[rgba(0,0,154,0.5)_0px_0px_80px_10px]
                                hover:shadow-[rgba(183,0,154,0.5)_0px_0px_40px_10px]"
                     onMouseEnter={handleHover}
                     onMouseLeave={handleLeave}
                >
                    <h1 className="mode_title text-center">
                        <span className="special_span">WELCOME AGENT</span>
                    </h1>
                </div>
                <div ref={rightDivRef}
                     className="slide_on_intelligence w-1/4 h-1/3 rounded-lg flex justify-center items-center
                                shadow-[rgba(183,0,154,0.5)_0px_0px_80px_10px]"
                >
                    <a className="modes_button w-1/2 rounded-lg text-center border-2 border-white
                                  hover:bg-white hover:text-black"
                       href="./yellowCarMode/startLobby"
                    >
                        multiplayer
                    </a>
                </div>
            </div>
        </div>
    );
}

export default IntelligenceMode;

