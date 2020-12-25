const responseHelper = require("../helpers/responseHelper");
var {
  addTask,
  deleteTask,
  editTask,
  getAllTask,
  assignTask,
  getTaskDetailById,
  makeCompleteTask,
} = require("../services/taskServices");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.addTask = async (req, res) => {
  try {
    const response = await addTask(req.body);
    const data = await getTaskDetailById(response._id);
    if (response)
      return responseHelper.sendJsonResponse(
        req,
        res,
        200,
        data.data[0],
        "Success",
        "Success"
      );

    return responseHelper.sendJsonResponse(
      req,
      res,
      200,
      null,
      "Error",
      "Error"
    );
  } catch (err) {
    console.log("erro : ", err);
    return responseHelper.sendJsonResponse(req, res, 500, null, err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const response = await deleteTask(req.body.id);

    if (response)
      return responseHelper.sendJsonResponse(
        req,
        res,
        200,
        response.data,
        "Delete task",
        "Success"
      );

    return responseHelper.sendJsonResponse(
      req,
      res,
      200,
      null,
      "Error",
      "Error"
    );
  } catch (err) {
    console.log("error : ", err);
    return responseHelper.sendJsonResponse(req, res, 500, null, err);
  }
};

exports.makeCompleteTask = async (req, res) => {
  try {
    const response = await makeCompleteTask(req.body.id);

    if (response)
      return responseHelper.sendJsonResponse(
        req,
        res,
        200,
        response.data,
        "Done task",
        "Success"
      );

    return responseHelper.sendJsonResponse(
      req,
      res,
      200,
      null,
      "Error",
      "Error"
    );
  } catch (err) {
    console.log("error : ", err);
    return responseHelper.sendJsonResponse(req, res, 500, null, err);
  }
};

exports.assignTask = async (req, res) => {
  try {
    const response = await assignTask(req.body.taskId, req.body.userId);

    if (response)
      return responseHelper.sendJsonResponse(
        req,
        res,
        200,
        response.data,
        "Assign task",
        "Success"
      );

    return responseHelper.sendJsonResponse(
      req,
      res,
      200,
      null,
      "Error",
      "Error"
    );
  } catch (err) {
    console.log("error : ", err);
    return responseHelper.sendJsonResponse(req, res, 500, null, err);
  }
};

exports.editTask = async (req, res) => {
  try {
    const condition = { _id: ObjectId(req.body.id) };
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      assignTo: req.body.assignTo,
    };

    const response = await editTask(condition, updatedData);
    const data = await getTaskDetailById(req.body.id);
    if (response)
      return responseHelper.sendJsonResponse(
        req,
        res,
        200,
        data.data[0],
        "Update success",
        "Success"
      );
    return responseHelper.sendJsonResponse(
      req,
      res,
      500,
      null,
      "Error",
      "Error"
    );
  } catch (err) {
    return responseHelper.sendJsonResponse(req, res, 500, null, err);
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const response = await getAllTask(
      req.query.isCompleted,
      req.tokenData.user._id
    );
    if (response)
      return responseHelper.sendJsonResponse(
        req,
        res,
        200,
        response.data,
        "Success",
        "Success"
      );

    return responseHelper.sendJsonResponse(
      req,
      res,
      400,
      null,
      "Error",
      "Error"
    );
  } catch (err) {
    return responseHelper.sendJsonResponse(req, res, 500, null, err);
  }
};
