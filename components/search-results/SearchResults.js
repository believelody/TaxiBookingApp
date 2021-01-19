import React from 'react';
import {Body, Left, List, ListItem, Text, View} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const SearchResults = () => {
  const {predictions} = useSelector((state) => state.homeReducer);
  return (
    <View style={styles.searchResultsWrapper}>
      <List
        dataArray={predictions}
        renderRow={(item) => {
          console.warn(item);
          return (
            <ListItem button avatar>
              <Left style={styles.leftContainer}>
                <Icon style={styles.leftIcon} name="location-on" />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{item.primaryText}</Text>
                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </Body>
            </ListItem>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchResultsWrapper: {
    width: width,
    height: 1000,
    backgroundColor: '#fff',
    opacity: 0.9,
    marginTop: 8,
  },
  primaryText: {
    fontWeight: 'bold',
    color: '#373737',
  },
  secondaryText: {
    fontStyle: 'italic',
    color: '#7D7D7D',
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D',
  },
  leftIcon: {
    fontSize: 20,
    color: '#7D7D7D',
  },
  distance: {
    fontSize: 12,
  },
});

export default SearchResults;
