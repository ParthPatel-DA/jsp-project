const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userAuth: action.auth
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default authReducer;