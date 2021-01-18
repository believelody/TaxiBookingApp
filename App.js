/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar} from 'react-native';
import {Router} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import createStore from './store/createStore';
import Home from './routes/home/Home';
import scenes from './routes/scenes';

const App = () => {
  const initialState = window.__INITIAL_STATE__;

  return (
    <Provider store={createStore(initialState)}>
      <Router scenes={scenes}>
        <SafeAreaView style={styles.container}>
          <Home />
        </SafeAreaView>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
