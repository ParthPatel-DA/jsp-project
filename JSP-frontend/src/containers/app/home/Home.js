import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUserAsync } from "../../../actions";
import AddTask from "./Task/addTask";
import TaskList from "./Task/TaskList";

const Home = (props) => {
  const [taskId, setTaskId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUserAsync({ dispatch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      <div className="col-6">
        <AddTask editId={taskId} setTaskId={setTaskId} />
      </div>
      <div className="col-6">
        <TaskList setTaskId={setTaskId} />
      </div>
    </div>
  );
};

export default Home;
