
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Image, Video } from 'lucide-react';
import { User, Post } from '../../types/User';

interface CreatePostProps {
  user: User | null;
  onPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
}

const CreatePost = ({ user, onPost }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePost = () => {
    if (!content.trim() || !user) return;

    onPost({
      userId: user.id,
      username: user.username,
      userAvatar: user.profilePicture,
      content: content.trim(),
      likes: [],
      comments: [],
      shares: 0,
      type: 'user'
    });

    setContent('');
    setIsExpanded(false);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>{user?.username[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="min-h-[60px] resize-none border-gray-200 focus:border-blue-300"
              rows={isExpanded ? 3 : 2}
            />
            
            {isExpanded && (
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                    <Image className="w-4 h-4 mr-1" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                    <Video className="w-4 h-4 mr-1" />
                    Video
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setContent('');
                      setIsExpanded(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handlePost}
                    disabled={!content.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
