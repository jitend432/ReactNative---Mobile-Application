import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,StyleSheet, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from '@react-native-community/datetimepicker';
import { GetStates, GetCities, PostImage, PostEvents } from '../../services/apiCalls';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';


const PostEvent = () => {

  const token = useSelector(state =>state.AuthReducer.authToken)
  const [eventType, setEventType] = useState(null);
  const [eventTypeName, setEventTypeName] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [country, setCountry] = useState('India');
  const [countryName, setCountryName] = useState('India');
  const [state, setState] = useState('');
  const [stateName, setStateName] = useState(null);
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState(null);
  const [startEvent, setStartEvent] = useState('');
  const [endEvent, setEndEvent] = useState('');
  const [venue, setVenue] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [thumbImage, setThumbImage] = useState('');
  const [description, setDescription] = useState('');
  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [selectedBannerImageName, setSelectedBannerImageName] = useState();
  const [selectedThumbImageName, setSelectedThumbImageName] = useState();

  useEffect(() => { getstate()  }, []);
  useEffect(() => { getcity()  }, []);

  const getstate = () => {
    
    GetStates(token)
      .then(response => {
        setStateData(response.data)
      })
      .catch(error => {
        console.log(error);
      });
    };

  const getcity = (stateId) => {
    
     GetCities(token, stateId)
       .then(response => {
         setCityData(response.data)
       })
       .catch(error => {
         console.log(error);
       });
  };

const StateDrop = stateData ? stateData.map(states => ({
  label: states.name,
  value: states.id.toString(),
  })) : [];

const CityDrop = cityData ? cityData.map(cities => ({
  label: cities.name,
  value: cities.id.toString(),
  })) : [];

  const dataEventType = [
    { label: 'Only For My Community', value: '1' },
    { label: 'General(For All Communities)', value: '2' }
  ]

  const countrydata = [
    { label: 'India', value: 'india' }
  ]


  const [date, setDate] = useState(new Date());

    
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };



const handleLaunchImageLibraryBanner = () => {
    launchImageLibrary({ mediaType: 'photo'}, response => {
    if (!response.didCancel) {
      const selectedImage = response.assets[0]; 
      setSelectedBannerImageName(selectedImage.fileName);
      const formData = new FormData();
      formData.append('image', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      // Post the FormData to the API
      postPhotoBanner(formData);
     }
  });
};

const postPhotoBanner = (formData) => {
  PostImage(token, formData)
    .then(response => {
       console.log("some Photo",response.data);
       setBannerImage(response.data.image);
    })
    .catch(error => {
      console.error('Error posting photo:', error);
      //Alert.alert('Error posting photo!');
    });
};

const handleLaunchImageLibraryThumb = () => {
    launchImageLibrary({ mediaType: 'photo'}, response => {
    if (!response.didCancel) {
      const selectedImage = response.assets[0]; 
      setSelectedThumbImageName(selectedImage.fileName);
      const formData = new FormData();
      formData.append('image', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      // Post the FormData to the API
      postPhotoThumb(formData);
     }
  });
};

const postPhotoThumb = (formData) => {
  PostImage(token, formData)
    .then(response => {
       console.log("some Photo",response.data);
       setThumbImage(response.data.image);
    })
    .catch(error => {
      console.error('Error posting photo:', error);
      //Alert.alert('Error posting photo!');
    });
};

const postData = (token) => {

const data = {

event_type: eventTypeName,
title: eventTitle,
country: countryName,
state: stateName,
city: cityName,
start_datetime: startDate,
end_datetime: endDate,
venue: venue,
banner_image: bannerImage,
thumb_image:thumbImage,
description: description, 
 };

   PostEvents(token, data)
   console.log(data)
      .then(response => {
        console.log(response.errors);
      })
      .catch(error => {
        console.error('Error posting data:', error);
        //Alert.alert('Error posting data!');
      });
  };





  return (

    <ScrollView contentContainerStyle={{backgroundColor:'#ffffff'}}>
     <View style={styles.container}>

    <View style={styles.headingContainer}>
        <Text style={styles.headingContainerText}>Create Event</Text>
    </View>

    
    <View>
        <Text style={styles.textInputHeading}>Event Type *</Text>
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
        placeholder="Select Updates For"
        searchPlaceholder="Search..."
        value={eventType}
        onChange={ item => { setEventType(item.value); setEventTypeName(item.label) }}
        />
        </View>

    <View>
        <Text style={styles.descHeading}>Fill the details below to post events.</Text>
    </View>


    <View>
        <Text style={styles.textInputHeading}>Event Title *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Event Name' style={styles.inputText} value={eventTitle}
        onChangeText={(text) => setEventTitle(text)}></TextInput>
    </View>



    <View>
        <Text style={styles.textInputHeading}>Country *</Text>
    </View>

    <View style={styles.textInputContainer}>
       

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
        onChange={ item => { setCountry(item.value); setCountryName(item.label) }}
        />
    </View>

    {/* Country *  */}

    <View>
        <Text style={styles.textInputHeading}>State *</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Select' style={styles.inputText}></TextInput> */}

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
        onChange={ item => { setState(item.value); setStateName(item.label); getcity(item.value); }}
        />
    </View>

    {/* State */}


    <View>
        <Text style={styles.textInputHeading}>City *</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <TextInput placeholder='Select' style={styles.inputText}></TextInput> */}

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
        placeholder="Select City"
        searchPlaceholder="Search..."
        value={city}
        onChange={ item => { setCity(item.value); setCityName(item.label) }}
        />
    </View>

   {/* City */}
    <View>
        <Text style={styles.textInputHeading}>Start Event Date/Time *</Text>
    </View>

    <View style={styles.textInputContainer}>
    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} >
        <Text style={{ paddingHorizontal: 10, fontSize:20,padding:12,}} >{startDate ? startDate.toDateString() : 'Select Start Date'}</Text>
        {showStartDatePicker && (  <DatePicker value={date} mode="date" display="default" onChange={onStartDateChange} />  )}
        {/* <Icon name="calendar" size={25} color="#b5880d" style={styles.socialIcon} onPress={() => setShowStartDatePicker(true)} /> */}
    </TouchableOpacity>
    </View>

    {/* Contact 1*/}

    <View>
        <Text style={styles.textInputHeading}>End Event Date/Time *</Text>
    </View>

    <View style={styles.textInputContainer}>
    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} >
        <Text style={{ paddingHorizontal: 10, fontSize:20,padding:12,}} >{endDate ? endDate.toDateString() : 'Select Start Date'}</Text>
        {showEndDatePicker && (  <DatePicker value={date} mode="date" display="default" onChange={onEndDateChange} />  )}
        {/* <Icon name="calendar" size={25} color="#b5880d" style={styles.socialIcon} onPress={() => setShowStartDatePicker(true)} /> */}
        </TouchableOpacity>
    </View>


    <View>
        <Text style={styles.textInputHeading}>Venue *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Venue' style={styles.inputText}
        value={venue} onChangeText={(text) => setVenue(text)}></TextInput>
    </View>


    <View>
        <Text style={styles.textInputHeading}>Banner Image *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#000', borderRadius:10}}>
        <Button title="Choose File" onPress={handleLaunchImageLibraryBanner} color=""/>
        <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}>{selectedBannerImageName ? selectedBannerImageName : 'No file choosen'}</Text>
        </View>
    </View>


    {/* Business Photo*/}

    <View>
        <Text style={styles.textInputHeading}>Thumb Image *</Text>
    </View>

    <View style={styles.textInputContainer}>
        {/* <ChoosePhoto/> */}
        <View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#000', borderRadius:10}}>
        <Button title="Choose File" onPress={handleLaunchImageLibraryThumb} color=""/>
        <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}>{selectedThumbImageName ? selectedThumbImageName : 'No file choosen'}</Text>
        </View>
    </View>

   

    

    {/* Description  */}

    <View>
        <Text style={styles.textInputHeading}>Description *</Text>
    </View>

    

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Your Event Details If Any' multiline={true} style={styles.inputText}
        value={description} onChangeText={(text) => setDescription(text)}></TextInput>
    </View>

   

    
    <View>
    <TouchableOpacity style={styles.button} onPress={postData}>
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
    fontWeight:'800',
    paddingBottom:20,
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
        color:'#000',
        
        },
    
        TextInputSearchStyle: {
        height: 40,
        fontSize: 20,
        color:'#000',
        
        }, 
});

export default PostEvent;
