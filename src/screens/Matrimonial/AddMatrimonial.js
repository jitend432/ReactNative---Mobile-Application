import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, ScrollView, TouchableOpacity, Button, } from 'react-native';
import { PostPdf, PostMultipleImage } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
//import ChoosePhoto from '../Screens/ChoosePhoto';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import Slider from '@react-native-community/slider';
import { launchImageLibrary } from 'react-native-image-picker';



const AddMatrimonial = () => {

  const token = useSelector(state=>state.AuthReducer.authToken);

  const [selectedImageName, setSelectedImageName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [documentUrl, setDocumentUrl] = useState('');
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
  const [numberOfBrother, setNumberOfBrother] = useState('');
  //const [description, setDescription] = useState('');
  const [googleMap, setGoogleMap] = useState('');
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState('');
  const [brotherName, setBrotherName] = useState('');

  const data = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' }
  ]

  

  const dataBrother = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const handleDropdownChange = (item) => {
    setNumberOfBrother(item.value);
    setBrotherName(item.label);
    setShowDescriptionInput(item.value === 'option1' || item.value === 'option2');
  };


const handleUpload = async () => {
    try {
        const doc = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.pdf]
        });
        if (doc) {
            const formData = new FormData();
            formData.append('pdf', {
                uri: doc.uri,
                name: doc.name,
                type: doc.type,
            });
            postDocument(formData);
        } else {
            console.log("No document selected or upload cancelled.");
        }
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log("User cancelled the upload", err);
        } else {
            console.log(err);
        }
    }
};

const postDocument = (formData) => {
    PostPdf(token, formData)
        .then(response => {
            setDocumentUrl(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log("Error posting document:", error);
        });
};

const handleLaunchImageLibrary = () => {
    launchImageLibrary({ mediaType: 'photo', multiple: true }, response => {
    if (!response.didCancel) {
      const selectedImage = response.assets[0]; 
      setSelectedImageName(selectedImage.fileName);
      const formData = new FormData();
      formData.append('images', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      // Post the FormData to the API
      postMultiImage(formData);
     }
  });
};

const postMultiImage = (formData) => {
    PostMultipleImage(token, formData)
    .then(response => {
        setImageUrl(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.log("Error posting document:", error);
    });
};



  const handleSubmit = () => {
    
    console.log('Form submitted');
  };




  return (

    <ScrollView contentContainerStyle={{backgroundColor:'#ffffff'}}>
     <View style={styles.container}>

    <View style={styles.headingContainer}>
        <Text style={styles.headingContainerText}>Matrimonial Info</Text>
    </View>

    {/* Business Name */}

    <View>
        <Text style={styles.textInputHeading}>For Whom, You are creating profile *</Text>
    </View>

    <View style={styles.textInputContainer}>

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Updates For"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    {/* Name *  */}

    <View>
        <Text style={styles.textInputHeading}>Name *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Your Full Name' style={styles.inputText}></TextInput>
    </View>

    {/*Father Name *  */}

    <View>
        <Text style={styles.textInputHeading}>Father Name *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Father Name' style={styles.inputText}></TextInput>
    </View>

    {/* Country *  */}

    <View>
        <Text style={styles.textInputHeading}>Mother Name *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Mother Name' style={styles.inputText}></TextInput>
    </View>

    {/* State */}


    <View>
        <Text style={styles.textInputHeading}>Gender *</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Select' style={styles.inputText}></TextInput> */}

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Gender"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

   {/* City */}
    <View>
        <Text style={styles.textInputHeading}>Date Of Birth *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Select' style={styles.inputText}></TextInput>
    </View>

    {/* Contact 1*/}

    <View>
        <Text style={styles.textInputHeading}>State</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Enter Contact 1' style={styles.inputText}></TextInput> */}

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select State"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>


    {/* Contact 2*/}

    <View>
        <Text style={styles.textInputHeading}>City</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Enter Contact 2' style={styles.inputText}></TextInput> */}

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select City"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    {/* Contact 3*/}

    <View>
        <Text style={styles.textInputHeading}>Subcast</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Select Subcast' style={styles.inputText}></TextInput> */}

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Subcast"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

     {/* Paternal Gotra *  */}

     <View>
        <Text style={styles.textInputHeading}>Paternal Gotra</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Paternal Gotra' style={styles.inputText}></TextInput>
    </View>

     {/*Maternal Gotra *  */}

     <View>
        <Text style={styles.textInputHeading}>Maternal Gotra</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Maternal Gotra' style={styles.inputText}></TextInput>
    </View>

    <View>
        <Text style={styles.textInputHeading}>Manglik</Text>
    </View>

    <View style={styles.textInputContainer}>
        

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Manglic Status"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    <View>
        <Text style={styles.textInputHeading}>Select Education</Text>
    </View>

    <View style={styles.textInputContainer}>
        

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    <View>
        <Text style={styles.textInputHeading}>Job Profile</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Select Subcast' style={styles.inputText}></TextInput> */}

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    <View>
        <Text style={styles.textInputHeading}>Number Of Brother(s)</Text>
    </View>

    <View style={styles.textInputContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          TextInputSearchStyle={styles.TextInputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataBrother}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          onChange={handleDropdownChange}
        />
      </View>
      <View style={styles.textInputContainer}>
      {showDescriptionInput && (
        <TextInput
          style={styles.inputText}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      )}
      </View>
    
    

    <View>
        <Text style={styles.textInputHeading}>Number Of Sister(s)</Text>
    </View>

    <View style={styles.textInputContainer}>
        

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
    </View>

    {/* Package *  */}

    <View>
        <Text style={styles.textInputHeading}>Package</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Your Income' style={styles.inputText}></TextInput>
    </View>

    <View>
        <Text style={styles.textInputHeading}>Height</Text>
    </View>

    <View style={{flexDirection:'row', marginBottom:20}}>
    <Slider
  style={{width: 200, height: 40}}
  minimumValue={0}
  maximumValue={12}
  minimumTrackTintColor="#0075FF"
  maximumTrackTintColor="#0075FF"
  //value={feet}
  //onValueChange={setFeet}
/>

<Slider
  style={{width: 200, height: 40}}
  minimumValue={0}
  maximumValue={12}
  minimumTrackTintColor="#0075FF"
  maximumTrackTintColor="#0075FF"
  //value={inch}
  //onValueChange={setInch}
  
/>
    </View>

    {/* Proposal Photo*/}

    <View>
        <Text style={styles.textInputHeading}>Proposal Photos</Text>
    </View>

    <View>
        <Text style={styles.descHeading}>Add atleast 2 and maximum 5 photos( Should be in .png, .jpg, jpeg format)</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <ChoosePhoto/> */}
        <View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#1255', borderRadius:10}}>
  <Button title="Choose File" color="" onPress={handleLaunchImageLibrary}/>
 <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}>{selectedImageName ? selectedImageName : 'No file choosen'}</Text>
</View>
    </View>

    {/* Biodata */}

    <View>
        <Text style={styles.textInputHeading}>Biodata</Text>
    </View>

    <View>
        <Text style={styles.descHeading}>(Upload biodata in pdf format only)</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Enter Business Email' style={styles.inputText}></TextInput> */}
        
        <View style={{alignItems:'flex-start',padding: 10, backgroundColor:'white',borderColor:'#000', borderRadius:10}}>
      <Button title="Select PDF" onPress={handleUpload} />

</View>

    </View>

    

    

    {/* Description  */}

    <View>
        <Text style={styles.textInputHeading}>Other Details</Text>
    </View>

    <View>
        <Text style={styles.descHeading}>(Please add other details if any.)</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter other Details if any' multiline={true} numberOfLines={4} style={styles.inputText}></TextInput>
    </View>

    

    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
    <View>
    <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    </View>

    <View>
    <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
    </View>
    </View>


     </View>
     </ScrollView>
    
  );
};
export default AddMatrimonial;

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
    borderRadius:20,
    marginBottom:10,
    marginTop:12
    },

    buttonText: {
    fontSize:20,
    padding:10,
    textAlign:'center',
    fontWeight:'900',
    color:'#ffffff',
    paddingHorizontal:40
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
});
