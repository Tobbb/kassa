import React from 'react';

import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity } from 'react-native';
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
        <TouchableOpacity style={styles.helpers} onPress={()=>this.props.handleWeb('https://webtick.se/webtick/user/pages/login/RegisterAccount.iface?provider=2')} >
 <Text style={styles.reg}> Registrera konto (Länk)</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.helpers} onPress={()=>this.props.handleWeb('https://webtick.se/webtick/user/pages/login/LoginBadCredentials.iface?provider=2')} >
 <Text style={styles.reg}> Glömt Lösenord (Länk)</Text>
    </TouchableOpacity>
      </KeyboardAvoidingView>
      
    
    );
  }
}

const styles = StyleSheet.create({
  helpers:{
    marginLeft:"15%",
width:"70%",
  },
  reg:{
    textAlign:"center",
    paddingVertical:10,
    color:"#bd6b00",
    borderBottomWidth: 1,
    

  },
    small:{
        textAlign:"center",
        fontSize:10,
        paddingVertical:10,
        paddingBottom:10,
        
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
