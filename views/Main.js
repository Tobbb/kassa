import React from 'react';

import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, KeyboardAvoidingView, ActivityIndicator,ToastAndroid } from 'react-native';
import * as Font from 'expo-font';

import Head from '../components/Head';
import Login from '../components/Login';
import Viewer from '../components/Viewer';
import Loader from '../components/Loader';
import Gdpr from '../components/Gdpr';
import Konto from '../components/Konto';

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      money: "",
      date: "",
      onCard:"",
      onCardDate:"",
      password: '',
      text: '',
      isLoggedin: false,
      isLoading: true,
      error:'',
      gdpr:true,
      webOpen:false,
      link:'',
    };
  }

  async componentDidMount() {
   await Font.loadAsync({
      'medium': require('../assets/Roboto-Medium.ttf'),
      'regular': require('../assets/Roboto-Regular.ttf'),

    });

      const GDPR = await AsyncStorage.getItem('gdpr')?
      await this._retrieveLogin():
      this.setState({
        gdpr:false
      })
    
  
  }

  async acceptgdpr(){
    this.setState({
      gdpr:true
    })
    
    await AsyncStorage.setItem('gdpr', 'ok').then(() => this._retrieveLogin())
  }

  handleWeb(link){
    this.setState({
      link:link,
      webOpen:!this.state.webOpen,
    })
    console.log(link);
  }

  _setLogin = async () => {
    try {
      await AsyncStorage.setItem('uName', this.state.text);
      await AsyncStorage.setItem('pWord', this.state.password);

    } catch (error) {

    }
  };


  _retrieveLogin = async () => {
    try {

      const uName = await AsyncStorage.getItem('uName');
      const pWord = await AsyncStorage.getItem('pWord');

      this.setState({
        text: uName,
        password: pWord,
        
      },() => {
        if(this.state.text!=null && this.state.password != null)
        {
      
    
         this.fetchData();
      }
        else{
      
          this.setState({
            isLoading:false,
          })
        }
      })

    } catch (error) {
      this.setState({
        isLoggedin: false,
      })
    }
  };

  async _onClick() {

    if (!this.state.isLoggedin) {
     
      await this._setLogin();
    }
    if(this.state.text!=null && this.state.password != null)
    {
     this.setState({
       isLoading:true
     })

    await this.fetchData();

    this.setState({
      isLoading:false
    })
  }
    else{
   
      this.setState({
        isLoading:false,
      })
    }
  

  }


  async logOut() {
    await AsyncStorage.removeItem("uName");
    await AsyncStorage.removeItem("pWord");

    this.setState({
      text: '',
      password: '',
      isLoggedin: false,
    })

  }


  async fetchData() {

    if (this.state.text != null && this.state.password != null) {

      var details = {
        providerHidden: 2,
        "j_username": this.state.text,
        "j_password": this.state.password,
        "submitBtn": "Logga in"
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      const response = await fetch('https://webtick.se/webtick/user/pages/login/j_acegi_security_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })

      const htmlString = await response.text();  // get response text
      let pattern = /idg_opt_319">(.*?) kr <\/span>/;
      let patternDate = /Senast uppdaterat (.*?)\)<\/span>/
      let onPat = /idg_opt_306">(.*?)<\/span>/;
      let onPatDate =/idg_opt_308">Fr&#229;n(.*?)<\/span>/;

      let failPatt= /kortet ur bakgrundsystemet/;

      var on="";
      var onDate="";
      if (onPat.test(htmlString) && onPatDate.test(htmlString)) {
        on=onPat.exec(htmlString);
        onDate=onPatDate.exec(htmlString);
        onDate = onDate[1];
      }
  

      if (pattern.test(htmlString) && patternDate.test(htmlString)) {
        let match = pattern.exec(htmlString);
        let matchDate = patternDate.exec(htmlString);

        this.setState({
          money: match[1],
          date: matchDate[1],
          onCard:on[1],
          onCardDate:onDate,
          isLoggedin: true,
          isLoading: false,
          error:''

        })
      }
      else if(failPatt.test(htmlString)){
        this.setState({
          isLoggedin: false,
          isLoading: false,
          error:"Fel med karlstadsbuss interna system",
          password:''
        })

      }
      else {
        this.setState({
          isLoggedin: false,
          isLoading: false,
          error:"Fel vid inloggning, försök igen",
          password:''
        })
       
      }
      if(this.state.error != '')
      ToastAndroid.show(this.state.error, ToastAndroid.LONG);

      
    }
  }

  onChangeValue = (name,val) => {
   
this.setState({
  [name]:val
})
 }
 




  render() {
    return (
 

      <View style={styles.container}>
         {this.state.isLoading &&
        <Loader/>}
          
            {this.state.isLoggedin && !this.state.isLoading &&
            <Head
            logOut={this.logOut.bind(this)}
            />
            }
           {!this.state.isLoggedin && !this.state.isLoading &&
            <Login
            text={this.state.text}
            password={this.state.password}
            onChangeValue={this.onChangeValue}
            _onClick={this._onClick.bind(this)}
            handleWeb={this.handleWeb.bind(this)}
            />
           }

            {this.state.isLoggedin && !this.state.isLoading &&
            <Viewer 
            money={this.state.money}
            date={this.state.date}
            onCard={this.state.onCard}
            onCardDate={this.state.onCardDate}
            text={this.state.text}
            _onClick={this._onClick.bind(this)}
        

            />
          }
            {!this.state.gdpr &&
            <Gdpr
            acceptgdpr={this.acceptgdpr.bind(this)}
            />
            
            }
            {this.state.webOpen &&
            <Konto
            handleWeb={this.handleWeb.bind(this)}
            link={this.state.link}
            />
          }
          </View>
        
      
   
    );
  }
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    width: "100%",
  },


});
