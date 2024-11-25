import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';


const ViewProfile =() => {
    return (
<ScrollView contentContainerStyle={{backgroundColor:'#ffffff'}}>
  <View style={styles.container}>

  

  <View style={styles.card}>

      <View style={styles.coverContainer}>
      <Image source={require('../../assets/car.jpg')} style={styles.coverImage} />
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../../assets/default.jpg')} style={styles.profileImage} />
      </View>
          
      <View style={styles.profileIntroContainer}>
      <Text style={styles.profileNametxt}>Jitendra Pratap</Text>
      <Text style={styles.profileHeadlinetxt}>Software Developer</Text>
      <Text style={styles.placetxt}>Gorakpur, Uttar Pradesh, India</Text>
      </View>

    </View>

          
      <View style={styles.card2}>

        

            <View style={styles.detailsContainer}>
              <Text style={styles.titletxt}>Email: </Text>
              <Text style={styles.normal}>jitendrapratap432@gmail.com</Text>
              </View>

              <View style={styles.detailsContainer}>
              <Text style={styles.titletxt}>Date Of Birth: </Text>
              <Text style={styles.normal}>30 June</Text>
              </View>

              <View style={styles.detailsContainer}>
              <Text style={styles.titletxt}>Gender: </Text>
              <Text style={styles.normal}>Male</Text>
              </View>

              <View style={styles.detailsContainer}>
              <Text style={styles.titletxt}>Highest Qualification: </Text>
              <Text style={styles.normal}>PG Diploma</Text>
              </View>

              <View style={styles.detailsContainer}>
              <Text style={styles.titletxt}>Marital Status: </Text>
              <Text style={styles.normal}>Unmarried</Text>
              </View>

              <View style={styles.detailsContainer}>
              <Text style={styles.titletxt}>Community: </Text>
              <Text style={styles.normal}>NA</Text>
              </View>
      </View>

    <View style={styles.card3}>
        <View style={{backgroundColor:'#ccccff'}}>
        <Text style={styles.card3Headding}>Matrimonial Info</Text>
        </View>
        <View style={{borderTopWidth:1,}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Add Matrimonial Info
          </Text>
        </TouchableOpacity>
        </View>
   </View>

   <View style={styles.card3}>
        <View style={{ backgroundColor:'#ccccff'}}>
        <Text style={styles.card3Headding}>Education Info</Text>
        </View>
        <View style={{borderTopWidth:1,}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Add Education Info
          </Text>
        </TouchableOpacity>
        </View>
   </View>

   <View style={styles.card3}>
        <View style={{ backgroundColor:'#ccccff'}}>
        <Text style={styles.card3Headding}>Address Info</Text>
        </View>
        <View style={{borderTopWidth:1,}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Add Contact Info
          </Text>
        </TouchableOpacity>
        </View>
   </View>

   <View style={styles.card3}>
        <View style={{ backgroundColor:'#ccccff'}}>
        <Text style={styles.card3Headding}>Business Info</Text>
        </View>
        <View style={{borderTopWidth:1,}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Add Business Info
          </Text>
        </TouchableOpacity>
        </View>
   </View>

   <View style={styles.card3}>
        <View style={{ backgroundColor:'#ccccff'}}>
        <Text style={styles.card3Headding}>Job Info</Text>
        </View>
        <View style={{borderTopWidth:1,}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Add Job Info
          </Text>
        </TouchableOpacity>
        </View>
   </View>


         

        </View>
        </ScrollView>
    )
}

export default ViewProfile;


const styles = StyleSheet.create({

  container:{
    flex:1
  },

    card: {
        backgroundColor: '#ffffff',
        marginBottom: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        margin: 20,
        backgroundColor: '#ffffff',
        elevation: 5,
        borderRadius: 10,
        height:'auto',
        width:'90%',
        overflow:'hidden'
            
      },

      card2: {
        marginBottom: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        margin: 20,
        backgroundColor: '#ffffff',
        elevation: 5,
        borderRadius: 10,
        padding: 20,
        height:'auto',
        width:'90%',
        //alignItems:'flex-start'
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

        card3: {
          backgroundColor: '#ffffff',
          marginBottom: 5,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          margin: 20,
          backgroundColor: '#ffffff',
          elevation: 5,
          borderRadius: 10,
          height:'auto',
          width:'90%',
          overflow:'hidden',
          //alignItems:'center'
          
              
        },

      profileImage:{
        borderRadius:50,
        height:'100%',
        width:'100%',
        },

        name:{
            fontWeight:'bold',
            fontSize:18,
            marginTop:20,
            color:'#000'
        },
        hadding:{
            fontSize:18,
            fontWeight:'bold',
            color:'#000'
            
        },
        normal: {
            fontSize:18,
            color:'#000'
            
        },

        coverImage:{
          width:'100%',
          height:'100%',
        },

        profileContainer: {
          width: 80,
          height: 80,
          borderRadius: 50,
          backgroundColor: '#000',
          borderWidth: 2,
          borderColor: 'white',
          overflow: 'hidden',
          alignItems: 'center',
          overflow:'hidden',
          borderWidth: 10,
          position: 'absolute', top: 110, left: 20, zIndex: 1,
          
        },
        profileIntroContainer:{
          marginTop:15,
          padding:20
        },
        profileNametxt:{
          fontSize:20,
          fontWeight:'900',
          color:'#000'

        },
        profileHeadlinetxt:{
          fontSize:15,
          color:'#000'

        },
        placetxt:{
          color:'#000',
          fontSize:15,


        },
        coverContainer: {
          width: '100%',
          height: 150,
          overflow: 'hidden',
        },

        card3Headding:{
          fontSize:20,
          padding:10,
          fontWeight:'900',
          color:'#000'
        },

        button:{
          
          padding:10,
          backgroundColor:'#FF9933',
          margin:60,
          borderRadius:10,
          alignItems:'center',
          marginVertical:30
        },
        buttonText:{
          fontSize:20,
          fontWeight:'900',
          padding:2,
          //paddingHorizontal:10,
          color:'#ffffff'
          
        }
})