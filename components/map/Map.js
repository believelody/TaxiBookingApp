import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Searchbox from '../searchbox/Searchbox';

const Map = ({region}) => {
  console.warn('region value: ', region);
  return (
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}>
        <MapView.Marker coordinate={region} pinColor="green" />
      </MapView>
      <Searchbox />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
