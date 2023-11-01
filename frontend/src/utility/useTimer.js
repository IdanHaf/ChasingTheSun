import { useState, useEffect } from 'react';

function useTimer(state, interval)
{
    const [postState, setPostState] = useState(false);
    useEffect(() => {
        if(state)
        {
            const timer = setTimeout(() => {
                setPostState(true);
            }, interval);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [state]);
    return postState;
}