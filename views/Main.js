import React from 'react';

import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, KeyboardAvoidingView, ActivityIndicator, ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import { Notifications } from 'expo';


import Head from '../components/Head';
import Login from '../components/Login';
import Viewer from '../components/Viewer';
import Loader from '../components/Loader';
import Gdpr from '../components/Gdpr';
import Konto from '../components/Konto';
import Notify from '../components/Notify'

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        money: "",
        date: "",
        onCard: "",
        onCardDate: "",
      password: '',
      text: '',
      isLoggedin: false,
      isLoading: true,
      error: '',
      gdpr: true,
      webOpen: false,
      link: '',
      day: null,
      month: null,
      year: null,
      showSettings: false,
      showPersonalAds: false,
      presetUser:2,
      allowNoti:true,
    };
    this.sendNotificationImmediately=this.sendNotificationImmediately.bind(this);
  }

  async componentDidMount() {
    //await     AsyncStorage.clear();

    //Load assets
    await Font.loadAsync({
      'medium': require('../assets/Roboto-Medium.ttf'),
      'regular': require('../assets/Roboto-Regular.ttf'),
    });

    //Load data
    this.setState({
      showPersonalAds: await AsyncStorage.getItem('showPersonalAds'),
      allowNoti:await AsyncStorage.getItem('notifi')
      
    })
    await AsyncStorage.getItem('gdpr') ?
      await this._retrieveLogin() :
      this.setState({
        gdpr: false
      })
    //this.sendNotificationImmediately();
    //this.askPermissions()

  }

  _retrieveLogin = async () => {
    try {
      this.setState({
        text: await AsyncStorage.getItem('uName'),
        password: await AsyncStorage.getItem('pWord'),
      }, () => {
        if (this.state.text != null && this.state.password != null) {
          this.fetchData();
        }
        else {
          this.setLoading(false);
        }
      })
    } catch (error) {
      this.setLoading(false);
    }
  };


  askPermissions = async () => {
    try{
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== granted) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== granted) {
      return false;
    }
    return true;
  }
  catch(e){

  }
  };

  sendNotificationImmediately = async () => {
    let time =new Date(parseInt(this.state.year),parseInt(this.state.month-1),parseInt(this.state.day),9);
    let notificationId = await Notifications.scheduleLocalNotificationAsync({
      title: 'Ditt busskort går ut imorgon!'
    }, {
      time: time,
    });
    console.log(notificationId); // can  be saved in AsyncStorage or send to server
  };

  async acceptgdpr() {
    this.setState({
      gdpr: true
    })
    await AsyncStorage.setItem('gdpr', 'ok').then(() => this._retrieveLogin())
  }

  async changePersonalAds(val) {

   
    this.setState({
      showPersonalAds: val
    },async ()=>await AsyncStorage.setItem('showPersonalAds', val.toString()))
    //await AsyncStorage.setItem('showPersonalAds', val.toString())
  }

  async changeallowNoti(val) {

    if(!val){
await   Notifications.dismissAllNotificationsAsync()

    }
    else{
      if(  this.askPermissions() && this.state.year != null) 
      {
        this.sendNotificationImmediately();
       }
    }
    this.setState({
      allowNoti: val
    },async ()=>await AsyncStorage.setItem('notifi', val.toString()))
    //await AsyncStorage.setItem('showPersonalAds', val.toString())
  }

  handleWeb(link) {
    this.setState({
      link: link,
      webOpen: !this.state.webOpen,
    })
  }

  _setLogin = async () => {
    await AsyncStorage.setItem('uName', this.state.text);
    await AsyncStorage.setItem('pWord', this.state.password);
  };




  async _onClick() {

    if (this.state.text != null && this.state.password != null) {
      this.setLoading(true);


      await this.fetchData();

      this.setLoading(false);

    }
    else {

      this.setLoading(false);

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
      let pattern = /idg_opt_319">(.*?) kr <\/span>/;
      let patternDate = /Senast uppdaterat (.*?)\)<\/span>/
      let onPat = /idg_opt_306">(.*?)<\/span>/;
      let onPatDate = /idg_opt_308">Fr&#229;n(.*?)<\/span>/;
      let failPatt = /kortet ur bakgrundsystemet/;
      var on = "";
      var onDate = "";


      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("pre fetching")
      let silly =await fetch('https://webtick.se/webtick/user/pages/CardOverview.iface');
      console.log(silly);
      console.log(" fetching")
      const response = await fetch('https://webtick.se/webtick/user/pages/login/j_acegi_security_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
      console.log("fetching done")
      const htmlString = await response.text();  // get response text

      if (onPat.test(htmlString) && onPatDate.test(htmlString)) {
        on = onPat.exec(htmlString);
        onDate = onPatDate.exec(htmlString);
        onDate = onDate[1];
      }


      if (pattern.test(htmlString) && patternDate.test(htmlString)) {
        let match = pattern.exec(htmlString);
        let matchDate = patternDate.exec(htmlString);
        let shortDate = onDate.substring(17, 27);
        let years = shortDate.substring(0, 4);
        let months = shortDate.substring(5, 7);
        let days = shortDate.substring(8, 10);

        this.setState({
          money: match[1],
          date: matchDate[1],
          onCard: on[1],
          onCardDate: onDate,
          isLoggedin: true,
          error: '',
          day: days,
          month: months,
          year: years,
        },async () => {
          let  old = await AsyncStorage.getItem('endTime');

          if(old ==this.state.year+this.state.month+this.state.day)
          {
    console.log("s");
          }
          else{
            await AsyncStorage.setItem('endTime', this.state.year+this.state.month+this.state.day)
            if(this.state.allowNoti==='true' || this.state.allowNoti == true){
           if(  this.askPermissions()) 
           {
             this.sendNotificationImmediately();
            }
          }
        }
         // console.log(this.state.year+this.state.month+this.state.day)
        })
        this.setLoading(false);

        await this._setLogin();


      }
      else if (failPatt.test(htmlString)) {
        this.setState({
          isLoggedin: false,
          error: "Fel med karlstadsbuss interna system",
          password: ''
        })
        this.setLoading(false);

      }
      else {
        this.setState({
          isLoggedin: false,
          error: "Fel användarnamn eller lösenord, försök igen",
          password: ''

        })

        this.setLoading(false);
        await this.logOut();
      }
      if (this.state.error != '')
        ToastAndroid.show(this.state.error, ToastAndroid.LONG);
    }
  }




  onChangeValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  setLoading(val) {
    this.setState({
      isLoading: val
    })
  }
  showSettings() {

    this.setState({
      showSettings: !this.state.showSettings,
    })
  }


  render() {
    return (


      <View style={styles.container}>
        {this.state.isLoading &&
          <Loader
            gdpr={this.state.gdpr}
            showPersonalAds={this.state.showPersonalAds}
          />}

        {!this.state.isLoading &&
          <Head
            logOut={this.logOut.bind(this)}
            isLoggedin={this.state.isLoggedin}
            showSettings={this.showSettings.bind(this)}
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
            presetUser={this.state.presetUser}

          />
        }
        {!this.state.gdpr &&
          <Gdpr
            acceptgdpr={this.acceptgdpr.bind(this)}
            showPersonalAds={this.state.showPersonalAds}
            changePersonalAds={this.changePersonalAds.bind(this)}
          />

        }
        {this.state.showSettings &&
          <Notify
            showPersonalAds={this.state.showPersonalAds}
            changePersonalAds={this.changePersonalAds.bind(this)}
            showSettings={this.showSettings.bind(this)}
            allowNoti={this.state.allowNoti}
            changeallowNoti={this.changeallowNoti.bind(this)}
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
