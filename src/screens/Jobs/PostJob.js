import React, { useState,useRef } from 'react';
import { View, Text, TextInput,StyleSheet, ScrollView, TouchableOpacity, Button, KeyboardAvoidingView } from 'react-native';
//import ChoosePhoto from '../Screens/ChoosePhoto';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';


const PostJob = () => {
    const [checked, setChecked] = useState('No');

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
  

  const richText = useRef();

  const handleGetText = async () => {
    if (richText.current) {
      const html = await richText.current.getContentHtml();
      console.log('HTML:', html);
    }
  };

  

  const dataEventType = [
    { label: 'Private Job', value: '1' },
    { label: 'Government Job', value: '2' },
    { label: 'Other', value: '3' }
  ]

  const handleSubmit = () => {
    
    console.log('Form submitted');
  };




  return (

    <ScrollView contentContainerStyle={{backgroundColor:'#ffffff'}}>
     <View style={styles.container}>

    <View style={styles.headingContainer}>
        <Text style={styles.headingContainerText}>Create New Job</Text>
    </View>

    {/* Business Name */}

    <View>
        <Text style={styles.textInputHeading}>Job Title :</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Job Title' style={styles.inputText}></TextInput>
    </View>

    {/* Business Type *  */}

    <View>
        <Text style={styles.textInputHeading}>Job Sector :</Text>
    </View>

    <View style={styles.textInputContainer}>
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataEventType}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Job Sector"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    {/* Street Address *  */}

    <View>
        <Text style={styles.textInputHeading}>Job Type :</Text>
    </View>

    <View style={styles.textInputContainer}>
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataEventType}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Job Type"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    {/* Country *  */}

    <View>
        <Text style={styles.textInputHeading}>Other Subheading (Optional) :</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='i.e. company name or organization or other' style={styles.inputText}></TextInput>
    </View>

    {/* State */}


    <View>
        <Text style={styles.textInputHeading}>State *</Text>
    </View>

    <View style={styles.textInputContainer}>
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataEventType}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Job Type"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

   {/* City */}
    <View>
        <Text style={styles.textInputHeading}>City *</Text>
    </View>

    <View style={styles.textInputContainer}>
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataEventType}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Job Type"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    {/* Contact 1*/}

    <View>
        <Text style={styles.textInputHeading}>Address :</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='i.e company place or organisation address' style={styles.inputText}></TextInput>
    </View>


    {/* Contact 2*/}

    <View>
        <Text style={styles.textInputHeading}>Short Information about Application Fee</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter application fee details' multiline numberOfLines={4} style={[styles.inputText,{textAlignVertical:'top'}]}></TextInput>
    </View>

    {/* Contact 3*/}

    <View>
        <Text style={styles.textInputHeading}>Application Start :</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Contact 3' style={styles.inputText}></TextInput>
    </View>


    {/* Business Photo*/}

    <View>
        <Text style={styles.textInputHeading}>Application End :</Text>

        <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Contact 3' style={styles.inputText}></TextInput>
        </View>

    </View>

    <View>
        <Text style={styles.textInputHeading}>Attachment :</Text>
    </View>

    <View style={styles.textInputContainer}>
        
       <View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#1255', borderRadius:10}}>
       <Button title="Choose File" color=""/>
       <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}></Text>
       </View>

    </View>

    <View>
        <Text style={styles.textInputHeading}>Logo Image (Optional) :</Text>
    </View>

    <View style={styles.textInputContainer}>
        
       <View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#1255', borderRadius:10}}>
       <Button title="Choose File" color=""/>
       <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}></Text>
       </View>

    </View>

    <View>
        <Text style={styles.textInputHeading}>Apply Link</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Description' multiline numberOfLines={4} style={[styles.inputText,{textAlignVertical:'top'}]}></TextInput>
    </View>

    

    

    <View style={styles.textInputContainer}>

    <RichToolbar
        style={{ backgroundColor: '#f1f1f1', }}
        getEditor={() => richText.current}
      />
    
      <RichEditor
        ref={richText}
        initialContentHTML="<p>Type Here!</p>"
        style={{ flex: 1, padding:5,}}
      />
      
      {/* <Button title="Get HTML Content" onPress={handleGetText} /> */}
    

    </View>



    <View>
        <Text style={styles.textInputHeading}>Apply From URL ?</Text>
    </View>

    <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
        <RadioButton.Item  value="first" label="Yes" />
        <RadioButton.Item label="No" value="second" />
    </RadioButton.Group>

    

    {/* Business Website */}

    <View>
        <Text style={styles.textInputHeading}>Apply With Resume ?</Text>
    </View>

    <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
        <RadioButton.Item label="Yes" value="first" />
        <RadioButton.Item label="No" value="second" />
    </RadioButton.Group>

    

    {/* Description  */}

    <View>
        <Text style={styles.appDescriptionHeading}>सामाजिक भारत</Text>
    </View>

    <View>
        <Text style={styles.appDescription}>● एक ही समुदाय के लोगों को आपस में जोड़कर उन्हें सामाजिक रूप से जोड़ता है, जिससे समृद्धि और समर्थन में वृद्धि होती है।</Text>
        <Text style={styles.appDescription}>● समुदाय के लोगों को समृद्धि के साथ ही अपने समुदाय से ही जीवनसाथी ढूंढने की सुविधा प्रदान करता है।</Text>
        <Text style={styles.appDescription}>● सदस्यों को रोजगार और व्यापार की खोज के लिए एक सामाजिक मंच प्रदान करने से उन्हें अधिक अवसर मिलते हैं।</Text>
        <Text style={styles.appDescription}>● समुदाय के सदस्यों के बीच सामूहिक समर्थन बढ़ता है, जिससे आपसी सहारा मिलता है और समस्याओं का समाधान होता है।</Text>
        <Text style={styles.appDescription}>● समुदाय के सदस्यों को जागरूकता और शिक्षा के साधन के रूप में जोड़कर, उन्हें सामाजिक मुद्दों के प्रति जागरूक बनाए रखता है।</Text>
    </View>

    <View>
        <Text style={styles.appDescriptionHeading}>Social Bharat</Text>
    </View>

    <View>
        <Text style={styles.appDescription}>● Brings together people of the same community, fostering social connectivity, leading to growth and support.</Text>
        <Text style={styles.appDescription}>● Provides the community members with the convenience of finding life partners within their community, along with prosperity.</Text>
        <Text style={styles.appDescription}>● By offering a social platform for job and business search, it provides community members with more opportunities.</Text>
        <Text style={styles.appDescription}>● Enhances mutual support among community members, providing a collective solution to problems.</Text>
        <Text style={styles.appDescription}>● By connecting community members through awareness and education, it keeps them informed about social issues.</Text>
    </View>

    

    
    <View>
    <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Submit</Text>
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
    fontWeight:'800',
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
    marginTop:20
    },

    buttonText: {
    fontSize:20,
    padding:10,
    textAlign:'center',
    fontWeight:'900',
    color:'#ffffff'
    },
    dropdown: {
        height: 50,
        paddingLeft: 10,
        color:'#000',
        padding:5
        },
          
        item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color:'#000'
        },
        
        textItem: {
        flex: 1,
        fontSize: 20,
        color:'#000'
        },
        
        placeholderStyle: {
        fontSize: 20,
        },
            
        selectedTextStyle: {
        fontSize: 20,
        color:'#000'
        },
    
        TextInputSearchStyle: {
        height: 40,
        fontSize: 20,
        color:'#000'
        },

        appDescriptionHeading:{
            fontSize:22,
            fontWeight:'900',
            paddingBottom:10,
            marginLeft:5,
            color:'#000',
            marginTop:20
            },

            appDescription:{
                fontSize:20,
                fontWeight:'500',
                paddingBottom:10,
                marginLeft:5,
                color:'#000'
                },
});

export default PostJob;
