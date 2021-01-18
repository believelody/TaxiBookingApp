import { Container } from 'native-base';
import React, { useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import Map from '../../components/map/Map';
import {setNameAction} from '../../store/home/action';

const Home = ({setName}) => {
  const region = {
    latitude: -4.441931,
    longitude: 15.266293,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const {name} = useSelector((state) => state.homeReducer);

  useEffect(() => {
    setName();
  }, [setName]);

  return (
    <Container>
      <Map region={region} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  setName: setNameAction,
};

export default connect(null, mapDispatchToProps)(Home);
