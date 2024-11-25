import React,{useState, useEffect} from "react";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { View, ImageBackground,StyleSheet, Text,TextInput, TouchableOpacity} from 'react-native';


const SignUp = ({navigation}) =>{

    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [communitiesData, setCommunnitiesData] = useState(null);
    const [communities, setCommunities] = useState(null);
    const [communitiesName, setCommunitiesName] = useState(null);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUwLCJjb21tdW5pdHlJZCI6MTEsImlzQWRtaW4iOjEsInBlcm1pc3Npb25JZCI6MSwiaWF0IjoxNzE0NTM3MTg2LCJleHAiOjE3MTU0MDExODZ9.s5cMi0P55WIxRIH-x8BG-aLRsxDhfDxnhxln43EzpoU"
  useEffect (()=> {
    axios.get('https://uat-api.socialbharat.org/api/all-active-communities',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        //console.log(response.data.data)
        setCommunnitiesData(response.data.data);
    })
    .catch(error=>{
        console.error('Error fetching data:',error);
    })
},[])

    const communityDrop = communitiesData ? communitiesData.map(community => ({
      label: community.name,
      value: community.id.toString(),
      })) : [];

    handleSignup =()=>{}

    const navigateToLogin = () => {
      navigation.navigate('Login');
    };

    return (

    <ImageBackground source={require('../../assets/R1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign up</Text>
          <TextInput style={styles.input} placeholder='Enter your name' onChangeText={text => setMobile(text)}
             value={mobile}></TextInput>
          <TextInput style={styles.input} placeholder='Enter your mobile number' onChangeText={text => setPassword(text)}
             value={password} secureTextEntry={true}></TextInput>
             
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={communityDrop}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Community"
        searchPlaceholder="Search..."
        value={communities}
        onChange={item => { setCommunities(item.value); setCommunitiesName(item.label)  }}
        />


      <TouchableOpacity style={styles.button1} onPress={handleSignup}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {/* <Text style={{fontSize:25,fontWeight:'500'}}>OR</Text>
        <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText}>Login With OTP</Text>
        </TouchableOpacity> */}
        <View style={{flexDirection:'row'}}>
          <View>
        <Text style={{fontSize:20, marginBottom:10}}>Already User?</Text>
        </View>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={{fontSize:20, color:'blue'}}> Login</Text>
        </TouchableOpacity>
        </View>
        
        <View style={{width: '90%', marginTop:10}}>
          
            <Text style={{ fontSize:20, }}>If you encounter any issues during the registration process, please
            
            <View style={{}}> 
            <TouchableOpacity style={{marginBottom: -5}}>
            <Text style={{fontSize:20, color:'#0d19ff'}}> click here </Text>
            </TouchableOpacity>
            </View>for assistance with your queries. </Text>
            
              
               
            {/* <Text style={{fontSize:20}}>.</Text> */}
           
        </View>
            
          
        </View>
      </View>
  </ImageBackground>
        
    )
}

export default SignUp;

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
      alignItems:'center',
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
      fontWeight: '500',
    },


    dropdown: {
      width: '90%',
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 10,
      fontSize:20,
      padding:10,

      //margin: 16,
      height: 50,
      //backgroundColor: 'white',
      //borderRadius: 10,
      //padding: 12,
      //shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      //shadowOpacity: 0.2,
      //shadowRadius: 1.41,
     //elevation: 5,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 20,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    TextInputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    
  });