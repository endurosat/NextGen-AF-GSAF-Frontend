import { HIDE_TOAST, SHOW_TOAST } from '../actions';

const initialState = {
  message: '',
  severity: null,
  open: false,
  userId: 'test-client-id'
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { ...state, ...action.payload, open: true };
    case HIDE_TOAST:
      return initialState;
    default:
      return state;
  }
};

export default toastReducer;
