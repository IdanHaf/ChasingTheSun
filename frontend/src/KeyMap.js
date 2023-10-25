// a component that shows the current pressed keys
import React from 'react';
function Key(props) {
    const letter = props.kind.toLowerCase();
    
    function handleKeyDown(event) {
        
        // if (event.key === 'i') {
        //     event.preventDefault();
        //     event.stopPropagation();
        //   console.log("pressed", letter);
        // }
    }
    return (
        <div onKeyDown={handleKeyDown} className={"border opacity-60 rounded-md w-6 h-6 p-1 pt-0 flex justify-start items-start bg-gray-600 text-xs text-white active:translate-y-0.5 active:translate-x-0.5"}>
            {props.kind}
        </div>
    )
}
function KeyMap(props) {
    return (
        <div className="w-16 h-16">
            
            <div className="grid grid-cols-3 gap-4">
            <div/>
            <Key kind='W'/>
            <div/>
            </div>
            <div className=" grid-cols-3 grid gap-4">
            <Key kind='A'/> 
            <Key kind='S'/>
            <Key kind='D'/>
            </div>
        </div>
    )
};

export default KeyMap;