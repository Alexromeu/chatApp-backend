"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.get("/messages", authenticate_1.authenticate, messageController_1.getMessages);
exports.default = router;
