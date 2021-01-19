import RNGooglePlaces from 'react-native-google-places';
import homeTypes from './types';

export const setNameAction = () => ({
  type: homeTypes.SET_NAME,
  payload: 'Eman',
});

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
  console.warn(getState().homeReducer.inputData.pickup);
  let userInput = getState().homeReducer.resultTypes.pickup
    ? getState().homeReducer.inputData.pickup
    : getState().homeReducer.inputData.dropoff;

  RNGooglePlaces.getAutocompletePredictions(userInput, {
    country: 'FR',
  })
    .then((res) => {
      console.warn(userInput);
      console.warn(res);
      dispatch({
        type: homeTypes.GET_ADDRESSES_PREDICTIONS,
        payload: res,
      });
    })
    .catch((error) => console.log(error.message));
};
