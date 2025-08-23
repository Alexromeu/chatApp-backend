import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { User } from "./user"
 
export const ChatRoom = sequelize.define("ChatRoom", {

  id: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  creator: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});
