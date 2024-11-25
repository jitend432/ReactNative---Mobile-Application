/**
 * Sample React Native App
 * https://github.com/facebook/react-native
*
* @format
*/

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";
import MainNavigator from "./src/navigation/MainNavigator";



const App =() => {
  
  return (  
 
    <Provider store = {store}>

      <PersistGate persistor = {persistor}>

        <MainNavigator/>
        
      </PersistGate>

    </Provider>
    
    
  )
}
export default App;