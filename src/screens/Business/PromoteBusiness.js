import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, StyleSheet, TextInput, ScrollView, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { GetStates, GetCities } from '../../services/apiCalls';

const PromoteBusiness = () => {
  const token = useSelector(state =>state.AuthReducer.authToken)
  const [businessName, setBusinessName] = useState('');
  const [businessTypeName, setBusinessTypeName] = useState(null);
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [contact3, setContact3] = useState('');
  const [businessPhotos, setBusinessPhotos] = useState([]);
  const [businessEmail, setBusinessEmail] = useState('');
  const [statusName, setStatusName] = useState(null);
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [googleMap, setGoogleMap] = useState('');

  const [selectedImageName, setSelectedImageName] = useState();
  const [status, setStatus] = useState(null);
  const [businessType, setBusinessType] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isFocus, setIsFocus] = useState(null);


  const data = [
    { label: 'Information Technology (IT)', value: '1' },
    { label: 'Sales', value: '2' },
    { label: 'Marketing', value: '3' },
    { label: 'Manufacturing', value: '4' },
    { label: 'Service', value: '5' },
    { label: 'Finance', value: '6' },
    { label: 'Real Estate', value: '7' },
    { label: 'Healthcare', value: '8' },
    { label: 'Transportation And Logistics', value: '9' },
    { label: 'Hospitality', value: '10' },
    { label: 'Education', value: '11' },
    { label: 'Nonprofit Organizations', value: '12' },
  ];

  const countrydata = [
    { label: 'India', value: 'india' }
  ]

  const statusdata = [
    { label: 'Active', value: 'active' },
    { label: 'InAactive', value: 'inactive' }
  ]

  const showToast = () => {
    ToastAndroid.showWithGravity('Image Uploaded Successfully !', ToastAndroid.LONG, ToastAndroid.TOP); };


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
      postPhoto(formData);
     }
  });
};

const postPhoto = (formData) => {
  axios.post('https://uat-api.socialbharat.org/api/upload-multiple-images', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
    },
  })
    .then(response => {
      //console.log(response)
      if (response.status === 200) {
       setBusinessPhotos(response.data.data.files);
        console.log(response.data.data.files)
        showToast();
        //Alert.alert('Photo posted successfully!');
      } else {
        throw new Error('Error posting photo');
      }
    })
    .catch(error => {
      console.error('Error posting photo:', error);
      Alert.alert('Error posting photo!');
    });
};

const postData = () => {

    const data = {

      business_name : businessName,
      business_category : businessTypeName,
      street_address : streetAddress,
      country : countryName,
      state : stateName,
      city : cityName,
      contact1 : contact1,
      contact2 : contact2,
      contact3 : contact3,
      business_photos : businessPhotos,
      business_email : businessEmail,
      status: statusName,
      business_website : businessWebsite,
      description : description,
      google_map_link : googleMap,
    
     };

    axios.post('https://uat-api.socialbharat.org/api/profile/create-business-details', data,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        
      }
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          Alert.alert('Data posted successfully!');
        } else {
          throw new Error('Error posting data');
        }
      })
      .catch(error => {
        console.error('Error posting data:', error);
        Alert.alert('Error posting data!');
      });
  };

  
  useEffect (()=> {
    
    axios.get('https://uat-api.socialbharat.org/api/states/101',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        //console.log(response.data.data)
        setStateData(response.data.data);
    })
    .catch(error=>{
        console.error('Error fetching data:',error);
    })
},[])

const getCity = (stateId) => {
axios.get(`https://uat-api.socialbharat.org/api/cities/${stateId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        //console.log(response.data.data)
        setCityData(response.data.data);
    })
    .catch(error=>{
        console.error('Error fetching data:',error);
    })
}

const StateDrop = stateData ? stateData.map(states => ({
    label: states.name,
    value: states.id.toString(),
    })) : [];

const CityDrop = cityData ? cityData.map(cities => ({
    label: cities.name,
    value: cities.id.toString(),
  })) : [];


 useEffect(()=>{ getCity() },[])


  return (
    <View style={styles.container}>
      <ScrollView>

      <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Enter Business Name" value={businessName}
      onChangeText={(text) => setBusinessName(text)}/>
      </View>

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
        placeholder="Select Bussiness Type"
        searchPlaceholder="Search..."
        value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        renderLeftIcon={() => (
          <Icon style={styles.icon} color="orange" name="check" size={20} />
        )}
      />

      <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Street Address" value={streetAddress}
        onChangeText={(text) => setStreetAddress(text)} />
      </View>


      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countrydata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Country"
        searchPlaceholder="Search..."
        value={country}
        onChange={item => { setCountry(item.value); setCountryName(item.label)  }}
        renderLeftIcon={() => (
          <Icon style={styles.icon} color="orange" name="check" size={20} />
        )}
      />

      
      

<Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={StateDrop}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select State"
        searchPlaceholder="Search..."
        value={state}
        onChange={item => { setState(item.value); setStateName(item.label); getCity(item.value); }}
        renderLeftIcon={() => (
          <Icon style={styles.icon} color="orange" name="check" size={20} />
        )}
      />

    
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={CityDrop}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={city}
        onChange={ item => { setCity(item.value); setCityName(item.label); setIsFocus(false); }}
        renderLeftIcon={() => (
          <Icon style={styles.icon} color="orange" name="check" size={20} />
        )}
      />
       
       <View style={styles.inputContainer} >
      <TextInput style={styles.input} placeholder="Contact 1" value={contact1}
        onChangeText={(text) => setContact1(text)} />
        </View>
       
       <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Contact 2" value={contact2}
        onChangeText={(text) => setContact2(text)}/>
      </View>

      <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Contact 3"value={contact3}
        onChangeText={(text) => setContact3(text)} />
      </View>


<View style={styles.inputContainer}>
<View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#1255', borderRadius:10}}>
  <Button title="Choose File" onPress={handleLaunchImageLibrary} color=""/>
 <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}>{selectedImageName ? selectedImageName : 'No file choosen'}</Text>
</View>
</View>


<View style={styles.inputContainer}>
  <TextInput style={styles.input} placeholder="Business Email" value={businessEmail}
        onChangeText={(text) => setBusinessEmail(text)} />
</View>

      
<Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={statusdata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={status}
        onChange={ item => { setStatus(item.value); setStatusName(item.label)  }}
        renderLeftIcon={() => (
          <Icon style={styles.icon} color="orange" name="check" size={20} />
        )}
      />
      
      <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Business Website" value={businessWebsite}
        onChangeText={(text) => setBusinessWebsite(text)} />
        </View>

      <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Description" value={description}
        onChangeText={text => setDescription(text)}/>
      </View>

      <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Google Map" value={googleMap}
        onChangeText={text => setGoogleMap(text)}/>
        </View>

      <View style={styles.buttonContainer}>
      <Button title="Submit" onPress={postData} />
      </View>

      </ScrollView>

    </View>
  );
};

export default PromoteBusiness;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  input: {
    fontSize:16,
    padding:10
  },
  inputContainer: {
    elevation:5,
    borderRadius:10,
    backgroundColor:'#fff',
    margin:10,
    marginHorizontal:15,
    shadowRadius:5,
    shadowColor:'#000',
    shadowOpacity:5
},
buttonContainer: {
  alignItems:'center',
  margin:10,
  borderRadius:10
}











  ,dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
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
    fontSize: 16,
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
