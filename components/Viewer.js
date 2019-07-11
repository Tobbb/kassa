import React from 'react';

import { StyleSheet, View,Text,Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Viewer extends React.Component {

  constructor(props) {
    super(props);
    
  }

  
  





  render() {
    return (


        <View style={styles.container}>
        <Text style={styles.saldo}>Reskassa </Text>
        <Text style={styles.money}>{this.props.money}</Text>
        <Text>Uppdaterat {this.props.date}</Text>
        <Text style={styles.self}>{this.props.text}</Text>
        <Text style={styles.extra}>{this.props.onCard}</Text>
        <Text style={styles.extra}>{this.props.onCardDate}</Text>

        <Button
          onPress={this.props._onClick.bind(this)}
          title="Hämta igen"
          color="#ff8800"

          accessibilityLabel="Hämta data"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    extra:{
        fontSize:15,
        padding:10

    },
    saldo:{
fontSize:25,
textAlign:"center",
padding:10,

    },
    money:{
        fontSize:40,
        textAlign:"center",
        padding:10,
    },
    self:{
        fontSize:30,
        padding:30,
        textAlign:"center",

    },
    container: {
flex:1,
justifyContent:"center",
alignItems:"center",
width:"100%",
    backgroundColor:"#fff"
  },
});
