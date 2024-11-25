import React from "react";
import { useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";


 const MainNavigator = () => {
    const token = useSelector(state =>state.AuthReducer.authToken);
    return (

        <NavigationContainer>
            {/* {console.log("Token value:", token)} */}
            {
                token === null || token === undefined ?
                <AuthNavigator/>:
                <AppNavigator/>
            }
        </NavigationContainer>


        
    )
}

export default MainNavigator; 