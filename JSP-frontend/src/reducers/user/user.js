import * as actionLabels from "../../actions/actionLabels";

const initialState = {
  users: [],
  isLoading: false,
  errorMsg: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_ALL_USER_SUCCESS: {
      const { users } = payload;
      return { ...state, users, isLoading: false, errorMsg: "" };
    }
    case actionLabels.GET_ALL_USER_FAIL:
      return { ...state, isLoading: false, errorMsg: payload };
    default:
      return state;
  }
};
