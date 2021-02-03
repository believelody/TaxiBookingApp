import RNGooglePlaces from 'react-native-google-places';
import request from '../../utils/request';
import homeTypes from './types';
import {GOOGLE_API_KEY} from '@env';
import calculateFare from '../../utils/farCalculator';

export const getCurrentLocationAction = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      dispatch({
        type: homeTypes.GET_CURRENT_LOCATION,
        payload: position.coords,
      });
    },
    (error) => console.log(error),
    {enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000},
  );
};

export const getInputDataAction = (payload) => ({
  type: homeTypes.GET_INPUT_DATA,
  payload,
});

export const toggleSearchResultAction = (payload) => ({
  type: homeTypes.TOGGLE_SEARCH_RESULT,
  payload,
});

export const getAddressesPredictionsAction = () => (dispatch, getState) => {
  let userInput = getState().homeReducer.resultTypes.pickup
    ? getState().homeReducer.inputData.pickup
    : getState().homeReducer.inputData.dropoff;

  RNGooglePlaces.getAutocompletePredictions(userInput, {
    country: 'FR',
  })
    .then((res) => {
      dispatch({
        type: homeTypes.GET_ADDRESSES_PREDICTIONS,
        payload: res,
      });
    })
    .catch((error) => console.log(error.message));
};

export const getSelectedAddressAction = (payload) => (dispatch) => {
  RNGooglePlaces.lookUpPlaceByID(payload)
    .then((res) => {
      dispatch({
        type: homeTypes.GET_SELECTED_ADDRESS,
        payload: res,
      });
    })
    .catch((error) => console.log(error));
};

export const getDistanceMatrixAction = (payload) => async (dispatch) => {
  const baseRate = 0.4;
  const timeRate = 0.14;
  const distanceRate = 0.97;
  const surge = 1;
  await request
    .get('https://maps.googleapis.com/maps/api/distancematrix/json')
    .query({
      origins: `${payload.selectedPickup.location.latitude},${payload.selectedPickup.location.longitude}`,
      destinations: `${payload.selectedDropoff.location.latitude},${payload.selectedDropoff.location.longitude}`,
      mode: 'driving',
      key: GOOGLE_API_KEY,
    })
    .finish((error, res) => {
      // console.warn(res);
      const fare = calculateFare(
        baseRate,
        timeRate,
        res.body.rows[0].elements[0].duration.value,
        distanceRate,
        res.body.rows[0].elements[0].distance.value,
        surge,
      );
      dispatch({
        type: homeTypes.GET_DISTANCE_MATRIX,
        payload: {
          distanceMatrix: res.body,
        },
      });
      dispatch({
        type: homeTypes.GET_FARE,
        payload: fare,
      });
    });
};

export const bookCarAction = () => (dispatch, getState) => {
  const payload = {
    data: {
      userName: 'test',
      pickup: {
        address: getState().homeReducer.selectedPickup.address,
        name: getState().homeReducer.selectedPickup.name,
        latitude: getState().homeReducer.selectedPickup.latitude,
        longitude: getState().homeReducer.selectedPickup.longitude,
      },
      dropoff: {
        address: getState().homeReducer.selectedDropoff.address,
        name: getState().homeReducer.selectedDropoff.name,
        latitude: getState().homeReducer.selectedDropoff.latitude,
        longitude: getState().homeReducer.selectedDropoff.longitude,
      },
      fare: getState().homeReducer.fare,
      status: 'pending',
    },
  };

  request
    .post('http://29b2df04c555.ngrok.io/api/bookings')
    .send(payload)
    .finish((error, res) => {
      dispatch({
        type: homeTypes.BOOK_CAR,
        payload: res.body,
      });
    });
};

export const getNearbyDriversAction = () => (dispatch, getState) => {
  request
    .get('http://29b2df04c555.ngrok.io/api/driverLocation')
    .query({
      latitude: getState().homeReducer.region.latitude,
      longitude: getState().homeReducer.region.longitude,
    })
    .finish((error, res) => {
      dispatch({
        type: homeTypes.GET_NEARBY_DRIVERS,
        payload: res.body,
      });
    });
};
