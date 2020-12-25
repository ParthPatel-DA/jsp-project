const responseHelper = require('../helpers/responseHelper')
var { addUser, deleteUser, editUser, getAllUser, loginData } = require('../services/userServices')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

exports.login = async (req, res) => {
  try {
    var email = req.body.email.trim()
    var password = req.body.password
    const response = await loginData(email, password)
    return responseHelper.sendJsonResponse(req, res, response.status, response.data, response.message, response.statusMessage)
  } catch (err) {
    console.log(err)
    return responseHelper.sendJsonResponse(req, res, 500, null, 'Error')
  }
}

exports.addUser = async (req, res) => {
  try {
    const response = await addUser(req.body)
    if (response) return responseHelper.sendJsonResponse(req, res, 200, response, 'Success', 'Success')

    return responseHelper.sendJsonResponse(req, res, 200, null, 'Error', 'Error')
  } catch (err) {
    return responseHelper.sendJsonResponse(req, res, 500, null, err)
  }
}

exports.deleteUser = async (req, res) => {
  try {

    const response = await deleteUser(req.body.id)

    if (response) return responseHelper.sendJsonResponse(req, res, 200, response.data, 'Delete user', 'Success')

    return responseHelper.sendJsonResponse(req, res, 200, null, 'Error', 'Error')
  } catch (err) {
    console.log('error : ', err)
    return responseHelper.sendJsonResponse(req, res, 500, null, err)
  }
}

exports.editUser = async (req, res) => {
  try {

    const condition = { _id: ObjectId(req.body.id) }
    const updatedData = {
      email: req.body.email,
      name: req.body.name,
      isDeleted: req.body.isDeleted || false,
    }

    const response = await editUser(condition, updatedData)

    if (response) return responseHelper.sendJsonResponse(req, res, 200, null, 'Update success', 'Success')
    return responseHelper.sendJsonResponse(req, res, 500, null, 'Error', 'Error')
  } catch (err) {
    return responseHelper.sendJsonResponse(req, res, 500, null, err)
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const response = await getAllUser()
    if (response) return responseHelper.sendJsonResponse(req, res, 200, response.data, 'Success', 'Success',)

    return responseHelper.sendJsonResponse(req, res, 400, null, 'Error', 'Error')
  } catch (err) {
    return responseHelper.sendJsonResponse(req, res, 500, null, err)
  }
}