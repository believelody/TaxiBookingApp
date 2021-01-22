import React from 'react';
import {Text, View} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const Fare = ({fare}) => {
  if (fare < 1) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.fareText}>FARE: RM</Text>
        <Text style={styles.amount}>{fare}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 40,
    padding: 10,
    backgroundColor: 'grey',
  },
  fareText: {
    fontSize: 12,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Fare;
