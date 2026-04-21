"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getUsernameById_1 = require("../controllers/getUsernameById");
const router = (0, express_1.Router)();
router.get("/user/:id", getUsernameById_1.getUsernameById);
exports.default = router;
