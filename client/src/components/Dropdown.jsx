import React, { useState } from 'react'

function Dropdown({ selected, setSelected }) {

    const [isActive, setIsActive] = useState(false);
    const options = ["Rooms", "Chat", "Events"];

    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {selected}
                
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
                        <div onclick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }} 
                        className="dropdown-item">
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown






