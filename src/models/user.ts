import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import bcrypt from 'bcrypt'

const User = sequelize.define('User', {
  id: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },

  status: {
    type: DataTypes.ENUM('online', 'offline'),
    allowNull: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (user: any) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

export { User };
