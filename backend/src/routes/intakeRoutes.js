const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createIntakeLog,
    getIntakeByDate,
    deleteIntakeLog,
    getIntakeByMonth
} = require("../controllers/intakeController");

router.post(
    "/",
    authMiddleware,
    createIntakeLog
);

router.get(
    "/month/:month",
    authMiddleware,
    getIntakeByMonth
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
