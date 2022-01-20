import React, { useState } from 'react'
import styled from 'styled-components';
import { GlobalStyles } from "./GlobalStyles.style.jsx" // works like a global css file.

const Container = styled.div`
    width:300px;
    height: 500px;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    position:relative;
    top: 2rem;
    left: 2rem;
    margin: 2rem 0;
    padding: 1rem;
`;

const Option = styled.button`
    font-size: 18px;
    color: white;
    text-align: center;
    width: 200px;
    height: 80px;
    font-size: 2rem
    display: flex;
    margin: 2.6rem;
    border-radius: 20px;
    background-color: rgba(102, 16, 83, 0.698);
    &:hover {
        position: relative;
        left: 10px;
        border-radius:40px;
        transition: 1s;
    }
`;

// Maroua wants to have the ContainerBorder as shadow! :)

export default function Options() {

    const RouteToProjects = () => {
    
    }

    const RouteToEvents = () => {
    
    }
    
    return (
        <div>
            <>
            <Container>  
                <Option>View all Projects</Option>
                <Option>Upcoming Events</Option>
                <Option>Events</Option>
            </Container>
            </>
        </div>
    )
}

