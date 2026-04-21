"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const queries_1 = require("../utils/queries");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield (0, queries_1.getUserByUsername)(username);
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        try {
            const valid = yield bcrypt.compare(password, user.password);
            if (!valid) {
                res.status(401).json({ error: 'Invalid password' });
                return;
            }
        }
        catch (err) {
            console.error('Bcrypt error:', err);
            res.status(500).json({ error: 'Error comparing passwords' });
            return;
        }
        const token = jwt.sign({ userId: user.id, username: username }, JWT_SECRET, {
            expiresIn: '8h',
        });
        res.json({ message: 'Login successful', token });
    }
    catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.login = login;
