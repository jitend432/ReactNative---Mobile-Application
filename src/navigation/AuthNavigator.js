import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";




const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();
    
    return (

        <Stack.Navigator>
            <Stack.Screen name={'Login'} component={Login}/>
            <Stack.Screen name={'SignUp'} component={SignUp}/>
        </Stack.Navigator>
        
    )
}
export default AuthNavigator;