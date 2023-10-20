import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        setCount(count - 1);
    };

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Counter: {count}</h1>

            <div>
                <button
                    onClick={incrementCount}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Increment
                </button>
                <button
                    onClick={decrementCount}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Decrement
                </button>
            </div>

            <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1697820801337!6m8!1m7!1se2U9Q_eyUlOIqrt9byrCfA!2m2!1d40.75403943954401!2d-73.99197153053622!3f324.1710339446496!4f21.36979247343878!5f1.22634496099663"
                    title="Embedded Content from Example.com" width="100%" height="100%"  loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>



        </div>
    );
}

function App() {

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-4 text-center">React Basics</h1>
            <Counter />
        </div>
    );
}

export default App;
