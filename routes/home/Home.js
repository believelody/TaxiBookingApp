import {Container} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import Map from '../../components/map/Map';
import {getCurrentLocationAction} from '../../store/home/action';

const Home = ({getCurrentLocation}) => {
  const {region} = useSelector((state) => state.homeReducer);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

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
  getCurrentLocation: getCurrentLocationAction,
};

export default connect(null, mapDispatchToProps)(Home);
