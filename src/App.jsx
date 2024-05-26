import "./App.css";
import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducerMethod } from "./Utility/ReducerMethod";
import Routing from "./Routing";
export const DataContext = createContext();
function App() {
  return (
    <DataContext.Provider value={useReducer(reducerMethod, initialState)}>
      <Routing/>
    </DataContext.Provider>
  );
}

export default App;
