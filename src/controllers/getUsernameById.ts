import { Request, Response } from "express";
import { User } from "../models/user"; 

export const getUsernameById = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const user = await User.findByPk(userId, {
      attributes: ["username"] });

    if (!user) {
      res.status(404).json({ error: "User not found." })
      return;
    }

    res.json({ username: user.dataValues.username });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error." });
    return; 
  }
};
