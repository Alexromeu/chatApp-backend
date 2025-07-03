import { sequelize } from "../config/db";
import { User } from "./user";
import { Message } from "./message";
import { ChatRoom } from "./chatRoom";

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

Message.belongsTo(ChatRoom, { foreignKey: 'chatRoomId', targetKey: 'id' });
ChatRoom.hasMany(Message, { foreignKey: 'chatRoomId' });

User.hasMany(ChatRoom, { foreignKey: 'creator' })
ChatRoom.belongsTo(User, { foreignKey: 'creator', targetKey: 'id'})

export { sequelize, User, Message };
