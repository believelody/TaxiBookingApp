import React, {useEffect} from 'react';
import {Input, InputGroup, View} from 'native-base';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect, useSelector} from 'react-redux';
import {
  getInputDataAction,
  toggleSearchResultAction,
  getAddressesPredictionsAction,
  getDistanceMatrixAction,
} from '../../store/home/action';
import SearchResults from '../search-results/SearchResults';

const {width} = Dimensions.get('window');

const Searchbox = ({
  getInputData,
  toggleSearchResult,
  getAddressesPredictions,
  getDistanceMatrix,
}) => {
  const {resultTypes, inputData, selectedPickup, selectedDropoff} = useSelector(
    (state) => state.homeReducer,
  );
  const handleChangeText = (key, value) => {
    getInputData({key, value});
    getAddressesPredictions();
  };
  const handleFocus = (value) => {
    toggleSearchResult(value);
    getAddressesPredictions();
  };

  useEffect(() => {
    if (selectedPickup && selectedDropoff) {
      getDistanceMatrix({selectedPickup, selectedDropoff});
    }
  }, [selectedPickup, selectedDropoff, getDistanceMatrix]);
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E34" />
          <Input
            style={styles.inputSearch}
            value={inputData.pickup}
            placeholder="Choose pick-up location"
            onFocus={() => handleFocus('pickup')}
            onChangeText={(text) => handleChangeText('pickup', text)}
          />
        </InputGroup>
      </View>
      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP-OFF</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E34" />
          <Input
            style={styles.inputSearch}
            value={inputData.dropoff}
            placeholder="Choose drop-off location"
            onFocus={() => handleFocus('dropoff')}
            onChangeText={(text) => handleChangeText('dropoff', text)}
          />
        </InputGroup>
      </View>
      {Object.values(resultTypes).some((v) => v) && <SearchResults />}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    top: 50,
    position: 'absolute',
    width,
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
    padding: 0,
  },
  label: {
    fontSize: 10,
    fontStyle: 'italic',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0,
  },
});

const mapDispatchToProps = {
  getInputData: getInputDataAction,
  toggleSearchResult: toggleSearchResultAction,
  getAddressesPredictions: getAddressesPredictionsAction,
  getDistanceMatrix: getDistanceMatrixAction,
};

export default connect(null, mapDispatchToProps)(Searchbox);
