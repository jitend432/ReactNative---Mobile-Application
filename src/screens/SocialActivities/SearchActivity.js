import React, { useState, useEffect, } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, Image, Dimensions,TextInput, TouchableOpacity } from 'react-native';
import { parseISO,isBefore, differenceInDays } from 'date-fns';
import { GetActivity } from '../../services/apiCalls';
import { Dropdown } from 'react-native-element-dropdown';
//import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';


const SearchActivity = () => {

  const token = useSelector(state=>state.AuthReducer.authToken);
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const width = Dimensions.get('window').width;

  const categoryData = [
    { label: 'Information Technology (IT)', value: '1' },
    { label: 'Sales', value: '2' },
    { label: 'Marketing', value: '3' },
    { label: 'Manufacturing', value: '4' },
    { label: 'Service', value: '5' },
    { label: 'Finance', value: '6' },
    { label: 'Real Estate', value: '7' },
    { label: 'Healthcare', value: '8' },
    { label: 'Transportation and Logistics', value: '8' },
    { label: 'Hospitality', value: '9' },
    { label: 'Education', value: '10' },
    { label: 'Nonprofit Organizations', value: '11' },
    { label: 'Polity', value: '12' },
    { label: 'Other', value: '13' },
    
];



useEffect(() => { loadData()  }, []);

  const loadData = () => {
    setIsLoading(true);
    GetActivity(token, page)
      .then(response => {
        const newActivityData = response.data.activities;
        console.log(newActivityData)
        setActivityData(prevActivityData => [...prevActivityData, ...newActivityData]); 
        setPage(page + 1);
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

  const handleSearch = (q) => {
    console.log('Search query:', q);
    setPage(1);
    setSearchQuery(q);
  };

  const calculateDaysFromPastToCurrent = (pastDateString) => {
    const pastDate = parseISO(pastDateString);
    const today = new Date();
    if (isBefore(today, pastDate)) {
      throw new Error('The given date is not in the past.');
    }
  
    const days = differenceInDays(today, pastDate);
    return days;
  };
  
    
return (
    <ScrollView onScroll={handleScroll} >

      

         <View style={styles.container}>

         <View style={styles.headingContainer}>
           <Text style={styles.headingContainerText}>Activities</Text>
       </View>

  <View style={styles.textInputContainer}>

   
   <Dropdown
   style={styles.dropdown}
   placeholderStyle={styles.placeholderStyle}
   selectedTextStyle={styles.selectedTextStyle}
   TextInputSearchStyle={styles.TextInputSearchStyle}
   iconStyle={styles.iconStyle}
  data={categoryData}
   search
   maxHeight={300}
   labelField="label"
   valueField="value"
   placeholder="Choose Interesting Field"
   searchPlaceholder="Search..."
   value={category}
   onChange={ item => { setCategory(item.value); setCategoryName(item.label) }}
   />
</View>

         <View style={styles.textInputContainer}>
        <TextInput placeholder='Input Search Text' 
        style={styles.inputText} value={searchQuery} 
        onChangeText={handleSearch}></TextInput>
      </View>

    <View>
    <TouchableOpacity style={styles.postbutton}>
    <Text style={styles.buttonText}>Post Your Activity</Text>
    </TouchableOpacity>
    </View>

    <View>
    <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Manage Your Activity</Text>
    </TouchableOpacity>
    </View>

    

          {activityData && activityData.map((item, index)=> (

            

         <View key={index} style={styles.card}>

       
      <View style={{flexDirection:'row',marginRight:8}}>
          <Image source= {{ uri :item.user_profile }} style={styles.photo} />
        <View style={styles.nameContainer}>
          <Text style={styles.heading}>{item.name}</Text>         
          <Text style={styles.normal}>
              {item.created_at ? calculateDaysFromPastToCurrent(item.created_at) + ' days ago'  : 'N/A days'}
          </Text>
        </View>
      </View>

                
        {/* <View style={{height:250, alignItems:'center'}}>
            <Carousel
                loop
                width={width-80}
                height={200}
                autoPlay={true}
                data={item.photo.map((imageUrl, index) => ({ id: index, source: imageUrl }))}
                scrollAnimationDuration={1000}
                renderItem={({ item, index }) => (
                <View style={{flex:1}} >
                <Image source={{ uri: item.source }} style={{ flex:1, resizeMode:'contain' }} />
                </View>
               )} />
        </View> */}

             
             <View style={{flexDirection:'row'}}>
             <Text style={styles.heading}></Text>
             <Text style={styles.normal}>{item.title}</Text>
             </View>
             <View style={{flexDirection:'row'}}>
             {/* <Text style={styles.heading}>Date : </Text>
             <Text style={styles.normal}>
              {item.created_at ? calculateDaysFromPastToCurrent(item.created_at) + ' days ago'  : 'N/A days'}
              </Text> */}
             </View>

             <View style={styles.photosContainer}> 
             <Image source={ item.photo? { uri: Array.isArray(item.photo) ? item.photo[0]
              : item.photo } : require('../../assets/default.jpg') } style={styles.bannerImg} />
             </View>  
             <View style={{flexDirection:'row'}}>
             <Text style={styles.heading}></Text>
             <Text style={styles.normal}>{item.description.replace(/<[^>]+>/g, '')}</Text>
             </View>  

              {/* <View style={styles.photosContainer}>
                        {activityData && activityData[0].photo.map((photo, index) => (
                          <Image source={ item.photo? { uri: Array.isArray(item.photo) ? item.photo[0]
                               : item.photo } : require('../../assets/default.jpg') } style={styles.photo} />

                            // <Image source={item.photo && { uri: item.photo }} style={styles.photo} />
                        ))}  
             </View>  */}

             
          {/* <Image source= {item.photo && { uri: item.photo } } 
          style={styles.photo} /> */}
           
           {/* <Image source={item.photo===!null || item.photo? { uri: item.photo }: 
          require('../../assets/default.jpg')} style={styles.photo}/> */}
       
           
          </View>
         ))}
         {isLoading && <ActivityIndicator />}
        
         
         </View>
     </ScrollView>
    
 )}


const styles = StyleSheet.create({
    
   container:{
   flex:1,
   //alignItems:'center'
   margin:20
   },

   card:{
   backgroundColor:'#ffffff',
   borderRadius: 10,
   marginBottom: 25,
   shadowColor: '#000000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 5,
   padding: 25,
   overflow:'hidden'
   },

   btn:{
   width:'100%',
   backgroundColor:'#1277',
   borderRadius:5,
   alignItems:'center',
   marginVertical:20
   },

   heading:{
   fontSize:18,
   fontWeight:'800',
   color:'#000',

   },

   normal:{
   fontSize:18,
   color:'#000',
   },

   input:{
   borderWidth:0.5,
   borderRadius:10,
   fontSize:20,
   padding:10,
   width:'90%',
   marginTop:20,
   },

   

   photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical:10
    
},
photo: {
    width: 70,
    height: 70,
    margin: 4,
    borderRadius:100
},

textInputContainer:{
  borderColor: '#008374',
  borderWidth: 0.5,
  borderRadius: 5,
  marginBottom:20,
  backgroundColor:'#ffffff', 
  
  },
  
  inputText:{
  paddingHorizontal: 10,
  fontSize:20,
  color:'#000' 
  },

  bannerImg:{
    height:240,
    width:'100%',
    resizeMode:'stretch',
    borderRadius:10
  },
  nameContainer:{
    marginTop:17,
    marginLeft:20
  },
  button: {
    backgroundColor:'#F28154',
    borderRadius:8,
    marginBottom:25,
    marginTop:12
    },
    postbutton: {
      backgroundColor:'#F28',
      borderRadius:8,
      marginBottom:10,
      //marginTop:12
      },
    
    buttonText: {
    fontSize:20,
    padding:10,
    textAlign:'center',
    fontWeight:'900',
    color:'#ffffff'
    },

    textInputContainer:{
      borderColor: '#008374',
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom:20, 
      backgroundColor:'#ffffff'
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
         
})

export default SearchActivity;
