import Carousel from 'react-native-reanimated-carousel'
import * as React from 'react';
import { Dimensions, Text, View ,Image} from 'react-native';


const CardCarousel = ({images}) => {
    const width = Dimensions.get('window').width;
    

    return (
        <View style={{ flex: 1 }}>
            {
                images && images.length>0  ?
                <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item, index }) => (

                <View style={{ flex: 1}} >
                <Image source={{uri: item}} style={{ flex: 1, resizeMode:'repeat' }}/>
                </View>

                )} />: <></> 
            }
        </View>
    );
}
export default CardCarousel




