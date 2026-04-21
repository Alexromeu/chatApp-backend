"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoom = void 0;
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
exports.ChatRoom = db_1.sequelize.define("ChatRoom", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    creator: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_1.User,
            key: 'id'
        }
    }
});
