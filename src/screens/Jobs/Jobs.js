import React, {useEffect, useState} from "react";
import axios from "axios";
import { View, Text, StyleSheet, useColorScheme, Appearance, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { useSelector } from "react-redux";
//import { Dropdown } from "react-native-element-dropdown";


const Jobs =() => {

    // const colorScheme = useColorScheme();
    // const containerStyle = {
    // backgroundColor : colorScheme === 'dark' ? 'white' : 'dark'};

    const token = useSelector(state => state.AuthReducer.authToken)
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [originaljobs, setOriginaljobs] = useState([]);
    

    
    useEffect (()=>{
        axios.get('https://uat-api.socialbharat.org/api/user/search/jobs?page=1&size=2000&state=&city=&search=&jobType=',{
            headers: {
                Authorization: `Bearer ${token}`
            }
         })
        .then(response=>{
            const job = (response.data.data.jobs)
            setJobs(job);
            //console.log(response.data.data.jobs)
            //setOriginaljobs(job)
            
        })
        .catch(error=>{
            console.error('Error fetching data:',error);
            
        })
    },[]);
    
    const formatDate = (dateString) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = `${day} ${months[monthIndex]} ${year}`;
        return formattedDate;
    };

     const handleSearch = (query) => {
    //     setSearchQuery(query);
    //     const filteredMembers = originaljobs.filter(member => {
    //         const title = member.name ? member.job_title.toLowerCase() : '';
    //         const companyname = member.mobile ? member.job_subheading.toLowerCase() : '';
    //         const state = member.native_place_city ? member.state.toLowerCase() : '';
    //         const city = member.native_place_state ? member.city.toLowerCase() : '';
    //         return (
    //             title.includes(query.toLowerCase()) ||
    //             companyname.includes(query.toLowerCase()) ||
    //             city.includes(query.toLowerCase()) ||
    //             state.includes(query.toLowerCase())
    //         );
    //     });
    //     jobs(filteredMembers);
     };
    

    

    return (

       <ScrollView>
        <View style={styles.container}>


                  <TextInput style={styles.input}
                   placeholder="Search by name, mobile, city, state..."
                   onChangeText={handleSearch} value={searchQuery}/>

            
                <View style={{width:'96%'}}>
                    {/* <Drop/> */}
                </View>
            

             {jobs.map(job=> (
            <View key={job.id} style={styles.card}>
                <View style={{flexDirection:'row',marginRight:8}}>
                <Text style={styles.headding}>Job Title : </Text>
                <Text style={styles.normal}>{job.job_title}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.headding}>Company Name : </Text>
                <Text style={styles.normal}>{job.job_subheading}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.headding}>Application Start : </Text>
                <Text style={styles.normal}>{formatDate(job.job_start_date)}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.headding}>Expire Date : </Text>
                <Text style={styles.normal}>{formatDate(job.job_end_date)}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.headding}>Sector : </Text>
                <Text style={styles.normal}>{job.job_sector}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.headding}>Job Type : </Text>
                <Text style={styles.normal}>{job.job_type}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.headding}>Company Address : </Text>
                <Text style={styles.normal}>{job.location}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.headding}>Location : </Text>
                <Text style={styles.normal}>{job.city} ({job.state})</Text>
                </View>
                
                
                <TouchableOpacity style={styles.btn}>
                <Text style={{fontSize:20, padding:10}}>Apply</Text>
                </TouchableOpacity>
                </View>
            ))}
           
            
        </View>
        </ScrollView>
    )
}

export default Jobs;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'

        
    },
    card:{
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 20,
    elevation: 5,
    borderRadius: 10,
    padding: 25,
    width:'90%'
    },
    btn:{
        width:'100%',
        backgroundColor:'#1277',
        borderRadius:5,
        alignItems:'center',
        marginVertical:20
        },
    headding:{
            fontSize:18,
            fontWeight:'800'
        },
        normal:{
            fontSize:18,
        },
        input:{
            borderWidth:0.5,
            borderRadius:10,
            fontSize:20,
            padding:10,
            width:'90%',
            marginTop:20,
            
            },
            
})
