import React from 'react';
import {Button, FooterTab, Footer as NBFooter, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const tabs = [
    {
      title: 'TaxiCar',
      subtitle: '',
      icon: 'car',
    },
    {
      title: 'TaxiShare',
      subtitle: '',
      icon: 'car',
    },
    {
      title: 'TaxiPool',
      subtitle: '',
      icon: 'car',
    },
    {
      title: 'TaxiCar',
      subtitle: '(Premium)',
      icon: 'car',
    },
  ];
  return (
    <NBFooter>
      <FooterTab style={styles.container}>
        {tabs.map((tab, index) => (
          <Button key={index}>
            <Icon
              name={tab.icon}
              size={20}
              color={index === 0 ? '#FF5E3A' : 'grey'}
            />
            <Text
              style={{fontSize: 10, color: index === 0 ? '#FF5E3A' : 'grey'}}>
              {tab.title}
            </Text>
            <Text style={styles.subText}>{tab.subtitle}</Text>
          </Button>
        ))}
      </FooterTab>
    </NBFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  subText: {
    fontSize: 8,
  },
});

export default Footer;
