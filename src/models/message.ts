import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { ChatRoom } from './chatRoom';
import { User } from './user'

export const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  chatRoomId: {
    type: DataTypes.INTEGER,
    allowNull: false,

    references: {
      model: ChatRoom,
      key: 'id'
    }
  },

  userId: {
   type:DataTypes.INTEGER,
   allowNull: false,
   
   references: {
    model: User,
    key: 'id'
   }
  },

  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
});



