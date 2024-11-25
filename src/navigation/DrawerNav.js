import React from "react";
import Home from "../screens/Home/Home";
import CustomDrawer from "./CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchMember from "../screens/Members/SearchMember";
import Jobs from "../screens/Jobs/Jobs";
import SearchBusiness from "../screens/Business/SearchBusiness";
import SearchPartner from "../screens/Matrimonial/SearchPartner";
import AllServices from "../screens/ServicesScreen/AllService";
import DashboardCard from "../screens/Dashboard/Dashboard";
import BusinessOld from "../screens/Business/BusinessOld";


const Drawer = createDrawerNavigator();

function DrawerNav () {
    return (
             
        <Drawer.Navigator drawerStyle={{
            backgroundColor: '#ffffff',
            width: 200,
          }}
          screenOptions={{
            drawerActiveTintColor: 'blue',
            drawerInactiveTintColor: 'black',
            drawerLabelStyle: {
              fontSize: 20,
              fontWeight: '600',
            },
          }}
         drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen  name='Home' component={Home}/>
            <Drawer.Screen  name='Dashboard' component={DashboardCard}/>
            <Drawer.Screen  name='Members' component={SearchMember}/>
            <Drawer.Screen  name='Jobs' component={Jobs}/>
            <Drawer.Screen  name='Business' component={SearchBusiness}/>
            <Drawer.Screen  name='Matrimonial' component={SearchPartner}/>
            <Drawer.Screen  name='Services' component={AllServices}/>
            <Drawer.Screen  name='BusinessOld' component={BusinessOld}/>
        </Drawer.Navigator>
        
    )
}

export default DrawerNav;