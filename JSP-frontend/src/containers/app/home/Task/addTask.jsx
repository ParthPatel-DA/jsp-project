import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { addTaskAsync, editTaskAsync } from "../../../../actions";

const AddTask = (props) => {
  const { editId, setTaskId } = props;
  const { users } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);
  const taskObj = tasks.filter((item) => item._id === editId);

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setTask({
      title: taskObj.length !== 0 ? taskObj[0].title : undefined,
      description: taskObj.length !== 0 ? taskObj[0].description : undefined,
      assignTo:
        taskObj.length !== 0 ? taskObj[0].assignTo || undefined : undefined,
    });
  }, [editId]);

  const dispatch = useDispatch();

  const clearForm = () => {
    setTask({});
  };

  const stopLoader = () => {
    setLoading(false);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        New Task
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        name="title"
        type="title"
        label={task.title !== "" ? "Title" : "Empty Title is not Allow"}
        autoComplete="title"
        autoFocus
        onChange={onChange}
        value={task.title ? task.title : ""}
        error={task.title === ""}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        rowsMax={4}
        required
        fullWidth
        id="description"
        name="description"
        type="description"
        label={
          task.description !== ""
            ? "Description"
            : "Empty Description is not Allow"
        }
        autoComplete="description"
        onChange={onChange}
        value={task.description ? task.description : ""}
        error={task.description === ""}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Select
        variant="outlined"
        className="mt-2"
        margin="normal"
        native
        required
        fullWidth
        name="assignTo"
        value={task.assignTo ? task.assignTo : ""}
        onChange={onChange}
        inputProps={{
          name: "assignTo",
          id: "assignTo-native-simple",
        }}
        error={task.assignTo === ""}
      >
        <option aria-label="None" value="">
          Select User
        </option>
        {users.map((item) => (
          <option value={item._id}>{item.name}</option>
        ))}
      </Select>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="mt-3"
        onClick={() => {
          if (task.title && task.description && task.assignTo) {
            setLoading(true);
            // props.loginAsync(task);
            if (editId) {
              editTaskAsync({
                task: { ...task, id: editId },
                clearForm,
                stopLoader,
                setTaskId,
                dispatch,
              });
            } else {
              addTaskAsync({ task, clearForm, stopLoader, dispatch });
            }
          } else {
            if (!task.title) {
              setTask({ ...task, title: "" });
            }
            if (!task.description) {
              setTask({ ...task, description: "" });
            }
            if (!task.assignTo) {
              setTask({ ...task, assignTo: "" });
            }
          }
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Add Task"}
      </Button>
    </>
  );
};

export default AddTask;
