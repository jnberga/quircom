const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");

const {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  EditUser,
  DeleteUser,
} = require("../controllers/UserController");

router.get("/", GetAllUsers);
router.get("/:id", GetSpecificUser);
router.post("/", upload.single("file"), CreateUser);
router.patch("/:id", EditUser);
router.delete("/:id", DeleteUser);

module.exports = router;