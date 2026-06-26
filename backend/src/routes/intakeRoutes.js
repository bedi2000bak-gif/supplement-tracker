const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createIntakeLog,
    getIntakeByDate,
    deleteIntakeLog
} = require("../controllers/intakeController");

router.post(
    "/",
    authMiddleware,
    createIntakeLog
);

router.get(
    "/:date",
    authMiddleware,
    getIntakeByDate
);

router.delete(
    "/:id",
    authMiddleware,
    deleteIntakeLog
); 

module.exports = router;