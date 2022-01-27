import React,{useState} from 'react';
import "./dropdown.css";
import "../../pages/home.css";


export default function Menu({ selected, setSelected }) {

    
    const [isActive, setIsActive] = useState(false);
    const options = ["Joined Rooms","Joined Projects"];


    return (
        <>
        <div className = "Dropdown">
            <div className = "DropdownBtn" onClick={(e) => setIsActive(!isActive)}>
                {selected}
            </div>
            {isActive && (
                 <div className = "DropdownContent">
                 {options.map((option) => (
                     <div className = "DropdownItem" onclick={(e) => {
                         setSelected(option)
                         setIsActive(false)
                     }}>
                         {option}
                     </div>
                 ))}
             </div >
            )}
        </div>
        </>
    )
}


