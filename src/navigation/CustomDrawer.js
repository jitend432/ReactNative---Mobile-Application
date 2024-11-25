import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { useDispatch } from "react-redux";
import { Image, ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { DeleteUserInfoAction, LogoutAction } from "../redux/action";



const CustomDrawer =(props)=> {
    const { navigation } = props;

    const dispatch = useDispatch();

    const handleLogout =()=> {  
        dispatch(LogoutAction());
        dispatch(DeleteUserInfoAction());
             }
    return(
        <View style={{flex:1}}>

            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'white'}}>

                <ImageBackground source={require('../assets/image4.jpg')} style={{padding:20}}>
                    <Image source={require('../assets/default.jpg')} style={{height:80, width:80,borderRadius:40,marginBottom:10}}></Image>
                    <Text style={{color:'black',fontSize:20, fontFamily:'Roboto-Medium',fontWeight:'bold'}}>Jitendra Pratap</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={{color:'black',fontSize:12, marginTop:5}}>View Profile</Text>
                    </TouchableOpacity>
                </ImageBackground>

                <View style={{flex:1,paddingTop:10}}>
                <DrawerItemList {...props}/>
                </View>

            </DrawerContentScrollView> 

<View style={{padding:20,backgroundColor:'#d6d6c9',borderTopColor:'#ccc'}}>
    

    
    
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="sign-out" size={30} color="#0077B5" style={{marginHorizontal:10}} />
            <Text style={{color:"black"}}>Signout</Text>
          </TouchableOpacity>
</View>



        </View>
    )
}

export default CustomDrawer;

