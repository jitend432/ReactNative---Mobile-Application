import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SearchBusiness from "../screens/Business/SearchBusiness";
import PromoteBusiness from "../screens/Business/PromoteBusiness";
import DrawerNav from "./DrawerNav";
import ViewProfile from "../screens/Profile/ViewProfile";
import EditProfile from "../screens/Profile/EditProfile";
import SearchMember from "../screens/Members/SearchMember";
import AddMatrimonial from "../screens/Matrimonial/AddMatrimonial";
import PostJob from "../screens/Jobs/PostJob";
import PostEvent from "../screens/Event/PostEvent";
import SearchEvent from "../screens/Event/SearchEvent";
import SearchPartner from "../screens/Matrimonial/SearchPartner";
import SearchActivity from "../screens/SocialActivities/SearchActivity";
import PostActivity from "../screens/SocialActivities/PostActivity";
import AllService from "../screens/ServicesScreen/AllService";
import Jobs from "../screens/Jobs/Jobs";




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
        
            <Stack.Screen name="Drawer" component={DrawerNav}  options={{ headerShown: false }}/>
            <Stack.Screen name="Search Business" component={SearchBusiness}/>
            <Stack.Screen name="Promote Business" component={PromoteBusiness}/>
            <Stack.Screen name="Profile" component={ViewProfile}/>
            <Stack.Screen name="Edit Profile" component={EditProfile}/>
            <Stack.Screen name="Search Member" component={SearchMember}/>
            <Stack.Screen name="Add Matrimonial" component={AddMatrimonial}/>
            <Stack.Screen name="Post Job" component={PostJob}/>
            <Stack.Screen name="Jobs" component={Jobs}/>
            <Stack.Screen name="Search Event" component={SearchEvent}/>
            <Stack.Screen name="Post Event" component={PostEvent}/>
            <Stack.Screen name="Search Partner" component={SearchPartner}/>
            <Stack.Screen name="Search Activity" component={SearchActivity}/>
            <Stack.Screen name="Post Activity" component={PostActivity}/>
            <Stack.Screen name="All Service" component={AllService}/>
            
        </Stack.Navigator>

    )
}
export default AppNavigator;