
import { User, Chat } from '../../types/User';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MessageSquare, Users } from 'lucide-react';

interface ChatListProps {
  chats: Chat[];
  currentUser: User | null;
  onChatSelect: (chat: Chat) => void;
}

const ChatList = ({ chats, currentUser, onChatSelect }: ChatListProps) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Messages</h1>
          <Button variant="ghost" size="sm">
            <MessageSquare className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare className="w-12 h-12 mb-4" />
            <p>No messages yet</p>
            <p className="text-sm">Start a conversation!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onChatSelect(chat)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face`} />
                      <AvatarFallback>
                        {chat.isGroup ? <Users className="w-5 h-5" /> : chat.participantNames[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    {chat.isGroup && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {chat.isGroup ? chat.groupName : chat.participantNames[1]}
                      </h3>
                      <div className="flex items-center gap-2">
                        {chat.lastMessage && !chat.lastMessage.isRead && (
                          <Badge className="w-2 h-2 p-0 bg-blue-600" />
                        )}
                        <span className="text-xs text-gray-500">
                          {chat.lastMessage ? formatTime(chat.lastMessage.createdAt) : ''}
                        </span>
                      </div>
                    </div>
                    
                    {chat.lastMessage && (
                      <p className="text-sm text-gray-600 truncate">
                        {chat.isGroup && `${chat.lastMessage.senderName}: `}
                        {chat.lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
