import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const log = createLogger({diff: true, collapsed: true});

export default (initialState = {}) => {
  const middlewares = [thunk, log];
  const enhancers = [];
  console.warn(rootReducer);

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers),
  );
};
