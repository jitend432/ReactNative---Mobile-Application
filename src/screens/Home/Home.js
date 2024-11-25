import React, {useEffect, useState} from 'react';
import { GetHome, GetHomeBanner, GetBharatMandir } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { Dimensions, Text, View ,Image, StyleSheet, ScrollView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Marquee,Heading } from '@animatereactnative/marquee';
// import CardCarousel from '../../components/CardCarousel';



function Home() {

    const width = Dimensions.get('window').width;
    const token = useSelector(state=>state.AuthReducer.authToken);
    const [bannerImages, setBannerImages] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [bharatMandir, setBharatMandir] = useState([]);
   
    useEffect(() => { homeData() }, []);
    useEffect(() => { homeBannerData(), BharatMandirData() }, []);
 
    
    const homeData = () => {
        try {
            GetHome(token)
              .then(response => {
                // console.log(response.data.services.items);
                setCardData(response.data.services.items);

                //console.log(response.data.about);
               // console.log(response.data.services.items);
                //setBannerImages(response.data.about.images)
              })
              .catch(error => {
                console.log(error);
              });
        } catch (error) {
          console.log(error);
        }
      };

      const homeBannerData = () => {
        try {
            GetHomeBanner(token)
              .then(response => {
                //console.log(response.data[0].banner_urls);
                setBannerImages(response.data[0].banner_urls)
              })
              .catch(error => {
                console.log(error);
              });
        } catch (error) {
          console.log(error);
        }
      };

      const BharatMandirData = () => {
        try {
            GetBharatMandir(token)
              .then(response => {
                setBharatMandir(response.data)
                console.log(response.data)
              })
              .catch(error => {
                console.log(error);
              });
        } catch (error) {
          console.log(error);
        }
      };


    
    return (
        <ScrollView>
        <View style={{flex:1}}>

            <View style={{height:300}}>

            <Carousel
                loop
                width={width}
                height={width / 1.55}
                autoPlay={true}
                data={bannerImages.map((imageUrl, index) => ({ id: index, source: imageUrl }))}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item, index }) => (

                <View style={{flex:1}} >
                {/* <Image source={item} style={{ flex: 1, resizeMode:'repeat' }}/> */}
                <Image source={{ uri: item.source }} style={{flex:1, resizeMode: 'cover',borderRadius:15, marginHorizontal:10 }} />
                </View>

                )} />

            </View>

            {/* <View style={{height:60}}>
             <Marquee spacing={10} speed={1}>             
             {bharatMandir.map((item, index)=> (
          <Image key={index.banner_image}
            
            source={{ uri: item.index}}
            style={styles.image}
          /> ))}
              </Marquee> 
              </View> */}

            

           

    {cardData.map((data, index) => (
    <View key={index} style={styles.card}>
    <Text style={styles.cardTitle}>{data.title}</Text>
    <Text style={styles.para}>{data.content.replace(/<[^>]+>/g, '')}</Text>
    </View>
     ))}
                
        </View>
        </ScrollView>
    );
}

export default Home;

const styles = StyleSheet.create({

    card:{
    backgroundColor: '#ffffff',
    //marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 20,
    elevation: 5,
    borderRadius: 10,
    padding:25,
    width:'90%',
    height:'auto'
    },
    heading:{
        fontSize:20,
        fontWeight:'900',
        marginVertical:10
    },
    content:{
        fontSize:20,
        fontWeight:'500'
    },
    image:{
      height:30,
      width:30
    },
    cardTitle: {
      fontSize:20,
      fontWeight:'900',
      color:'#333',   
    },
    para: {
      color:'black',
      fontWeight:'bold',
      marginTop:10,
      fontSize:16,
      marginRight:5
      
    },
})