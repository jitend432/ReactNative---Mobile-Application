import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, TextInput, StyleSheet, ScrollView,Image, TouchableOpacity, } from 'react-native';
import { GetStates, GetCities, GetMembers } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { parseISO, differenceInYears, isBefore, subYears } from 'date-fns';
import { it } from 'date-fns/locale';



const SearchMember = () => {
  
  const token = useSelector(state=>state.AuthReducer.authToken);
  const [membersData, setMembersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);

  
  useEffect(() => { getstate()  }, []);
  useEffect(() => { getcity()  }, []);
  useEffect(() => { loadData()  }, []);
  

  const loadData = () => {
    setIsLoading(true);
    console.log('Loading data with:', { page, stateName, cityName, searchQuery });
    GetMembers(token,page,stateName,cityName,searchQuery)
      .then(response => {
        const newMemberData = response.data.users;
        //setMembersData(prevMemberData =>[...prevMemberData, ...newMemberData]); 
        setMembersData(prevMemberData => (page === 1 ? newMemberData : [...prevMemberData, ...newMemberData]));
        setPage(prevPage => prevPage + 1);
        //setPage(page + 1);

        setIsLoading(false); 
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (!isLoading && isCloseToBottom) {
      loadData();
    }
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

const StateDrop = stateData ? stateData.map(states => ({
  label: states.name,
  value: states.id.toString(),
  })) : [];

const CityDrop = cityData ? cityData.map(cities => ({
  label: cities.name,
  value: cities.id.toString(),
  })) : [];

const calculateAge = (dobString) => {
  const dob = parseISO(dobString);
  const today = new Date();
  let age = differenceInYears(today, dob);
  const birthdayThisYear = subYears(today, age);
  if (isBefore(today, birthdayThisYear)) {
    age--;
  }
  return age;
  };

// const handleSearch = (q) => {
//   console.log('Search query:', q);
//   setPage(1);
//   setSearchQuery(q);
// };
const handleSearch = (q) => {
  console.log('Search query:', q);
  setPage(1);
  setMembersData([]); // Clear previous data
  setSearchQuery(q);
};

  


  return (
    
    <ScrollView contentContainerStyle={{}} onScroll={handleScroll} >

     <View style={styles.container}>

           <View style={styles.textInputContainer}>
           <TextInput placeholder='Search...' 
           style={styles.inputText} value={searchQuery} 
           onChangeText={handleSearch}></TextInput>
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
        onChange={item => { setState(item.value); setStateName(item.label); getcity(item.value);
               setCity(''); // Clear city when state changes
               setCityName(null); // Clear city name when state changes
               setPage(1);
               setMembersData([]); // Clear previous data
         }}
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
        onChange={ item => { setCity(item.value); setCityName(item.label);  
                   setPage(1);
                   setMembersData([]); // Clear previous data
        }}
        // renderLeftIcon={() => (
        //   <Icon style={styles.icon} color="orange" name="check" size={20} />
        // )}
      />

    </View>


     {membersData && membersData.map((item, index)=> (

         <View key={index} style={styles.card}>

       <View style={styles.imageContainer}>
          <Image source={item.photo ? { uri: item.photo } : 
          require('../../assets/default.jpg')} style={styles.image}/>
           
           <Text style={styles.name}>{item.name}</Text>
           <Text style={styles.occupationtxt}>{item.occupation ? item.occupation : 'Not Working'}</Text>
        </View>
     
             <View style={styles.detailsContainer}>
             <Text style={styles.titletxt}>Education : </Text>
             <Text style={styles.normal}>{item.highest_qualification ? item.highest_qualification : 'N/A' }</Text>
             </View>

             <View style={styles.detailsContainer}>
             <Text style={styles.titletxt}>Age : </Text>
             <Text style={styles.normal}>{item.dob ? calculateAge(item.dob) + ' years'  : 'N/A years'}</Text>
             </View> 

             <View style={styles.detailsContainer}>
             <Text style={styles.titletxt}>City : </Text>
             <Text style={styles.normal}>{item.native_place_city} ({item.native_place_state})</Text>
             </View>

      <View style={styles.bottomContainer}>
         <TouchableOpacity>
         <Image source={ require('../../assets/chat.png')} style={styles.icon}/>
         </TouchableOpacity>
         
         <TouchableOpacity>
           <Text style={styles.viewTxt}>View</Text>
         </TouchableOpacity>
      </View>
           
        </View>
         ))}
         {isLoading && <ActivityIndicator />}
        
         
         </View>
     </ScrollView>
    
 )}


const styles = StyleSheet.create({
    
   container:{
   flex:1,
   margin:20,
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
    backgroundColor:'#ffffff' 
    },

  //  textInputContainer:{
  //  borderColor: '#008374',
  //  borderWidth: 0.5,
  //  borderRadius: 7,
  //  marginVertical:12,
  //  backgroundColor:'#ffffff', 
    
  //  },

   inputText:{
   fontSize:20,
   paddingHorizontal:10
   },

   card:{
   backgroundColor:'#ffffff',
   borderRadius: 10,
   marginVertical:12,
   shadowColor: '#000000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 5,
   padding: 25,
   overflow:'hidden'
   },

   imageContainer:{
    alignItems:'center',
     marginBottom:15,  
   },

   image:{
   height:150,
   width:150,
   borderRadius:100,
   margin:10   
    },

   normal:{
   fontSize:20,
   color:'#000',
   fontWeight:'700',
   },

   name:{
   fontSize:25,
   fontWeight:'900',
   color:'#000'
   },

   occupationtxt:{
    fontSize:20,
    color:'#000',
    fontWeight:'500'
   },

  titletxt:{
    fontSize:20,
    fontWeight:'900',
    color:'#000',
    paddingLeft:10
  },
  detailsContainer:{
  flexDirection:'row',
  backgroundColor:'#EFEFEF',
  borderRadius:20,
  padding:7,
  marginBottom:5
  },

  bottomContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
   //paddingLeft:20,
   //paddingRight:15
   paddingHorizontal:30,
   paddingVertical:7,
   //marginTop:5,
   //backgroundColor:'#EFEFEF',
   borderRadius:20
  },

  icon:{
  height:30,
  width:30
  },

  viewTxt:{
    fontSize:20,
    //color:'#000',
    fontWeight:'900'
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
  
         
})

export default SearchMember;
