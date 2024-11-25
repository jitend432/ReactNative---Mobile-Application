import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native"
//import Icon from "react-native-vector-icons/FontAwesome"


const DashBoardCard =({backgroundColor, title, subtitle, view, edit, imagePath, onPressView, onPressEdit}) => {

   

    return (
              
        <View style={styles.container}>
        <View style={[styles.card,{backgroundColor}]}>

        <View style= {{flexDirection: "row", justifyContent:'space-between'}}> 

        <View>
              <Text style={styles.txt}>{title}</Text>
              <Text style={styles.headding}>{subtitle}</Text>
        </View>

        <View style={{ marginTop:10,}}>
             {/* <Icon name={icon} size={25} color="#000" style={styles.socialIcon} /> */}
             <Image source={imagePath} style={styles.image} />
        </View>

        </View>

        <View style={{flexDirection:"row", borderTopWidth:1, justifyContent:'space-between', borderColor:'#558554'}}>
            <TouchableOpacity style={styles.button} onPress={onPressView}> 
            <Text style={styles.txt}>{view}</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressEdit}>
               <Text style={styles.txt}>{edit}</Text> 
            </TouchableOpacity>
        </View>

        </View>
        </View>

        
    )}

    const Dashboard = ({navigation}) => {
        const handleClick = (destination) => {
            navigation.navigate(destination);
        };
        
        return (
          <ScrollView>
            
              <DashBoardCard 
              backgroundColor="#025E73" 
              title="Profile" subtitle="Manage Profile" 
              view="View" 
              edit="Edit" 
              imagePath={require('../../assets/activities.png')} 
              onPressView={() => handleClick("Profile")}
              onPressEdit={() => handleClick("Edit Profile")}/>

              <DashBoardCard 
              backgroundColor="#6AA668" 
              title="Become Social" 
              subtitle="Search Member" 
              view="Search" 
              edit="Go" 
              imagePath={require('../../assets/searchPeople.png')}
              onPressView={() => handleClick("Search Member")}
              onPressEdit={() => handleClick("Search Member")}/>

              <DashBoardCard 
              backgroundColor="#F28157" 
              title="Matrimonial" 
              subtitle="Matrimonial" 
              view="Search" 
              edit="Add" 
              imagePath={require('../../assets/wedding.png')}
              onPressView={() => handleClick("Search Partner")}
              onPressEdit={() => handleClick("Add Matrimonial")}/>

              
              <DashBoardCard 
              backgroundColor="#8C654F" 
              title="Business" 
              subtitle="Business Promotion" 
              view="Search" 
              edit="Post Your Ad" 
              imagePath={require('../../assets/financial-profit.png')}
              onPressView={() => handleClick("Search Business")}
              onPressEdit={() => handleClick("Promote Business")}/>

              <DashBoardCard 
              backgroundColor="#634A00" 
              title="Event" 
              subtitle="Events(s)" 
              view="Search" 
              edit="Post Event" 
              imagePath={require('../../assets/placard.png')}
              onPressView={() => handleClick("Search Event")}
              onPressEdit={() => handleClick("Post Event")}/>

              <DashBoardCard 
              backgroundColor="#8C654F" 
              title="Event" 
              subtitle="Social Activities" 
              view="Search" 
              edit="Post Activity" 
              imagePath={require('../../assets/activity.png')}
               onPressView={() => handleClick("Search Activity")}
              onPressEdit={() => handleClick("Post Activity")}/>

              <DashBoardCard 
              backgroundColor="#BF7E6F" 
              title="Services" 
              subtitle="Services" 
              view="Search" 
              edit="Use Service" 
              imagePath={require('../../assets/fe.png')}
              onPressView={() => handleClick("All Service")}
              onPressEdit={() => handleClick("All Service")}/>

              <DashBoardCard 
              backgroundColor="#6C757D" 
              title="Jobs" subtitle="Jobs" 
              view="Search" 
              edit="Post Jobs" 
              imagePath={require('../../assets/jobs.jpg')}
              onPressView={() => handleClick("Jobs")}
              onPressEdit={() => handleClick("Post Job")}/>

              <DashBoardCard 
              backgroundColor="#009BCE" 
              
              title="Share Your Feedback" 
              subtitle="Feedback" 
              view="Give Feedback" 
              edit="View Feedbacks" 
              imagePath={require('../../assets/fe.png')}/>
              
            
          </ScrollView>
        );
      };

export default Dashboard;


styles = StyleSheet.create({

    container: {
        flex:1,
        alignItems: "center",
        //backgroundColor:'#ffffff'
     },

    txt: {
        color:"#ffffff",
        fontSize:18,
        marginTop:5
    },
    card: {
          
    backgroundColor: '#ffffff',
    marginBottom: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    padding: 20,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 40,
    width:"90%",
    marginTop:30,
    
 },

      headding: {
        fontSize:20,
        fontWeight:"900",
        marginBottom:15,
        color:"#ffffff"
        
      },

    Line: {
        //borderBottomWidth:2,
        
    },
    socialIcon:{
        
    },
    image:{
        height:40,
        width:40
    }


})