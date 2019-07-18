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
        <Ionicons name="md-log-out" size={32} color="black" style={styles.btn} onPress={this.props.logOut} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
    btn:{
        paddingLeft:"90%"
    },
    container: {
    width:"100%",
    paddingTop:"10%",
    backgroundColor:"#fff",


  },
});
