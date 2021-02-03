import React from 'react';
import {Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {bookCarAction} from '../../store/home/action';

const Fab = ({bookCar}) => {
  const {selectedPickup, selectedDropoff} = useSelector(
    (state) => state.homeReducer,
  );
  if (!selectedDropoff || !selectedPickup) {
    return null;
  }
  return (
    <Button style={styles.container} onPress={bookCar}>
      <Text style={styles.btnText}>Book</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    backgroundColor: '#FF5E3A',
  },
  disableState: {
    backgroundColor: '#D7D7D7',
  },
  activeState: {
    backgroundColor: '#FF5E3A',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

const mapDispatchToProps = {
  bookCar: bookCarAction,
};

export default connect(null, mapDispatchToProps)(Fab);
