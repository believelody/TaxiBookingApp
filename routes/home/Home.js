import {Container} from 'native-base';
import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import Fab from '../../components/fab/Fab';
import Fare from '../../components/fare/Fare';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Map from '../../components/map/Map';
import Searchbox from '../../components/searchbox/Searchbox';
import {
  getCurrentLocationAction,
  getNearbyDriversAction,
} from '../../store/home/action';

const Home = ({getCurrentLocation, getNearbyDrivers}) => {
  const {region, fare} = useSelector((state) => state.homeReducer);

  useEffect(() => {
    getCurrentLocation();
    setTimeout(() => {
      getNearbyDrivers();
    }, 1000);
  }, [getCurrentLocation, getNearbyDrivers]);

  return (
    <Container>
      <Header />
      <Map region={region} />
      <Searchbox />
      <Fab />
      <Fare fare={fare} />
      <Footer />
    </Container>
  );
};

const mapDispatchToProps = {
  getCurrentLocation: getCurrentLocationAction,
  getNearbyDrivers: getNearbyDriversAction,
};

export default connect(null, mapDispatchToProps)(Home);
