import React,{useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput,ScrollView, Button} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
//import Icon from 'react-native-vector-icons/FontAwesome';



const PostActivity = () => {

    const [category, setCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [title, setTitle] = useState('');
    const [selectedBannerImageName, setSelectedBannerImageName] = useState();
    const [description, setDescription] = useState();


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

    return (
        <ScrollView contentContainerStyle={{backgroundColor:'#ffffff'}}>
        <View style={styles.container}>
   
       <View style={styles.headingContainer}>
           <Text style={styles.headingContainerText}>Activity</Text>
       </View>

    <View>
    <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>View All Activities</Text>
    </TouchableOpacity>
    </View>
   
       <View>
           <Text style={styles.textInputHeading}>Category</Text>
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
           placeholder="Select Category....."
           searchPlaceholder="Search..."
           value={category}
           onChange={ item => { setCategory(item.value); setCategoryName(item.label) }}
           />
       </View>
   
       
   
       <View>
           <Text style={styles.textInputHeading}>Title</Text>
       </View>

       <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter Title' value={title}  onChangeText={(text) => setTitle(text)}
        style={styles.inputText}></TextInput>
       </View>

       <View>
        <Text style={styles.textInputHeading}>Select Image</Text>
    </View>

    <View style={styles.textInputContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center',padding: 10, backgroundColor:'white',borderColor:'#000', borderRadius:10}}>
        <Button title="Choose File" onPress={handleLaunchImageLibraryBanner} color=""/>
        {/* <Icon name="twitter" size={30} color="#0077B5" style={{marginHorizontal:10}} /> */}
        <Text style={{ flex: 1, marginLeft: 10, color:'black',fontSize:15 }}>{selectedBannerImageName ? selectedBannerImageName : 'No file choosen'}</Text>
        </View>
    </View>

       <View>
           <Text style={styles.textInputHeading}>Description</Text>
       </View>

       <View style={styles.textInputContainer}>
        <TextInput placeholder='Enter description' value={description}  onChangeText={(text) => setDescription(text)}
        style={styles.inputText}></TextInput>
       </View>

    <View>
    <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    </View>

       </View>
     </ScrollView>

       
    )
}

export default PostActivity;

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

button: {
backgroundColor:'#F28154',
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
   
})