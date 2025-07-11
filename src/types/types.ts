export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
  status?: "online" | "offline";
};

export type MessagePayload = {
  senderId: string;
  roomId: string;
  content: string;
  timestamp: number; 
}

export type Message = {
  id: string;
  senderId: string;
  roomId: string;
  content: string;
  timestamp: number; 
};

export type ChatRoom = {
  id: string;
  name: string;
  creator: string
  participants: User[];
  messages: Message[];
};

