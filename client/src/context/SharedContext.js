import React, { createContext, useReducer } from "react";
import { initialState, reduce } from "../reducers/Reducer";
export const ChatContext = createContext();

export default function SharedContext({ children }) {
  const [state,dispatch]=useReducer(reduce,initialState)
  
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
