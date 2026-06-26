const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createSupplement, getSupplements, deleteSupplement} = require("../controllers/supplementController");


console.log("authMiddleware:", authMiddleware);
console.log("createSupplement:", createSupplement);
console.log("getSupplements:", getSupplements);
console.log("deleteSupplement:", deleteSupplement);

router.delete(
    "/:id",
    authMiddleware,
    deleteSupplement
);

router.post(
    "/",
    authMiddleware,
    createSupplement
);

router.get(
    "/",
    authMiddleware,
    getSupplements
);

module.exports = router;