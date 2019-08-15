import React from 'react';

import { StyleSheet, View,ActivityIndicator,Text, Image,Animated,Easing,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  AdMobBanner} from 'expo-ads-admob';


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
    //this.animatedValueSlow.setValue(0)
    Animated.timing(
      this.animatedValueSlow,
      {
        toValue: 1000,
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
      inputRange: [0 ,.12,.25, .5,.75,.88, 1],
      outputRange: [-100 ,-80,-70, -50,-70,-80, -100]
    })
    return (

        <View style={styles.container}>
<View style={styles.text}></View>
          <View  style={styles.text}>
        <Text style={styles.te}>Laddar data</Text>
        <Text style={styles.e}>Detta kan ta lite tid...</Text>
        </View>
              <Animated.View
        style={{
          marginLeft,
      }} >
                  <Image
          style={{width: 66, height: 58,transform: [{rotateY: '180deg'}]}}
          source={require("../assets/BUS.png")}
        />
          </Animated.View>
          <View
        style={styles.trees} >
                  <Image
          style={{width: 40, height: 50, top:30}}
          source={require("../assets/tree.png")}
        />
                          <Image
          style={{width: 40, height: 50, top:0}}
          source={require("../assets/tree.png")}
        />
                                  <Image
          style={{width: 40, height: 50, top:-10 }}
          source={require("../assets/tree.png")}
        />
                                          <Image
          style={{width: 40, height: 50, top:20 }}
          source={require("../assets/tree.png")}
        />
                                          <Image
          style={{width: 40, height: 50, top:40 }}
          source={require("../assets/tree.png")}
        />
                                                  <Image
          style={{width: 40, height: 50, top:-10 }}
          source={require("../assets/tree.png")}
        />
                                                  <Image
          style={{width: 40, height: 50, top:30 }}
          source={require("../assets/tree.png")}
        />
                                                  <Image
          style={{width: 40, height: 50, top:0 }}
          source={require("../assets/tree.png")}
        />
                                                  <Image
          style={{width: 40, height: 50, top:40 }}
          source={require("../assets/tree.png")}
        />
        
          </View>

<View style={styles.bottom}>
          <AdMobBanner
  bannerSize="largeBanner"
  adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
  testDeviceID="EMULATOR"
  onDidFailToReceiveAdWithError={this.bannerError} />
</View>


        </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:"15%"
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  
    
  },
  trees:{
 flex:1,
    flexDirection:"row",
  },
  te:{
    fontSize:30,
    padding:20,
   
  },
  e:{
    fontSize:20,

  },
    container: {
flex:1,

alignItems:"center",
backgroundColor:"#fff8f0",

  },
});
