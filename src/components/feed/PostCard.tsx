
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { User, Post } from '../../types/User';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onLike: (postId: string) => void;
}

const PostCard = ({ post, currentUser, onLike }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback>{post.username[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate">{post.username}</h3>
              {post.type === 'curated' && (
                <Badge variant="secondary" className="text-xs">
                  Curated
                </Badge>
              )}
              <span className="text-sm text-gray-500">·</span>
              <span className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</span>
            </div>
            
            <p className="text-gray-800 mb-3 leading-relaxed">{post.content}</p>
            
            {post.images && post.images.length > 0 && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img 
                  src={post.images[0]} 
                  alt="Post content"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLike(post.id)}
                  className={`flex items-center gap-1 hover:bg-red-50 ${
                    isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes.length}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments.length}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-500 hover:text-green-600 hover:bg-green-50"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{post.shares}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
