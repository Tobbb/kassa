import React from 'react';

import { StyleSheet, View,ActivityIndicator,Text, Button,Animated,Easing,Dimensions,Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Gdpr extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (

        <View style={styles.container}>
<Text style={{fontSize:20}}>Dina personuppgifter</Text>
<Text style={{padding:20}}> För att använda appen (Reskassa, hädanefter appen ) kräver det att du godkänner 
    våra villkor och policys kring personuppgifter innan du börjar använda den, om inte, vänligen avinstallera appen.
    Dina inloggningsuppgifter sparas lokalt i din telefon och används enbart för att logga in på Karlstadsbuss hemsida. 
    Appen levereras som den är utan garantier. 
    Samtlig data som presenteras hämtas från Karlstadsbuss hemsida, därför kan inga garantier lämnas kring störningar eller bristfällig information 
    Registrering och glömt lösenord öppnar en länk till Karlstadsbuss hemsida för, ingen data behandlas i appen.
    Villkor för Karlstadsbuss finner du på följande länk https://karlstad.se/Karlstadsbuss/kundservice/Resevillkor/</Text>

    <View style={styles.box}>
<View style={styles.col}>
<Text style={{fontSize:18}}>Visa personliga annonser</Text>
<Text style={{fontSize:10}}>(Detta kommer inte minska antalet annonser)</Text>
</View>
<Switch
         onValueChange = {this.props.changePersonalAds}
         value={this.props.showPersonalAds==="true" || this.props.showPersonalAds ==true}

/>
</View>
<Button
          onPress={this.props.acceptgdpr.bind(this)}
         style={styles.bt}
            title="Jag godkänner"
          accessibilityLabel="Hämta data"
          color="#24c912"

        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    bt:{
    width:"100%",
    },

    container: {
position:"absolute",
height:"90%",
width:"80%",
marginTop:"10%",
marginLeft:"10%",
justifyContent:"center",
alignItems: 'center',
borderRadius: 10,
borderWidth: 1,
backgroundColor:"#fff"
  },
  col:{
    flexDirection:"column",
    width:"80%",
},

  box:{
    marginTop:"10%",
    justifyContent:"center",
    alignContent:"center",
    flexDirection:"row",
    alignItems:"flex-start",
    paddingBottom:5
   
  },
});
