/**
 * Initial State
 */
const initialState = {
  message: 'We did it!',
};

/**
 * Types
 */
const DO_SOMETHING = 'DO_SOMETHING';

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DO_SOMETHING:
      return {
        ...state,
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const doSomething = () => ({
  type: DO_SOMETHING,
});

/**
 * Export
 */
export default reducer;
