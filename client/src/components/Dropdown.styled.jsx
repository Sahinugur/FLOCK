import React, { useState } from 'react'
import styled from 'styled-components';
import { GlobalStyles } from "./GlobalStyles.style.jsx" // works like a global css file.



// This is a styled React component!

export default function Menu({ selected, setSelected }) {

    const [isActive, setIsActive] = useState(false);
    const options = ["Joined Rooms","Joined Projects"];

    return (
        <Dropdown>
            <DropdownBtn onClick={(e) => setIsActive(!isActive)}>
                {selected}

            </DropdownBtn>
            {isActive && (            // if active map trough the Elements of the DropdownItems and show them.
                <DropdownContent>
                    {options.map((option) => (
                        <DropdownItem onclick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }}>
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownContent>
            )}
        </Dropdown>
    );
}

// **** styled Components ****




const Dropdown = styled.div`
font-size: 14px;
user-select: none;
margin-left: 100px;
height: 50px;
width: 100px;
margin: 100px auto;
padding: 10px;
color: white;
background-color: black;
font-weight: bold;
cursor: pointer;
postion: relative;
border-radius: 20px;
left: 50px;
display: grid;
align-items: center;
justify-content: space-between;
`;

const DropdownBtn = styled.div`
display:grid;
padding: 10px;
background-color: black;
font-weight: bold;
color: white;
display: grid;
align-items: center;
justify-content: space-between;
cursor: pointer;

&:hover{
    transition: all 1s;
    background-color: rgba(80,30,10,0.1);
}
`;

const DropdownContent = styled.div`

display:grid;
font-weight: 300;
background: black;
color: white;
cursor: pointer;
&:hover{
    transition: all 1s;
    background-color: rgba(80,30,10,0.1);
}
`;

const DropdownItem = styled.div`

display:grid;
background: black;
color: white;
text-align:center;
padding: 1.5rem;
cursor: pointer;
transition: all 0.25s;

&:hover {
    background-color: rgba(80,30,10,0.1);   
}
`;

