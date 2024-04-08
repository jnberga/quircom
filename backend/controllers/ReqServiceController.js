const mongoose = require("mongoose");
const RequestModel = require("../models/ReqServiceModel");
const DriveService = require("../utils/DriveService");

const GetAllRequest = async (req, res) => {
  try {
    const result = await RequestModel.find({}).populate("clientId").populate("serviceId");
    // variable.freelancerId.userName

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetSpecificRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await RequestModel.findById(id).populate("freelancerId").populate("serviceId");

    if (!result) {
        return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CreateRequest = async (req, res) => {
  try {
    const {body, files} = req;
    const request = JSON.parse(body.request);

    let requestPicture = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const { id: fileID, name: fileName } = await DriveService.UploadFiles(
          file,
          process.env.FOLDER_ID_REQUEST
        );
        requestPicture.push({
          id: fileID,
          name: fileName,
          link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
        });
      }
    }

    const result = await RequestModel.create({
      clientId: request.clientId,
      serviceId: request.serviceId,
      taskTitle: request.taskTitle,
      taskDetails: request.taskDetails,
      taskPicture: requestPicture,
      deadLine: request.deadLine,
      dateUploaded: new Date()
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const EditRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    const request = JSON.parse(body.request);
  
    const existingReq = await RequestModel.findById(id);
    if (!existingReq) {
      return res.status(404).json({ message: "No record found" });
    }
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  
    let requestPicture = existingReq.taskPicture;
  
    // Compare existing images with new ones to determine removed images
    const removedImages = existingReq.taskPicture.filter(image => !request.taskPicture.some(newImage => newImage.id === image.id));
  
    // Delete removed images from both the array and Google Drive
    for (const image of removedImages) {
      await DriveService.DeleteFiles(image.id);
      const index = requestPicture.findIndex(pic => pic.id === image.id);
      if (index !== -1) {
        requestPicture.splice(index, 1);
      }
    }
  
    // Handle file uploads
    if (files && files.length > 0) {
      for (const file of files) {
        const { id: fileID, name: fileName } = await DriveService.UploadFiles(
          file,
          process.env.FOLDER_ID_REQUEST
        );
        requestPicture.push({
          id: fileID,
          name: fileName,
          link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
        });
      }
    }
  
    const result = await RequestModel.findByIdAndUpdate(
      id,
      {
        $set: {
          taskTitle: request.taskTitle,
          taskDetails: request.taskDetails,
          taskPicture: requestPicture,
          deadLine: request.deadLine,
          dateUploaded: new Date()
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const DeleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No request listed");
    }
  
    const request = await RequestModel.findById(id);
  
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
  
    // Delete associated taskPicture from Google Drive
    for (const image of request.taskPicture) {
      await DriveService.DeleteFiles(image.id);
    }
  
    // Delete the request document from the database
    const result = await RequestModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
    GetAllRequest,
    GetSpecificRequest,
    CreateRequest,
    EditRequest,
    DeleteRequest
};