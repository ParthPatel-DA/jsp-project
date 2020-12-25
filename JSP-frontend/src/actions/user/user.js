import axios from "../../api/instance";
import { GET_ALL_USER_SUCCESS, GET_ALL_USER_FAIL } from "../actionLabels";

export const getAllUserSuccess = (payload) => ({
  type: GET_ALL_USER_SUCCESS,
  payload,
});

export const getAllUserFail = (payload) => ({
  type: GET_ALL_USER_FAIL,
  payload,
});

export const getAllUserAsync = async ({ dispatch }) => {
  try {
    const response = await axios.get(`/api/getAllUser`);
    if (response.status === 200) {
      await dispatch(getAllUserSuccess({ users: response.data.data }));
    } else {
      await dispatch(getAllUserFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.status !== undefined
    ) {
      if (error.response.status === 400) {
        await dispatch(getAllUserFail(error.response.data.message));
      } else if (
        error.response.data.message !== undefined &&
        error.response.data.message !== "" &&
        typeof error.response.data.message === "string"
      ) {
        await dispatch(getAllUserFail(error.response.data.message));
      } else {
        await dispatch(getAllUserFail("Server error! Please try again."));
      }
    } else {
      await dispatch(getAllUserFail("Something went wrong! Please try again."));
    }
  }
};
