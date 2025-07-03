import { InferCreationAttributes } from "sequelize";
import { User } from "../models/user";

type UserInstance = InstanceType<typeof User>;

export const createUser = async (userData: InferCreationAttributes<UserInstance>) => {
  return await User.create(userData);
};
