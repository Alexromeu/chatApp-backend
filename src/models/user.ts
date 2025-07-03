import { DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { sequelize } from '../config/db';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  hooks: {
    beforeCreate: async (user: any) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
  },
});

export { User };
