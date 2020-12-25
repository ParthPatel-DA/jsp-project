var { task } = require("../models/task");
var mongoose = require("mongoose");
var serviceHelper = require("../helpers/serviceHelper");

exports.addTask = async (data) => {
  try {
    var addTask = await task(data);
    return await addTask.save();
  } catch (err) {
    console.log("Error : ", err);
    return false;
  }
};

exports.deleteTask = async (id) => {
  try {
    const data = await task.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );
    if (data.nModified || data.ok) return true;
    return false;
  } catch (err) {
    console.log("Error : ", err);
    return false;
  }
};

exports.makeCompleteTask = async (id) => {
  try {
    const data = await task.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { isCompleted: true }
    );
    if (data.nModified || data.ok) return true;
    return false;
  } catch (err) {
    console.log("Error : ", err);
    return false;
  }
};

exports.assignTask = async (taskId, userId) => {
  try {
    const data = await task.updateOne(
      { _id: mongoose.Types.ObjectId(taskId) },
      { assignTo: mongoose.Types.ObjectId(userId), assigndAt: Date.now() }
    );
    if (data.nModified || data.ok) return true;
    return false;
  } catch (err) {
    console.log("Error : ", err);
    return false;
  }
};

exports.editTask = async (condition, payload) => {
  try {
    const data = await task.updateOne(condition, payload);
    if (data.nModified || data.ok) return true;
    return false;
  } catch (err) {
    console.log("Error : ", err);
    return false;
  }
};

exports.getAllTask = async (isCompleted, ID) => {
  try {
    var response = {};
    let bool = isCompleted === "true";
    const aggregateQuery = [];

    aggregateQuery.push({
      $match: { isDeleted: false, isCompleted: bool },
    });

    aggregateQuery.push({
      $lookup: {
        from: "user",
        localField: "assignTo",
        foreignField: "_id",
        as: "userData",
      },
    });
    aggregateQuery.push({
      $unwind: {
        path: "$userData",
        preserveNullAndEmptyArrays: true,
      },
    });
    aggregateQuery.push({
      $addFields: {
        userName: "$userData.name",
      },
    });
    aggregateQuery.push({
      $addFields: {
        myTask: {
          $cond: {
            if: {
              $eq: ["$assignTo", mongoose.Types.ObjectId(ID)],
            },
            then: true,
            else: false,
          },
        },
      },
    });
    aggregateQuery.push({
      $project: {
        userData: 0,
      },
    });

    const taskList = await task
      .aggregate(aggregateQuery)
      .collation({ locale: "en" });
    response.data = taskList;
    response.message =
      taskList.length === 0 ? "No task have been added yet" : "Success";
    return response;
  } catch (err) {
    console.log("Error : ", err);
    return false;
  }
};

exports.getTaskDetailById = async (ID) => {
  try {
    var response = {};
    const aggregateQuery = [];

    aggregateQuery.push({
      $match: { _id: mongoose.Types.ObjectId(ID) },
    });

    aggregateQuery.push({
      $lookup: {
        from: "user",
        localField: "assignTo",
        foreignField: "_id",
        as: "userData",
      },
    });
    aggregateQuery.push({
      $unwind: {
        path: "$userData",
        preserveNullAndEmptyArrays: true,
      },
    });
    aggregateQuery.push({
      $addFields: {
        userName: "$userData.name",
      },
    });
    aggregateQuery.push({
      $addFields: {
        myTask: {
          $cond: {
            if: {
              $eq: ["$assignTo", mongoose.Types.ObjectId(ID)],
            },
            then: true,
            else: false,
          },
        },
      },
    });
    aggregateQuery.push({
      $project: {
        userData: 0,
      },
    });

    const taskList = await task
      .aggregate(aggregateQuery)
      .collation({ locale: "en" });
    response.data = taskList;
    response.message =
      taskList.length === 0 ? "No task have been added yet" : "Success";
    return response;
  } catch (err) {
    console.log("Error : ", err);
    return false;
  }
};
