import axios from "../../api/instance";
import { history } from "../../App";
import { message } from "antd";

export const login = (auth) => ({
  type: "LOGIN",
  auth,
});

export const loginAsync = ({
  email,
  password,
  remember,
  lastPath,
  setLoading,
}) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      const { data } = response;
      localStorage.setItem("auth", JSON.stringify(data.data));
      if (remember) {
        localStorage.setItem("remember", JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem("remember");
      }
      dispatch(login(data.data));
      if (lastPath === "/") {
        history.push("/app");
      } else {
        history.push(`${lastPath}`);
      }
    } catch (err) {
      console.log(err.message);
      message.error("check email or password");
      setLoading(false);
    }
  };
};

export const signupAsync = ({ name, email, password, setLoading }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/auth/addUser", {
        name,
        email,
        password,
      });
      history.push("/");
    } catch (err) {
      console.log(err.message);
      message.error("check email or password");
      setLoading(false);
    }
  };
};

export const logout = () => ({
  type: "LOGOUT",
});

export const logoutAsync = () => {
  return (dispatch) => {
    localStorage.removeItem("auth");
    dispatch(logout());
    history.push("/");
  };
};
