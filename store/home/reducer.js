import update from 'react-addons-update';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const ASPECT_RATION = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;

const handleGetCurrentLocation = (state, {payload}) =>
  update(state, {
    region: {
      latitude: {
        $set: payload.latitude,
      },
      longitude: {
        $set: payload.longitude,
      },
      latitudeDelta: {$set: LATITUDE_DELTA},
      longitudeDelta: {$set: LONGITUDE_DELTA},
    },
  });

const ACTIONS_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
};

const initialState = {
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
};

export default function homeReducer(state = initialState, action) {
  const handler = ACTIONS_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
