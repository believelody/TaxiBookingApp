import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import Home from './home/Home';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} title="home" initial />
  </Scene>,
);

export default scenes;