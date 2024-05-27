import { USER_CLIENT_ID, USER_CLIENT_ROLE } from "../../util/utils";
import { CHANGE_USER_ID } from "../actions";

const initialState = {
  userId: USER_CLIENT_ID,
  userRole: USER_CLIENT_ROLE,
};

const userReducer = (state = initialState, action) => {
  if (action.type === CHANGE_USER_ID) {
    return { ...state, ...action.payload };
  }
  return state;
}

export default userReducer;