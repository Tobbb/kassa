import React from 'react';

import { StyleSheet, View, Text, Button, Image, FlatList, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ticketsPrices: [13, 18, 18, 21, 13, 41],
      selectedItem: 3
    };
  }



  _onPressButton(item) {
    this.setState({
      selectedItem: item
    })
  }




  render() {


    return (


      <View style={styles.container}>
        <Text style={styles.saldo}>Reskassa </Text>
        <Text style={styles.money}>{this.props.money} Kr</Text>
        <Text style={styles.tickets}>Motsvarar {Math.floor(this.props.money / this.state.ticketsPrices[this.state.selectedItem])} Biljetter
 </Text>

        <View  style={styles.flat}>
        <FlatList horizontal={true}
          showsHorizontalScrollIndicator={false}
         
          data={[
            { key: 'Barn/skolungdom', index: 0 },
            { key: 'Ungdom', index: 1 },
            { key: 'Student', index: 2 },
            { key: 'Vuxen', index: 3 },
            { key: 'Senior', index: 4 },
          ]}
          renderItem={({ item }) =>
            <TouchableHighlight underlayColor='#fff' style={[styles.hl,this.state.selectedItem == item.index ? styles.selected : styles.not]} onPress={() => this._onPressButton(item.index)}>
              <Text style={[styles.item, this.state.selectedItem == item.index ? styles.selectedText : styles.not]}>{item.key}</Text>
            </TouchableHighlight>
          }
        />
</View>
        <Text style={styles.upd}>Uppdaterat {this.props.date}</Text>
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
  not:{
    backgroundColor: "#fff"

  },
  upd:{
padding:10,
fontFamily: 'regular',

  },
  flat: {
    height: 25,
    fontFamily: 'medium',

  },
  hl: {
    marginLeft:5,
    marginRight:5,
    height: 25,
    borderRadius: 10,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: "#ff8800"
  },
  selectedText:{
    color: "#ffffff",

  },
  item: {
    marginLeft: 10,
    marginRight: 10,
  },
  extra: {
    fontSize: 15,
padding:10,
fontFamily: 'medium',


  },
  saldo: {
    padding:10,
    fontSize: 50,
    textAlign: "left",
    fontFamily: 'medium',


  },
  money: {
    padding:10,
    fontSize: 40,
    textAlign: "center",
    fontFamily: 'medium',



  },
  tickets: {
    padding:10,
    fontSize: 20,
    textAlign: "center",
    fontFamily: 'regular',

  },
  self: {
    padding:10,
    fontSize: 30,
    fontFamily: 'medium',

    textAlign: "center",

  },
  container: {
    flex: 1,
    
    alignItems: "center",
    width: "100%",
    backgroundColor:"#fff8f0",

  },
});
