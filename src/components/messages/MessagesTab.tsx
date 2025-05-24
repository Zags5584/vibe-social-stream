
import { useState } from 'react';
import { User, Chat, Message } from '../../types/User';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

interface MessagesTabProps {
  user: User | null;
}

const MessagesTab = ({ user }: MessagesTabProps) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      participants: ['user1', 'alex_photographer'],
      participantNames: ['You', 'Alex'],
      isGroup: false,
      createdAt: new Date(Date.now() - 1000000),
      lastMessage: {
        id: '1',
        senderId: 'alex_photographer',
        senderName: 'Alex',
        content: 'Hey! Did you see my latest sunset photo?',
        isRead: false,
        createdAt: new Date(Date.now() - 300000)
      }
    },
    {
      id: '2',
      participants: ['user1', 'sarah_foodie', 'mike_traveler'],
      participantNames: ['You', 'Sarah', 'Mike'],
      isGroup: true,
      groupName: 'Weekend Plans',
      createdAt: new Date(Date.now() - 2000000),
      lastMessage: {
        id: '2',
        senderId: 'sarah_foodie',
        senderName: 'Sarah',
        content: 'Anyone up for trying that new restaurant?',
        isRead: true,
        createdAt: new Date(Date.now() - 600000)
      }
    }
  ]);

  return (
    <div className="h-screen bg-white">
      {!selectedChat ? (
        <ChatList 
          chats={chats} 
          onChatSelect={setSelectedChat}
          currentUser={user}
        />
      ) : (
        <ChatWindow 
          chat={selectedChat}
          currentUser={user}
          onBack={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
};

export default MessagesTab;
