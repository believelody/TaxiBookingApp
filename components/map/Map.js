import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {useSelector} from 'react-redux';

const carMarker = require('../../assets/img/carMarker.png');
const taxiLogo = require('../../assets/img/taxi_logo_white.png');

const Map = ({region}) => {
  const {nearbyDrivers, selectedPickup, selectedDropoff} = useSelector(
    (state) => state.homeReducer,
  );

  console.warn(selectedPickup);
  return (
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}>
        {selectedPickup && (
          <MapView.Marker
            coordinate={{
              latitude: selectedPickup.location.latitude,
              longitude: selectedPickup.location.longitude,
            }}
            pinColor="green"
          />
        )}
        {selectedDropoff && (
          <MapView.Marker
            coordinate={{
              latitude: selectedDropoff.location.latitude,
              longitude: selectedDropoff.location.longitude,
            }}
            pinColor="red"
          />
        )}
        {nearbyDrivers.map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: marker.coordinate.coordinates[0],
              longitude: marker.coordinate.coordinates[1],
            }}
            image={carMarker}
          />
        ))}
      </MapView>
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
