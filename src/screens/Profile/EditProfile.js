import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetQualification, GetStates, GetCities, PostEditProfile, GetProfile } from '../../services/apiCalls';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';




const EditProfile = () => {

  //const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [genderName, setGenderName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [qualificationName, setQualificationName] = useState(null);
  const [community, setcommunity] = useState('');
  const [jobTypeName, setJobTypeName] = useState(null);
  const [jobDetails, setJobDetails] = useState('');
  const [maritalStatusName, setMaritalStatusName] = useState(null);

  const [maritalStatus, setMaritalStatus] = useState('');
  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);

  const [gender, setGender] = useState(null);

  const [qualificationData, setQualificationData] = useState(null);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  const [jobType, setJobType] = useState('');


  const token = useSelector(state=>state.AuthReducer.authToken);

  const genderData = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' }
  ]

  const jobTypeData = [
    { label: 'Government Sector', value: '1' },
    { label: 'Private Sector', value: '2' },
    { label: 'Business', value: '3' },
    { label: 'Farmer', value: '4' },
    { label: 'Service', value: '5' },
    { label: 'Other', value: '6' }
  ]

  const maritalStatusData = [
    { label: 'Single', value: '1' },
    { label: 'Married', value: '2' },
    { label: 'Divorced', value: '3' },
    { label: 'Widow', value: '4' }
  ]

  const getprofile = () => {
    
    GetProfile(token)
      .then(response => {
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setJobDetails(response.data.data.occupation);
        setcommunity(response.data.data.community.name);
        //const Gen = (GenData || []).map(G => ({ label: G.name, value: G.id.toString() }));

        if (genderName) {
          const selectedGender = genderData.find(item => item.label === genderName);
          setGender(selectedGender ? selectedGender.value : null);
      }
        

        const dob = response.data.data.dob;
        const parsedDate = parseISO(dob);
        const formatted = format(parsedDate, 'dd MMMM, yyyy');
        console.log(formatted);
        setDateOfBirth(formatted);
        //setDateOfBirth(response.data.data.dob)
        //setState(response.data.data.native_place_state);
        
        
        
      })
      .catch(error => {
        console.log(error);
      });
    };

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

  const getqualification = () => {
    
        GetQualification(token)
          .then(response => {
            setQualificationData(response.data.qualifications)
          })
          .catch(error => {
            console.log(error);
          });
  };


  //const [dateOfBirth, setDateOfBirth] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleSubmit = () => {
    
  const data = {

        name: name,
        email : email,
        gender : genderName,
        dob : dateOfBirth,
        native_place_city : cityName,
        native_place_state : stateName,
        highest_qualification : qualificationName,
        occupation : jobTypeName,
        marital_status : maritalStatusName      
  };

  PostEditProfile(token, data)
          .then(response => {
            console.log(response)
            console.log('Data posted successfully');
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

  const QualificationDrop = qualificationData ? qualificationData.map(quali => ({
    label: quali.title,
    value: quali.id.toString(),
  })) : [];

  useEffect(() => { getstate() },[] );
  useEffect(() => { getcity() },[] );
  useEffect(() => { getqualification() },[] );
  useEffect(() => { getprofile() },[] );




  return (

    <ScrollView contentContainerStyle={{backgroundColor:'#ffffff'}}>
     <View style={styles.container}>

    <View style={styles.headingContainer}>
        <Text style={styles.headingContainerText}>Basic Profile</Text>
    </View>

    <View>
        <Text style={styles.textInputHeading}>Name *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Name' 
        style={styles.inputText} value={name} 
        onChangeText={setName}></TextInput>
    </View>


    <View>
        <Text style={styles.textInputHeading}>Email Address *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Email Address' 
        style={styles.inputText} value={email} 
        onChangeText={setEmail}></TextInput>
    </View>


    <View>
        <Text style={styles.textInputHeading}>Gender *</Text>
    </View>

    <View style={styles.textInputContainer}>
        
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={genderData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Gender"
        searchPlaceholder="Search..."
        value={gender}
        onChange={ item => { setGender(item.value); setGenderName(item.label) }}
        />

    </View>

    <View>
        <Text style={styles.textInputHeading}>Date of Birth *</Text>
    </View>

    <View style={styles.textInputContainer}>
       
        <TouchableOpacity onPress={() => setShow(true)} >
        <Text style={{ paddingHorizontal: 10, fontSize:20,padding:12,}} >{dateOfBirth ? dateOfBirth : 'Select Date'}</Text>
        {show && ( <DateTimePicker value={dateOfBirth || new Date()} mode="date" display="default" onChange={onChange} />  )}
        {/* <Icon name="calendar" size={25} color="#b5880d" style={styles.socialIcon} onPress={() => setShowStartDatePicker(true)} /> */}
        </TouchableOpacity>
    </View>

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
        data={StateDrop}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select State"
        searchPlaceholder="Search..."
        value={state}
        onChange={item => { setState(item.value); setStateName(item.label); getcity(item.value); }}
        // renderLeftIcon={() => (
        //   <Icon style={styles.icon} color="orange" name="check" size={20} />
        // )}
      />

    </View>

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
        data={CityDrop}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={city}
        onChange={ item => { setCity(item.value); setCityName(item.label);  }}
        // renderLeftIcon={() => (
        //   <Icon style={styles.icon} color="orange" name="check" size={20} />
        // )}
      />

    </View>

    <View>
        <Text style={styles.textInputHeading}>Highest Qualification *</Text>
    </View>

    <View style={styles.textInputContainer}>
       
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={QualificationDrop}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Qualification"
        searchPlaceholder="Search..."
        value={highestQualification}
        onChange={ item => { setHighestQualification(item.value); setQualificationName(item.label) }}
        />

    </View>

    <View>
        <Text style={styles.textInputHeading}>Community *</Text>
    </View>

    <View style={styles.textInputContainer}>
        <TextInput placeholder='Select Community' 
        style={styles.inputText}
        value={community}
        editable={false}
        onChangeText={setcommunity}></TextInput>
    </View>

    <View>
        <Text style={styles.textInputHeading}>Job Type *</Text>
    </View>

    <View style={styles.textInputContainer}>
       
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={jobTypeData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Job Type"
        searchPlaceholder="Search..."
        value={jobType}
        onChange={ item => { setJobType(item.value); setJobTypeName(item.label) }}
        />

    </View>

    <View>
        <Text style={styles.textInputHeading}>Job Details *</Text>
    </View>

    <View style={styles.textInputContainer}>
    <TextInput placeholder='Example - Software Engineer, Grocery Shop Owner' 
    style={styles.inputText} 
    value={jobDetails}
    onChangeText={setJobDetails}></TextInput>
    </View>

    <View>
        <Text style={styles.textInputHeading}>Marital Status *</Text>
    </View>

    <View style={styles.textInputContainer}>
        
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        TextInputSearchStyle={styles.TextInputSearchStyle}
        iconStyle={styles.iconStyle}
        data={maritalStatusData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Marital Status"
        searchPlaceholder="Search..."
        value={maritalStatus}
        onChange={ item => { setMaritalStatus(item.value); setMaritalStatusName(item.label) }}
        />
    </View>

    
    <View>
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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

export default EditProfile;
