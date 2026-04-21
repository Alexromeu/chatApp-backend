import { Request, Response } from "express";
import { getUsernameById as getUsernameQuery } from "../utils/queries"; 

export const getUsernameById = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const username = await getUsernameQuery(userId);

    if (!username) {
      res.status(404).json({ error: "User not found."});
      return;
    }

    res.json({ username });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error." });
    return; 
  }
};
