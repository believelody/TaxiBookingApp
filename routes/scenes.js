import React from 'react';
import {Actions, Scene, Stack} from 'react-native-router-flux';
import Home from './home/Home';

const scenes = Actions.create(
  <Stack key="root">
    <Scene key="home" component={Home} initial hideNavBar />
  </Stack>,
);

export default scenes;