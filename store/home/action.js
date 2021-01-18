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
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );
};
