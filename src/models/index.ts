import { sequelize } from "../config/db";
import { User } from "./user";
import { Message } from "./message";
import { ChatRoom } from "./chatRoom";

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId', targetKey: 'id' });

Message.belongsTo(ChatRoom, { foreignKey: 'roomId', targetKey: 'id' });
ChatRoom.hasMany(Message, { foreignKey: 'roomId' });

User.hasMany(ChatRoom, { foreignKey: 'creator' })
ChatRoom.belongsTo(User, { foreignKey: 'creator', targetKey: 'id'})

export { sequelize, User, Message, ChatRoom };

