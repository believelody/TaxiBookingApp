import {Input, InputGroup, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

const Searchbox = () => {
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E34" />
          <Input
            style={styles.inpuSearch}
            placeholder="Choose pick-up location"
          />
        </InputGroup>
      </View>
      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP-OFF</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E34" />
          <Input
            style={styles.inpuSearch}
            placeholder="Choose drop-off location"
          />
        </InputGroup>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    top: 50,
    position: 'absolute',
    width: width,
  },
  inputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: '#fff',
    opacity: 0.9,
    borderRadius: 7,
  },
  secondInputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    opacity: 0.9,
    borderRadius: 7,
  },
  inputSearch: {
    fontSize: 14,
  },
  label: {
    fontSize: 10,
    fontStyle: 'italic',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0,
  },
});

export default Searchbox;
