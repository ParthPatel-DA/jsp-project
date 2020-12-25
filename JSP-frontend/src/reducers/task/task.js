import * as actionLabels from "../../actions/actionLabels";

const initialState = {
  tasks: [],
  isLoading: false,
  errorMsg: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_ALL_TASK_SUCCESS: {
      const { tasks } = payload;
      return { ...state, tasks, isLoading: false, errorMsg: "" };
    }
    case actionLabels.GET_ALL_TASK_FAIL:
      return { ...state, isLoading: false, errorMsg: payload };
    case actionLabels.ADD_TASK_SUCCESS: {
      const { tasks } = state;
      const { task } = payload;
      tasks.push(task);
      return { ...state, tasks, isLoading: false, errorMsg: "" };
    }
    case actionLabels.ADD_TASK_FAIL:
      return { ...state, isLoading: false, errorMsg: payload };
    case actionLabels.EDIT_TASK_SUCCESS: {
      const { tasks } = state;
      const { task } = payload;
      const index = tasks.findIndex((item) => item._id === task._id);
      tasks[index] = { ...tasks[index], ...task };
      return { ...state, tasks, isLoading: false, errorMsg: "" };
    }
    case actionLabels.EDIT_TASK_FAIL:
      return { ...state, isLoading: false, errorMsg: payload };
    case actionLabels.DELETE_TASK_SUCCESS: {
      let { tasks } = state;
      tasks = tasks.filter((item) => item._id !== payload.id);
      return { ...state, tasks, isLoading: false, errorMsg: "" };
    }
    case actionLabels.DELETE_TASK_FAIL:
      return { ...state, isLoading: false, errorMsg: payload };
    case actionLabels.MAKE_COMPLETE_TASK_SUCCESS: {
      let { tasks } = state;
      tasks = tasks.filter((item) => item._id !== payload.id);
      return { ...state, tasks, isLoading: false, errorMsg: "" };
    }
    case actionLabels.MAKE_COMPLETE_TASK_FAIL:
      return { ...state, isLoading: false, errorMsg: payload };
    default:
      return state;
  }
};
