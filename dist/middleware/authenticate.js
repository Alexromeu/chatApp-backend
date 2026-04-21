"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const verifyToken_1 = require("../utils/verifyToken");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }
    ;
    try {
        (0, verifyToken_1.verifyToken)(token);
        next();
    }
    catch (err) {
        console.error("auth error: ", err),
            res.status(401).json({ error: " invalid or expired token " });
    }
};
exports.authenticate = authenticate;
