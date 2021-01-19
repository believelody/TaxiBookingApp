import React from 'react';
import {Body, Button, Header as NBHeader, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, StyleSheet} from 'react-native';

const logo = require('../../assets/img/taxi_logo_white.png');

const Header = () => {
  return (
    <NBHeader
      style={{backgroundColor: '#FF1E3A'}}
      androidStatusBarColor="#FF1E3A">
      <Left>
        <Button transparent>
          <Icon name="bars" style={styles.icon} />
        </Button>
      </Left>
      <Body>
        <Image resizeMode="contain" style={styles.logo} source={logo} />
      </Body>
      <Right>
        <Button transparent>
          <Icon name="gift" style={styles.icon} />
        </Button>
      </Right>
    </NBHeader>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#fff',
    fontSize: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Header;
