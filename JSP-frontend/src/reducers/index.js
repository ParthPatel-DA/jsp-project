import { combineReducers } from "redux";
import auth from "./auth/auth";
import user from "./user/user";
import task from "./task/task";

const allReducers = combineReducers({
  auth,
  user,
  task,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
