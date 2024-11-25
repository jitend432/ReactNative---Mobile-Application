import React,{useState,useEffect} from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { parseISO, differenceInYears, isBefore, subYears } from 'date-fns';
import { GetStates, GetCities, GetPartner  } from '../../services/apiCalls';
import { useSelector } from "react-redux";

const SearchPartner =({navigation}) => {

    const data = [
      { label: 'Male', value: '1' },
      { label: 'Female', value: '2' }
    ]

  const token = useSelector(state=>state.AuthReducer.authToken);
  const [partnersData, setPartnersData] = useState([]);
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
  useEffect(() => { loadData()  }, [searchQuery,stateName,cityName]);
  

  const loadData = () => {
    setIsLoading(true);
    //console.log('Loading data with:', { page, stateName, cityName, searchQuery });
    GetPartner(token,page,stateName,cityName,searchQuery)
      .then(response => {
        const newPartnerData = response.data.users;
        setPartnersData(prevPartnerData => (page === 1 ? newPartnerData : [...prevPartnerData, ...newPartnerData]));
        setPage(prevPage => prevPage + 1);
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


const handleSearch = (q) => {
  console.log('Search query:', q);
  setPage(1);
  setMembersData([]); // Clear previous data
  setSearchQuery(q);
};

       
    return(
        <ScrollView contentContainerStyle={{}} onScroll={handleScroll}>
        <View style={styles.card}>

        <View>
        <Text style={styles.textInputHeading}>Interested in</Text>
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
        placeholder="Select Gender"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
        </View>

        <View>
        <Text style={styles.textInputHeading}>State</Text>
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
        onChange={ item => { setState(item.value); setStateName(item.label); getcity(item.value) }}
        />
        </View>

        <View>
        <Text style={styles.textInputHeading}>City</Text>
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
        placeholder="Select City"
        searchPlaceholder="Search..."
        value={city}
        onChange={ item => { setCity(item.value); setCityName(item.label) }}
        />
        </View>

        <View>
        <Text style={styles.textInputHeading}>Subcast</Text>
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
        placeholder="Select Subcast"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
        </View>

        <View>
        <Text style={styles.textInputHeading}>Occupation</Text>
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
        placeholder="Select Occupation"
        searchPlaceholder="Search..."
        //value={businessType}
        onChange={ item => { setBusinessType(item.value); setBusinessTypeName(item.label) }}
        />
        </View>

        <View>
        <Text style={styles.textInputHeading}>Add New</Text>
        </View>

        <View>
    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Add Matrimonial')}>
    <Text style={styles.buttonText}>Add Matrimonial</Text>
    </TouchableOpacity>
    </View>
            
  </View>

        <View style={[styles.textInputContainer,{margin:20,backgroundColor:'#ffffff'}]}>
        <TextInput placeholder='Search by Name.Occupation, Father Name,State, ' style={styles.inputText}></TextInput>
    </View>

    {partnersData && partnersData.map((item, index)=> (

<View key={index} style={styles.card}>

<View style={styles.imageContainer}>
 {/* <Image source={item.proposal_photos[0] ? { uri: item.proposal_photos[0] } : 
 require('../../assets/default.jpg')} style={styles.image}/> */}

    {/* <Image source={ item.proposal_photos && item.proposal_photos.length > 0 ? 
    { uri: item.proposal_photos[0] } : require('../../assets/default.jpg') } style={styles.image} /> */}

      <Image source={ item.proposal_photos? { uri: Array.isArray(item.proposal_photos) ? item.proposal_photos[0]
       : item.proposal_photos } : require('../../assets/default.jpg') } style={styles.image} />
  
  <Text style={styles.name}>{item.matrimonial_profile_name}</Text>
  {/* <Text style={styles.occupationtxt}>{item.matrimonial_profile_occupation ? item.matrimonial_profile_occupation : 'Not Working'}</Text> */}
</View>

<View style={styles.detailsContainer}>
    <Text style={styles.titletxt}>Job Type : </Text>
    <Text style={styles.normal}>{item.matrimonial_profile_occupation ? item.matrimonial_profile_occupation : 'Not Working'}</Text>
    </View>

    <View style={styles.detailsContainer}>
    <Text style={styles.titletxt}>Job description : </Text>
    <Text style={styles.normal}>{item.job_profile_description ? item.job_profile_description : 'N/A' }</Text>
    </View>

    <View style={styles.detailsContainer}>
    <Text style={styles.titletxt}>Education : </Text>
    <Text style={styles.normal}>{item.education ? item.education : 'N/A' }</Text>
    </View>

    <View style={styles.detailsContainer}>
    <Text style={styles.titletxt}>Age : </Text>
    <Text style={styles.normal}>{item.matrimonial_profile_dob ? calculateAge(item.matrimonial_profile_dob) + ' years'  : 'N/A years'}</Text>
    </View> 

    <View style={styles.detailsContainer}>
    <Text style={styles.titletxt}>City : </Text>
    <Text style={styles.normal}>{item.native_place_city} ({item.native_place_state})</Text>
    </View>

    <View >
    <TouchableOpacity style={{ backgroundColor:'#198754', borderRadius:20, marginBottom:10}} >
    <Text style={{fontSize:20, padding:7, textAlign:'center',fontWeight:'700',color:'#ffffff'}}>Download Biodata</Text>
    
    </TouchableOpacity>
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

    </ScrollView>
    )}

export default SearchPartner;

const styles = StyleSheet.create({
    
card: {
backgroundColor: '#ffffff',
marginBottom: 16,
shadowColor: '#000000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
margin: 20,
elevation: 5,
borderRadius: 5,
padding: 20,
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

    textInputContainer:{
    borderColor: '#008374',
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom:20, 
    },

    button: {
    backgroundColor:'#FF9933',
    borderRadius:8,
    marginBottom:10,
    marginTop:5
    },
        
    buttonText: {
    fontSize:20,
    padding:10,
    textAlign:'center',
    fontWeight:'900',
    color:'#ffffff'
    },

    textInputHeading:{
    fontSize:20,
    fontWeight:'800',
    paddingBottom:10,
    marginLeft:5,
    color:'#000'
    },
                
    inputText:{
    paddingHorizontal: 15,
    fontSize:20,
    color:'#000',
     
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
  name:{
  fontSize:25,
  fontWeight:'900',
  color:'#000'
  },
  icon:{
  height:30,
  width:30
  },
    occupationtxt:{
    fontSize:20,
    color:'#000',
    fontWeight:'500'
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
        viewTxt:{
            fontSize:20,
            //color:'#000',
            fontWeight:'900'
          },
      
    
})