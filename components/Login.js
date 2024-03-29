import React from 'react';

import { StyleSheet, Text, View, TextInput,LinearGradient,Keyboard, Button,Animated, AsyncStorage, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Head extends React.Component {

  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(50);
    this.state={
      keyb:0
    }

    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    

  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    
  this.setState({
    keyb:70
  },
  () => this.forceUpdate())
  }

  _keyboardDidHide() {
    this.setState({
      keyb:0
    }, () => this.forceUpdate())
    }


    cStyle = function(options) {
      return {
        top:this.state.keyb
        
      }
    }


  render() {
    return (

        <View style={styles.house}>


        <KeyboardAvoidingView style={styles.container2} behavior="position" enabled>
        <View style={this.cStyle()}>
        <Text style={styles.head}>Reskassa</Text>
        <Text style={styles.head2}>Karlstad</Text>
        <Text style={styles.sub}>Logga in med Karlstadsbusskonto</Text>
        </View>
        <View style = {styles.textHolder}>
        <TextInput
          style={styles.input}
          onChangeText={this.props.onChangeValue.bind(this,"text")}
          value={this.props.text}
          placeholder="Användarnamn"
          name="text"
          placeholderTextColor = "#333333"
          textContentType={'username'}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.props.onChangeValue.bind(this,"password")}
          value={this.props.password}
          placeholder="Lösenord"
          name={"password"}
          placeholderTextColor = "#333333"
          textContentType='password'      
          secureTextEntry={true}  

        />
        </View>
        <Button
          onPress={this.props._onClick}
          title="Logga in"
          color="#ff8800"
          accessibilityLabel="Hämta data"
          style={{color:"#000",fontFamily: 'medium'}}
        />
        <Text style={styles.small}>Vi sparar inga uppgifter, och har ingen koppling till Karlstadsbuss</Text>

      </KeyboardAvoidingView>
     
      <View style={styles.links}>
      <TouchableOpacity style={styles.helpers} onPress={()=>this.props.handleWeb('https://webtick.se/webtick/user/pages/login/RegisterAccount.iface?provider=2')} >
 <Text style={styles.reg}> Registrera konto (Länk)</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.helpers} onPress={()=>this.props.handleWeb('https://webtick.se/webtick/user/pages/login/LoginBadCredentials.iface?provider=2')} >
 <Text style={styles.reg}> Glömt Lösenord (Länk)</Text>
    </TouchableOpacity>
    </View>
    
    </View>


    
    );
  }
}

const styles = StyleSheet.create({
  links:{
marginTop:10
  },
  textHolder:{
 

  },
  house:{
    textAlign:"center",
    backgroundColor:"#fff8f0",
    //backgroundColor:"#ccc",
    flex:1
  },

  reg:{
    textAlign:"center",
    paddingVertical:10,
    color:"#5c3f00",

    

  },
    small:{
        textAlign:"center",
        fontSize:10,
        paddingTop:10,
        paddingBottom:0,
        fontFamily: 'regular'

        
    },
    sub:{
        textAlign:"left",
        fontSize:15,
        paddingTop:5,
        paddingBottom:50,
        fontFamily: 'regular',
        marginBottom:20,

    },
    head:{
        textAlign:"left",
        fontSize:50,
        fontFamily: 'medium'
     
    },
    head2:{
      textAlign:"left",
      fontSize:25,
      fontFamily: 'medium'
   
  },
  
  container2: {
  
    marginLeft:"10%",
    width:"80%",
    paddingVertical:"15%",
    
  },
  input: {
    
    height: 50,
    paddingHorizontal:20,
    textAlign: 'left',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom:10,
    backgroundColor:"#fff",
    borderColor:"#dbdbdb",
    fontFamily: 'medium'
    

  },
  helpers:{
    marginLeft:"25%",
    width:"50%",
  }
});
