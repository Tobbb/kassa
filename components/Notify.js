import React from 'react';

import { StyleSheet, View,ActivityIndicator,Text, Button,Animated,Easing,Dimensions,Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Notify extends React.Component {

  constructor(props) {
    super(props);


  }

  render() {

    return (

        <View style={styles.container}>
          <Text style={{fontSize:20,paddingTop:"20%"}}>Inställniningar</Text>
          <View style={styles.box}>
<View style={styles.col}>
<Text style={{fontSize:18}}>Visa personliga annonser</Text>
<Text style={{fontSize:10}}>(Detta kommer inte minska antalet annonser)</Text>
</View>
<Switch
         onValueChange = {this.props.changePersonalAds}
         value={this.props.showPersonalAds==='true' || this.props.showPersonalAds}

/>
</View>



    <View style={styles.btnbox}> 
<Button
          onPress={this.props.showSettings.bind(this)}
         style={styles.bt}
        title="Tillbaka"
          accessibilityLabel="Tillbaka"
          color="#ff8800"

        />
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  col:{
    flexDirection:"column",
    width:"80%",
},

  box:{
    marginTop:"10%",
    justifyContent:"center",
    alignContent:"center",
    flexDirection:"row",
    alignItems:"flex-start",
   
  },
    btnbox:{
      flex:1,
      width:"80%",
      marginTop:"50%",
    },

    container: {
      position:"absolute",
    
      width:"100%",
      height:"100%",
      alignItems: 'center',
     
      backgroundColor:"#fff"
  },
});
