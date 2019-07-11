import React from 'react';

import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Head extends React.Component {

  constructor(props) {
    super(props);
  }

  
  





  render() {
    return (

   


        <KeyboardAvoidingView style={styles.container2} behavior="position" enabled>
        <Text style={styles.head}>Reskassa Karlstad</Text>
        <Text style={styles.sub}>Logga in med Karlstadsbusskonto</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.props.onChangeValue.bind(this,"text")}
          value={this.props.text}
          placeholder="Användarnamn"
          name="text"
          underlineColorAndroid='#ff8826'
          placeholderTextColor = "#333333"
          textContentType={'username'}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.props.onChangeValue.bind(this,"password")}
          value={this.props.password}
          placeholder="Lösenord"
          name={"password"}
          underlineColorAndroid='#ff8826'
          placeholderTextColor = "#333333"
          textContentType='password'      
          secureTextEntry={true}  

        />
        <Button
          onPress={this.props._onClick}
          title="Logga in"
          color="#ff8800"
          accessibilityLabel="Hämta data"
          style={{color:"#000"}}
        />
        <Text style={styles.small}>Vi sparar inga uppgifter, och har ingen koppling till Karlstadsbuss</Text>
      </KeyboardAvoidingView>
      
    
    );
  }
}

const styles = StyleSheet.create({
    small:{
        textAlign:"center",
        fontSize:10,
        paddingVertical:10
    },
    sub:{
        textAlign:"center",
        fontSize:15,
        paddingVertical:15
    },
    head:{
        textAlign:"center",
        fontSize:20,
    },
  
  container2: {
    
    width:"80%",
    marginTop:"40%"
  },
  input: {
    height: 50,
    paddingHorizontal:20,
    textAlign: 'center'
  }
});
