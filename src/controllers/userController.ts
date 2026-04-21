import { createUser as createUserQuery } from "../utils/queries";

export const createUser = async (username: string, password: string) => {
  return await createUserQuery(username, password);
};
