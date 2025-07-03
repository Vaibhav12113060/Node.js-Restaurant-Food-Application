const express = require("express");
const { testController } = require("../controllers/testController");

//router object

const router = express.Router();

// routes GET | POST | UPDATE | DELETE

router.get("/test-user", testController);
//export

module.exports = router;
