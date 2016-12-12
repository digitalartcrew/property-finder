'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

var SearchResults = require('./SearchResults');

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

//Build url for request
var requestUrl = function (key, value, zip) {
  var data = {
      zip: zip,
  };
  data[key] = value;
  return 'https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + data.zip;
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchZip: '',
      isLoading: false,
      message: ''
    };
  }

  onSearchZipChanged(event) {
    console.log('onSearchZipChanged');
    this.setState({ searchZip: event.nativeEvent.text });
    console.log(this.state.searchZip);
  }

  _executeQuery(query) {
    console.log(query);
    this.setState({ isLoading: true });
  

    var response;
    var json;

    fetch({method: 'GET', url: query })
    .then(response => response.json().then(json => this._handleResponse(json)), this.setState({
      isLoading: true,
      message: 'Searching for markets...',
    }))
    .catch(error =>
       this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
     }));
  }

  _handleResponse(response) {
  
    this.setState({ isLoading: false , message: '' });


    if (response) {
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {markets: response}
      });
     
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }

  onSearchPressed() {
    var query = requestUrl('zip', this.state.searchZip);
    this._executeQuery(query);
  }



  render() {
    console.log('SearchPage.render');

    var spinner = this.state.isLoading ?
    ( <ActivityIndicator
        size='large'/> ) :
    ( <View/>);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for local Farmer Markets By Zip Code!
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            onChange={this.onSearchZipChanged.bind(this)}
            placeholder='Search via zip'/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'>
            <Text
              style={styles.buttonText}
              onPress={this.onSearchPressed.bind(this)}>
              Go
            </Text>
          </TouchableHighlight>
        </View>
    
        <Image source={require('./Resources/house.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = SearchPage;
