import React from 'react';

import { StyleSheet, View,ActivityIndicator,Text, Image,Animated,Easing,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Loader extends React.Component {

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedValueSlow = new Animated.Value(0)

  }
  componentDidMount () {
    this.animate()
    this.animateSlow();
  }
  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  animateSlow () {
    this.animatedValueSlow.setValue(0)
    Animated.timing(
      this.animatedValueSlow,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear

      }
    ).start(() => this.animateSlow())
  }
  
  





  render() {
    const width= Dimensions.get('window').width;
    const height= Dimensions.get('window').height;

    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, width]
    })
    const marginLeft2 = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [width, -width]
    })
    const marginLeftSlow = this.animatedValueSlow.interpolate({
      inputRange: [0, 1],
      outputRange: [width*2, -width]
    })
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0 ,.5, 1],
      outputRange: [0 ,40, 0]
    })
    return (

        <View style={styles.container}>
              <Animated.View
        style={{
         
          marginLeft:marginLeft2,
          bottom:movingMargin,
      }} >
                  <Image
          style={{width: 200, height: 200}}
          source={require("../assets/sun.png")}
        />
          </Animated.View>
        <Text style={styles.te}>Laddar data</Text>

 
              <Animated.View
        style={{
          marginLeft,
      }} >
                  <Image
          style={{width: 66, height: 58,transform: [{rotateY: '180deg'}]}}
          source={require("../assets/BUS.png")}
        />
          </Animated.View>
          <Animated.View
        style={{
    
          position:'absolute',
          bottom:-70,
   
          paddingLeft:marginLeftSlow
      }} >
                  <Image
          style={{width: 200, height: 200, top:-50}}
          source={require("../assets/tree.png")}
        />
          </Animated.View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  te:{
    fontSize:15,
    padding:20,
  },
    container: {
flex:.75,
justifyContent:"center",
alignItems:"center",
  },
});
