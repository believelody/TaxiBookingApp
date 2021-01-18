import update from 'react-addons-update';

const handleSetName = (state, action) =>
  update(state, {
    name: {$set: action.payload},
  });

const ACTIONS_HANDLERS = {
  SET_NAME: handleSetName,
};

const initialState = {
  name: '',
};

export default function homeReducer(state = initialState, action) {
  const handler = ACTIONS_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
