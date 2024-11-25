import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Image, Dimensions } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CardCarousel from '../../components/CardCarousel';





const SearchBusiness = ({navigation}) => {


  const [members, setMembers] = useState([]);
  const token = useSelector(state =>state.AuthReducer.authToken);


 


  useEffect(() =>{ myPeople() }, []);

     const myPeople = ()=>

        axios.get('https://uat-api.socialbharat.org/api/business/search?searchText=&page=1&size=200&state=&city=', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
       .then(response => {
        setMembers(response.data.data.result)
        //console.log(response.data.data.result)
        })

        .catch(error => {
        console.error('Error fetching data:', error)
        })


         

  return (
    
    <ScrollView contentContainerStyle={styles.container}>

      <View style={{marginBottom:10}}>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Promote Business')}>
            <Text style={styles.buttonText}>Promote Your Business</Text>
          </TouchableOpacity>

      </View>

<TextInput placeholder='Search Business' style={styles.Textinput}>

    <Icon name="search" size={20} color="#3b5998" style={styles.socialIcon} />
</TextInput>



      {members && members.map(member => ( 
        <View key={member.id} style={styles.businessCard}>

           {/* <Image source={member.business_photos ? { uri: member.business_photos } : 
                require('../../assets/default.jpg')} style={styles.image}/> */}

      {
        member.business_photos && member.business_photos.length >0?
        <CardCarousel images={member.business_photos}/>   :   <></>
       
      }

    {/* <Image
      source={
        member.business_photos && member.business_photos.length >0? { uri: member.business_photos[0] }
          : null
      }
      style={styles.image}
    /> */}


            
            

          <Text style={styles.businessName}>{member.business_name}</Text>
          <Text style={styles.businessCategory}>Category - {member.business_category}</Text>
          <Text style={styles.businessCategory}>Posted by - {member.name}</Text>
          <Text style={styles.businessLocation}>Address - {member.city}, {member.state}, {member.country}</Text>
          <Text style={styles.businessContact}>Contact - {member.contact1}</Text>
          
        </View>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:'#1272'
  },
  businessCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color:'black'
  },
  businessName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
    color:'black'
  },
  businessCategory: {
    fontSize: 16,
    marginBottom: 4,
    color:'black'
  },
  businessLocation: {
    fontSize: 16,
    marginBottom: 4,
    color:'black'
  },
  businessContact: {
    fontSize: 16,
    color:'black'
  },

  Textinput: {
    backgroundColor:'#fff',
     
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2}
},

button: {
  backgroundColor:'#1255',
  borderRadius:8,
  
  marginBottom:10

},
buttonText: {
  fontSize:20,
  padding:10,
  textAlign:'center',
  fontWeight:'900',
},
image:{
  height:170,
  width:350,
  borderRadius:10,
  
  },
});

export default SearchBusiness;
