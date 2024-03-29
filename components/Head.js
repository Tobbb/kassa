import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Head extends React.Component {

  constructor(props) {
    super(props);
    
  }

  
  





  render() {
    return (


      <View style={styles.container}>
        <Ionicons name="md-settings" size={32} color="black" style={styles.settings} onPress={this.props.showSettings} />
{this.props.isLoggedin &&
        <Ionicons name="md-log-out" size={32} color="black" style={styles.btn} onPress={this.props.logOut} />
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    btn:{
      marginTop:"10%",
      width:"10%",
    },
    settings:{
      marginTop:"10%",
    width:"80%",
    marginLeft:"7%"
    },
    container: {
    flex:.12,
   
    backgroundColor:"#fff8f0",
    flexDirection: 'row'

  },
});
