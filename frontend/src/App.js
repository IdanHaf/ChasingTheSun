
import React, { useState } from 'react';
import './App.css';
import Counter from './Counter';


function App() {

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-4 text-center">React Basics</h1>

            <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1697820801337!6m8!1m7!1se2U9Q_eyUlOIqrt9byrCfA!2m2!1d40.75403943954401!2d-73.99197153053622!3f324.1710339446496!4f21.36979247343878!5f1.22634496099663"
                    title="Embedded Content from Example.com" width="100%" height="100%" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <Counter>

            </Counter>
        </div>
    );
}

export default App;
