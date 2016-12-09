'use strict';

import React, {Component} from 'react';
import {NavigatorIOS, StyleSheet, AppRegistry} from 'react-native';

let SearchPage = require('./SearchPage');

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class PropertyFinderApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Farmer\'s Market Finder',
          component: SearchPage,
        }}/>
    );
  }
}

AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });
