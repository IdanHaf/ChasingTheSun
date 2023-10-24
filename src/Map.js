import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.panoRef = React.createRef();
    }

    componentDidMount() {
        // Dynamically load the Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=streetview`;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', () => {
            this.initMap();
        });

        document.head.appendChild(script);
    }

    initMap() {
        if (window.google && window.google.maps && window.google.maps.StreetViewPanorama) {
            const panorama = new window.google.maps.StreetViewPanorama(this.panoRef.current, {
                position: { lat: 37.869, lng: -122.255 },
                pov: {
                    heading: 270,
                    pitch: 0,
                },
                visible: true,
            });
            panorama.addListener("pano_changed", () => {
                const panoCell = document.getElementById("pano-cell");

                panoCell.innerHTML = panorama.getPano();
            });
            panorama.addListener("links_changed", () => {
                const linksTable = document.getElementById("links_table");

                while (linksTable.hasChildNodes()) {
                    linksTable.removeChild(linksTable.lastChild);
                }

                const links = panorama.getLinks();

                for (const i in links) {
                    const row = document.createElement("tr");

                    linksTable.appendChild(row);

                    const labelCell = document.createElement("td");

                    labelCell.innerHTML = "<b>Link: " + i + "</b>";

                    const valueCell = document.createElement("td");

                    valueCell.innerHTML = links[i].description;
                    linksTable.appendChild(labelCell);
                    linksTable.appendChild(valueCell);
                }
            });
            panorama.addListener("position_changed", () => {
                const positionCell = document.getElementById("position-cell");

                positionCell.firstChild.nodeValue = panorama.getPosition() + "";
            });
            panorama.addListener("pov_changed", () => {
                const headingCell = document.getElementById("heading-cell");
                const pitchCell = document.getElementById("pitch-cell");

                headingCell.firstChild.nodeValue = panorama.getPov().heading + "";
                pitchCell.firstChild.nodeValue = panorama.getPov().pitch + "";
            });

        } else {
            console.error('Google Maps API or StreetViewPanorama not loaded');
        }

        return (
            <script
                src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap&v=weekly"
                defer
            >
            </script>
        )
    }

    render() {
        return <div ref={this.panoRef} style={{ height: '400px' }}></div>;
    }
}

export default Map;
