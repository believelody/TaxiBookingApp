import {Container} from 'native-base';
import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import Fare from '../../components/fare/Fare';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Map from '../../components/map/Map';
import Searchbox from '../../components/searchbox/Searchbox';
import {getCurrentLocationAction} from '../../store/home/action';

const Home = ({getCurrentLocation}) => {
  const {region, fare} = useSelector((state) => state.homeReducer);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <Container>
      <Header />
      <Map region={region} />
      <Searchbox />
      <Fare fare={fare} />
      <Footer />
    </Container>
  );
};

const mapDispatchToProps = {
  getCurrentLocation: getCurrentLocationAction,
};

export default connect(null, mapDispatchToProps)(Home);
