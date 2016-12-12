'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

var PropertyView = require('./PropertyView');

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class SearchResults extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    console.log(this.props.markets.results);
    //Bring back object with array 
  
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.markets.results)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    //Returns market objects
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.id)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
         
            <View  style={styles.textContainer}>
            
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.marketname}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(id) {
    console.log(id);
    var market = this.props.markets.results.filter(prop => prop.id === id )[0];
    

    this.props.navigator.push({
      title: "Market Results",
      component: PropertyView,
      passProps: {market: market}
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }

}

module.exports = SearchResults;
