import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TextInput, ActivityIndicator, ToastAndroid } from 'react-native';
import axios from 'axios';
import { useSelector } from "react-redux";
import  Icon from 'react-native-vector-icons/FontAwesome';




const AllService = () => {

    const [members, setMembers] = useState([]);
    const [originalMembers, setOriginalMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const token = useSelector(state =>state.AuthReducer.authToken);


    

    useEffect(() =>{
          
            axios.get('https://uat-api.socialbharat.org/api/users/search?q=&page=1&size=1000&state=&city=',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            const users = response.data.data.users;
            setMembers(users);
            setOriginalMembers(users)
            setLoading(false);
            })

        .catch(error=>{
            console.error('Error fetching data:',error);
            setLoading(false);
        })
    },[])


const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredMembers = originalMembers.filter(member => {
        const name = member.name ? member.name.toLowerCase() : '';
        const mobile = member.mobile ? member.mobile.toLowerCase() : '';
        const city = member.native_place_city ? member.native_place_city.toLowerCase() : '';
        const state = member.native_place_state ? member.native_place_state.toLowerCase() : '';
        return (
            name.includes(query.toLowerCase()) ||
            mobile.includes(query.toLowerCase()) ||
            city.includes(query.toLowerCase()) ||
            state.includes(query.toLowerCase())
        );
    });
    setMembers(filteredMembers);
};



    return (
        <ScrollView>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
            

        <View style={styles.container }>
       

        <TextInput style={styles.input}
                   placeholder="Search by name, mobile, city, state..."
                   onChangeText={handleSearch} value={searchQuery}/>
                   {/* <Icon name="search" size={30} color="#909294" style={styles.socialIcon} /> */}
                   
                   
                   {/* <TextInput placeholder='Search Business' style={styles.Textinput}>
                 <Icon name="search" size={20} color="#3b5998" style={styles.socialIcon} />
                 </TextInput> */}

                

            {members.map(member=> (
            <View key={member.id} style={styles.card}>
               
                <Image source={member.photo ? { uri: member.photo } : 
                require('../../assets/default.jpg')} style={styles.image}/>
                  
                <Text style={styles.text}>{member.name}</Text>
                <Text style={styles.text}>{member.email}</Text>
                <Text style={styles.text}>{member.mobile}</Text>
                <Text style={styles.text}>{member.gender}</Text>
                <Text style={styles.text}>{member.community_id}</Text>
                <Text style={styles.text}>{member.native_place_city}</Text>
                <Text style={styles.text}>{member.native_place_state}</Text>
                <Text style={styles.text}>{member.dob}</Text>
                <Text style={styles.text}>{member.occupation}</Text>
                <Text style={styles.text}>{member.highest_qualification}</Text>
                <Text style={styles.text}>{member.is_available_for_marriage}</Text>

            </View>
            
             
            ))}
        

            </View>
            )}
        </ScrollView>
    )
}

export default AllService;

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center'

    },
    card:{

    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    padding: 20,
    width:'90%'
    },
    text:{
        fontSize:20,

    },
    image:{
        height:100,
        width:200,
        borderRadius:10
        },
        input:{
            borderWidth:0.5,
            borderRadius:10,
            fontSize:20,
            padding:10,
            width:'90%',
            marginTop:20,
            },
            socialIcon: {

            }
})