/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTaskAsync,
  deleteTaskAsync,
  makeCompleteTaskAsync,
} from "../../../../actions";
// import { deleteTaskSaga } from "../../../store/actions";

const TaskList = (props) => {
  const { setTaskId } = props;
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);

  useEffect(() => {
    getAllTaskAsync({ dispatch, isCompleted });
  }, [isCompleted]);

  return (
    <>
      <Typography component="h1" variant="h5">
        Task List
      </Typography>
      <div className="text-right">
        {!isCompleted ? "Switch to complete task" : "Switch to incomplete task"}
        <Switch
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Assign To</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.userName}</TableCell>
              <TableCell align="right">
                <i
                  className="fa fa-pencil mr-1"
                  onClick={() => setTaskId(row._id)}
                />
                <i
                  className="fa fa-trash mr-1"
                  onClick={() =>
                    deleteTaskAsync({ task: { id: row._id }, dispatch })
                  }
                />
                {!row.isCompleted && (
                  <i
                    className="fa fa-check"
                    onClick={() =>
                      makeCompleteTaskAsync({ task: { id: row._id }, dispatch })
                    }
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TaskList;
