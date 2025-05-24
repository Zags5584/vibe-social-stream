
export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  profilePicture?: string;
  bio?: string;
  interests: string[];
  followers: string[];
  following: string[];
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  images?: string[];
  video?: string;
  likes: string[];
  comments: Comment[];
  shares: number;
  createdAt: Date;
  type: 'user' | 'curated';
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  image?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage?: Message;
  isGroup: boolean;
  groupName?: string;
  groupAdmin?: string;
  createdAt: Date;
}
