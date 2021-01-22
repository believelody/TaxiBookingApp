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

const handleGetInputData = (state, {payload}) => {
  const {key, value} = payload;

  return update(state, {
    inputData: {
      [key]: {$set: value},
    },
  });
};

const handleSearchResult = (state, {payload}) => {
  if (payload === 'pickup') {
    return update(state, {
      resultTypes: {
        pickup: {$set: true},
        dropoff: {$set: false},
      },
      predictions: {$set: []},
    });
  } else if (payload === 'dropoff') {
    return update(state, {
      resultTypes: {
        pickup: {$set: false},
        dropoff: {$set: true},
      },
      predictions: {$set: []},
    });
  } else {
    return update(state, {
      resultTypes: {
        pickup: {$set: false},
        dropoff: {$set: false},
      },
      predictions: {$set: []},
    });
  }
};

const handleGetAddressesPredictions = (state, {payload}) => {
  return update(state, {
    predictions: {$set: payload},
  });
};

const handleGetSelectedAddress = (state, {payload}) => {
  let selectedTitle = state.resultTypes.pickup
    ? 'selectedPickup'
    : 'selectedDropoff';
  return update(state, {
    [selectedTitle]: {$set: payload},
    resultTypes: {
      pickup: {$set: false},
      dropoff: {$set: false},
    },
  });
};

const handleGetDistanceMatrix = (state, {payload}) => {
  return update(state, {
    distanceMatrix: {$set: payload.distanceMatrix},
    fare: {$set: payload.fare},
  });
};

const handleGetFare = (state, {payload}) => {
  return update(state, {
    fare: {$set: payload},
  });
};

const ACTIONS_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT_DATA: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handleSearchResult,
  GET_ADDRESSES_PREDICTIONS: handleGetAddressesPredictions,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_FARE: handleGetFare,
};

const initialState = {
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
  inputData: {},
  resultTypes: {pickup: false, dropoff: false},
  predictions: [],
  selectedDropoff: null,
  selectedPickup: null,
  distanceMatrix: {},
  fare: 0,
};

export default function homeReducer(state = initialState, action) {
  const handler = ACTIONS_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
