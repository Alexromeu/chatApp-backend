import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { ChatRoom } from './chatRoom';
import { User } from './user'

export const Message = sequelize.define("Message", {
  id: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true
  },

  senderId: {
   type:DataTypes.UUID,
   allowNull: false,
   
   references: {
    model: User,
    key: 'id'
   }
  },

  roomId: {
    type: DataTypes.UUID,
    allowNull: false,

    references: {
      model: ChatRoom,
      key: 'id'
    }
  },
  
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: true,
  }

});



