import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { DoLogin } from '../../services/apiCalls';
import { LoginAction, SaveUserInfoAction } from '../../redux/action';
import { useDispatch} from 'react-redux';
//import SignUp from './SignUp';


const Login =  ({navigation}) =>  {
  
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   // const [loginStatus, setLoginStatus] = useState('');


   const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible) };

    const dispatch = useDispatch();
  
    const handleLogin = async() => {

     return DoLogin(mobile, password)

     .then(response => {
          const res = JSON.parse(JSON.stringify(response));
          const Token = res.token.token
             
          dispatch(SaveUserInfoAction(res))
          dispatch(LoginAction(Token))
     })
     .catch(error => {
      console.log(error)
     })
    }

    const navigateToSignUp = () => {
      navigation.navigate('SignUp');
    };
    

    return (
                  
  <ImageBackground source={require('../../assets/R1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <TextInput style={styles.input} placeholder='Enter mobile number' onChangeText={text => setMobile(text)}
             value={mobile}></TextInput>
             <View style={{width:'100%', alignItems:'center'}}>
          <TextInput style={styles.input} placeholder='Enter Password' onChangeText={text => setPassword(text)}
             value={password} secureTextEntry={!isPasswordVisible}></TextInput>
             <TouchableOpacity  style={{ position: 'absolute', right: 40, top: 14 }} onPress={togglePasswordVisibility}>
        <Image
          source={isPasswordVisible ? require('../../assets/eye-open-2-128.png') : require('../../assets/eye-close-fill-4-128.png')}
          style={{ width: 20, height: 20, }}
        />
      </TouchableOpacity>
             </View>
          <TouchableOpacity style={styles.button1} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login With password</Text>
          </TouchableOpacity>
          <Text style={{fontSize:25,fontWeight:'500'}}>OR</Text>
          <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>Login With OTP</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row'}}>
            
          <Text style={{fontSize:20, marginBottom:10}}>New User?</Text>
          
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={{fontSize:20, color:'blue'}}> Signup</Text>
          </TouchableOpacity>
          </View>

               {/* <Text style={styles.status}>{loginStatus}</Text>*/}
          
        </View>
      </View>
  </ImageBackground>
    );
  };

  
export default Login;
  
  const styles = StyleSheet.create({
    background:{
      flex:1,
      resizeMode:'center',
      
      
      

      },

    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center'
      },
    card: {
      //backgroundColor: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      borderRadius: 10,
      padding: 20,
      width:'90%',
      height:'auto',
      alignItems:'center'
      
    },
    title: {
      fontSize: 30,
      fontWeight:'900',
      color: '#000',
      margin:10,
      marginBottom:30 
    },
    input: {
      width: '90%',
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 10,
      fontSize:20,
      padding:10
      },
    status: {
      marginTop: 20,
      color: '#fff',
    },

    button1: {
      backgroundColor: '#008374',
      padding:10,
      margin:10,
      borderRadius: 5,
      width:'90%',
      alignItems:'center'
     },
     button2: {
      backgroundColor: '#FF9933',
      padding:10,
      margin:10,
      borderRadius: 5,
      width:'90%',
      alignItems:'center',
      marginBottom:20
     },

    buttonText: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight:'500',
    },
    
  });