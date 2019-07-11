import React from 'react';

import { StyleSheet, View,ActivityIndicator,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Loader extends React.Component {

  constructor(props) {
    super(props);
    
  }

  
  





  render() {
    return (

        <View style={styles.container}>
        <Text>Laddar data</Text>
        <ActivityIndicator  size="large" color="#0000ff" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
flex:1,
justifyContent:"center",
alignItems:"center",
  },
});
