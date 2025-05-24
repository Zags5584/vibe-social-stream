
import { User } from '../../types/User';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Settings, Edit, Users, MessageSquare } from 'lucide-react';

interface ProfileTabProps {
  user: User | null;
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  if (!user) return null;

  const userStats = {
    posts: 42,
    followers: 1234,
    following: 567
  };

  const userPosts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop',
      likes: 23
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop',
      likes: 45
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop',
      likes: 67
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback className="text-2xl">{user.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.username}</h2>
              {user.bio && (
                <p className="text-gray-600 mt-1">{user.bio}</p>
              )}
            </div>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold">{userStats.posts}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{userStats.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{userStats.following}</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Users className="w-4 h-4 mr-1" />
              Find Friends
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-1" />
              Share Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Recent Posts</h3>
          <div className="grid grid-cols-3 gap-2">
            {userPosts.map((post) => (
              <div key={post.id} className="aspect-square relative rounded-lg overflow-hidden">
                <img 
                  src={post.image}
                  alt="User post"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {post.likes}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
