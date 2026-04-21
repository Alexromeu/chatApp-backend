"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const chatRoom_1 = require("./chatRoom");
const user_1 = require("./user");
exports.Message = db_1.sequelize.define("Message", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    senderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_1.User,
            key: 'id'
        }
    },
    roomId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: chatRoom_1.ChatRoom,
            key: 'id'
        }
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    sendername: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
