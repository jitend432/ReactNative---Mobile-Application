import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
//import ChoosePhoto from '../Screens/ChoosePhoto';


const BusinessNew = () => {

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [contact3, setContact3] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [status, setStatus] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [googleMap, setGoogleMap] = useState('');

  const handleSubmit = () => {
    
    console.log('Form submitted');
  };




  return (

    <ScrollView contentContainerStyle={{backgroundColor:'#ffffff'}}>
     <View style={styles.container}>

    <View style={styles.headingContainer}>
        <Text style={styles.headingContainerText}>Business Info</Text>
    </View>

    {/* Business Name */}

    <View>
        <Text style={styles.textInputHeading}>Business Name *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Business Name' style={styles.inputText}></TextInput>
    </View>

    {/* Business Type *  */}

    <View>
        <Text style={styles.textInputHeading}>Business Type *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Select Business Type' style={styles.inputText}></TextInput>
    </View>

    {/* Street Address *  */}

    <View>
        <Text style={styles.textInputHeading}>Street Address *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Street Address' style={styles.inputText}></TextInput>
    </View>

    {/* Country *  */}

    <View>
        <Text style={styles.textInputHeading}>Country *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Select' style={styles.inputText}></TextInput>
    </View>

    {/* State */}


    <View>
        <Text style={styles.textInputHeading}>State *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Select' style={styles.inputText}></TextInput>
    </View>

   {/* City */}
    <View>
        <Text style={styles.textInputHeading}>City *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Select' style={styles.inputText}></TextInput>
    </View>

    {/* Contact 1*/}

    <View>
        <Text style={styles.textInputHeading}>Contact 1 *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Contact 1' style={styles.inputText}></TextInput>
    </View>


    {/* Contact 2*/}

    <View>
        <Text style={styles.textInputHeading}>Contact 2 *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Contact 2' style={styles.inputText}></TextInput>
    </View>

    {/* Contact 3*/}

    <View>
        <Text style={styles.textInputHeading}>Contact 3 *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Contact 3' style={styles.inputText}></TextInput>
    </View>


    {/* Business Photo*/}

    <View>
        <Text style={styles.textInputHeading}>Business Photos *</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <ChoosePhoto/> */}
        <View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#1255', borderRadius:10}}>
  <Button title="Choose File" color=""/>
 <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}></Text>
</View>
    </View>

    {/* Business Email */}

    <View>
        <Text style={styles.textInputHeading}>Business Email *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Business Email' style={styles.inputText}></TextInput>
    </View>

    {/* Status */}

    <View>
        <Text style={styles.textInputHeading}>Status *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Select Status' style={styles.inputText}></TextInput>
    </View>

    {/* Business Website */}

    <View>
        <Text style={styles.textInputHeading}>Business Website *</Text>
    </View>

    <View>
        <Text style={styles.descHeading}>(Please add your business website link if any.)</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Business Website Link' multiline={true} style={styles.inputText}></TextInput>
    </View>

    {/* Description  */}

    <View>
        <Text style={styles.textInputHeading}>Description *</Text>
    </View>

    <View>
        <Text style={styles.descHeading}>(Please add your business details and links if any.)</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Description' multiline={true} style={styles.inputText}></TextInput>
    </View>

    {/* Set Google Map   */}

    <View>
        <Text style={styles.textInputHeading}>Set Google Address *</Text>
    </View>

    <View>
        <Text style={styles.descHeading}>(Please add your business location link.)</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Set Google Address' multiline={true} style={styles.inputText}></TextInput>
    </View>

    
    <View>
    <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity>
    </View>


     </View>
     </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20, 
    },

    headingContainer:{
    backgroundColor:'#008374',
    borderRadius:5,
    marginBottom:20,
    },

    headingContainerText:{
    fontSize:25,
    fontWeight:'900',
    padding:5,
    color:'#ffffff',
    paddingLeft:10
    },

    textInputHeading:{
    fontSize:20,
    fontWeight:'900',
    paddingBottom:10,
    marginLeft:5,
    color:'#000'
    },
    textInputContainer:{
    borderColor: '#008374',
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom:20, 
    },
    
    inputText:{
    paddingHorizontal: 10,
    fontSize:20,
    color:'#000' 
    },

    descHeading:{
    fontSize:15,
    fontWeight:'900',
    paddingBottom:12,
    marginLeft:5,
    color:'#000'
    },

    button: {
    backgroundColor:'red',
    borderRadius:8,
    marginBottom:10,
    marginTop:12
    },

    buttonText: {
    fontSize:20,
    padding:10,
    textAlign:'center',
    fontWeight:'900',
    color:'#ffffff'
    }
});

export default BusinessNew;
