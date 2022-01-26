import { createGlobalStyle } from "styled-components";

/*
 this file works similar like a global css file and will apply the styles to all 
 Components wich have the GlobalStyles imported.
*/

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100&display=swap');

    * {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        // outline: 2px solid pink;
    }

    body {
        background-color:   white;
        color: black;
   
    }
`;



