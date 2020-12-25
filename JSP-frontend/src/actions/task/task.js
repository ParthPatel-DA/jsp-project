import axios from "../../api/instance";
import {
  GET_ALL_TASK_SUCCESS,
  GET_ALL_TASK_FAIL,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAIL,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  MAKE_COMPLETE_TASK_SUCCESS,
  MAKE_COMPLETE_TASK_FAIL,
} from "../actionLabels";

export const getAllTaskSuccess = (payload) => ({
  type: GET_ALL_TASK_SUCCESS,
  payload,
});

export const getAllTaskFail = (payload) => ({
  type: GET_ALL_TASK_FAIL,
  payload,
});

export const getAllTaskAsync = async ({ isCompleted, dispatch }) => {
  try {
    const response = await axios.get(
      `/api/getAllTask?isCompleted=${isCompleted}`
    );
    if (response.status === 200) {
      await dispatch(getAllTaskSuccess({ tasks: response.data.data }));
    } else {
      await dispatch(getAllTaskFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.status !== undefined
    ) {
      if (error.response.status === 400) {
        await dispatch(getAllTaskFail(error.response.data.message));
      } else if (
        error.response.data.message !== undefined &&
        error.response.data.message !== "" &&
        typeof error.response.data.message === "string"
      ) {
        await dispatch(getAllTaskFail(error.response.data.message));
      } else {
        await dispatch(getAllTaskFail("Server error! Please try again."));
      }
    } else {
      await dispatch(getAllTaskFail("Something went wrong! Please try again."));
    }
  }
};

export const addTaskSuccess = (payload) => ({
  type: ADD_TASK_SUCCESS,
  payload,
});

export const addTaskAsync = async ({
  task,
  clearForm,
  stopLoader,
  dispatch,
}) => {
  try {
    const response = await axios.post(`/api/addTask`, task);
    if (response.status === 200) {
      clearForm();
      stopLoader();
      await dispatch(addTaskSuccess({ task: response.data.data }));
    } else {
      stopLoader();
      await dispatch(addTaskFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    stopLoader();
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.status !== undefined
    ) {
      if (error.response.status === 400) {
        await dispatch(addTaskFail(error.response.data.message));
      } else if (
        error.response.data.message !== undefined &&
        error.response.data.message !== "" &&
        typeof error.response.data.message === "string"
      ) {
        await dispatch(addTaskFail(error.response.data.message));
      } else {
        await dispatch(addTaskFail("Server error! Please try again."));
      }
    } else {
      await dispatch(addTaskFail("Something went wrong! Please try again."));
    }
  }
};

export const addTaskFail = (payload) => ({
  type: ADD_TASK_FAIL,
  payload,
});

export const editTaskAsync = async ({
  task,
  clearForm,
  stopLoader,
  setTaskId,
  dispatch,
}) => {
  try {
    const response = await axios.post(`/api/editTask`, task);
    if (response.status === 200) {
      clearForm();
      stopLoader();
      setTaskId("");
      await dispatch(editTaskSuccess({ task: response.data.data }));
    } else {
      stopLoader();
      await dispatch(editTaskFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    stopLoader();
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.status !== undefined
    ) {
      if (error.response.status === 400) {
        await dispatch(editTaskFail(error.response.data.message));
      } else if (
        error.response.data.message !== undefined &&
        error.response.data.message !== "" &&
        typeof error.response.data.message === "string"
      ) {
        await dispatch(editTaskFail(error.response.data.message));
      } else {
        await dispatch(editTaskFail("Server error! Please try again."));
      }
    } else {
      await dispatch(editTaskFail("Something went wrong! Please try again."));
    }
  }
};

export const editTaskSuccess = (payload) => ({
  type: EDIT_TASK_SUCCESS,
  payload,
});

export const editTaskFail = (payload) => ({
  type: EDIT_TASK_FAIL,
  payload,
});

export const deleteTaskAsync = async ({ task, dispatch }) => {
  try {
    const response = await axios.post(`api/deleteTask`, task);
    if (response.status === 200) {
      await dispatch(deleteTaskSuccess(task));
    } else {
      await dispatch(deleteTaskFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.status !== undefined
    ) {
      if (error.response.status === 400) {
        await dispatch(deleteTaskFail(error.response.data.message));
      } else if (
        error.response.data.message !== undefined &&
        error.response.data.message !== "" &&
        typeof error.response.data.message === "string"
      ) {
        await dispatch(deleteTaskFail(error.response.data.message));
      } else {
        await dispatch(deleteTaskFail("Server error! Please try again."));
      }
    } else {
      await dispatch(deleteTaskFail("Something went wrong! Please try again."));
    }
  }
};

export const deleteTaskSuccess = (payload) => ({
  type: DELETE_TASK_SUCCESS,
  payload,
});

export const deleteTaskFail = (payload) => ({
  type: DELETE_TASK_FAIL,
  payload,
});

export const makeCompleteTaskAsync = async ({ task, dispatch }) => {
  try {
    const response = await axios.post(`api/makeCompleteTask`, task);
    if (response.status === 200) {
      await dispatch(makeCompleteTaskSuccess(task));
    } else {
      await dispatch(
        makeCompleteTaskFail("Something went wrong! Please try again.")
      );
    }
  } catch (error) {
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.status !== undefined
    ) {
      if (error.response.status === 400) {
        await dispatch(makeCompleteTaskFail(error.response.data.message));
      } else if (
        error.response.data.message !== undefined &&
        error.response.data.message !== "" &&
        typeof error.response.data.message === "string"
      ) {
        await dispatch(makeCompleteTaskFail(error.response.data.message));
      } else {
        await dispatch(makeCompleteTaskFail("Server error! Please try again."));
      }
    } else {
      await dispatch(
        makeCompleteTaskFail("Something went wrong! Please try again.")
      );
    }
  }
};

export const makeCompleteTaskSuccess = (payload) => ({
  type: MAKE_COMPLETE_TASK_SUCCESS,
  payload,
});

export const makeCompleteTaskFail = (payload) => ({
  type: MAKE_COMPLETE_TASK_FAIL,
  payload,
});
