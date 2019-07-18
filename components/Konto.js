import React from 'react';

import { StyleSheet, View,ActivityIndicator,Text, Button,Animated,Easing,Dimensions,WebView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Konto extends React.Component {

  constructor(props) {
    super(props);


  }




  render() {


    return (

        <View style={styles.container}>
      <WebView
        source={{uri: this.props.link}}
        style={{marginTop: "8%"}}
        ref={c => this._webview = c}
        javaScriptEnabled={true}
        injectedJavaScript={ 'var x = document.querySelectorAll("table, thead, tbody, th, td, tr,input");var i;document.body.style.width="97%";document.documentElement.style.width="97%" ;for (i = 0; i < x.length; i++) {x[i].style.display = "block";x[i].style.width = "97%";   }'
    }
      />
      <Button
          onPress={this.props.handleWeb.bind(this)}
            style={styles.bt}
            title="Stäng fönster"
          accessibilityLabel="Stäng"
          color="#ff8800"
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    bt:{
    width:"100%",
    height:300,
    fontSize:35
    },

    container: {
position:"absolute",
height:"100%",
width:"100%",

backgroundColor:"#fff"
  },
});
