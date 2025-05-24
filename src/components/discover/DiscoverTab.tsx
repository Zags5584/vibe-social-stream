
import { useState } from 'react';
import { User } from '../../types/User';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { BookOpen, TrendingUp, Users, Video } from 'lucide-react';

interface DiscoverTabProps {
  user: User | null;
}

const DiscoverTab = ({ user }: DiscoverTabProps) => {
  const [activeCategory, setActiveCategory] = useState('trending');

  const categories = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'people', label: 'People', icon: Users },
  ];

  const trendingContent = [
    {
      id: '1',
      title: 'The Future of AI in Social Media',
      description: 'Exploring how artificial intelligence is reshaping the way we connect and share content online.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop',
      category: 'Technology',
      readTime: '5 min read',
      likes: 234
    },
    {
      id: '2',
      title: 'Travel Photography Tips',
      description: 'Capture stunning travel moments with these expert photography techniques.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop',
      category: 'Photography',
      readTime: '8 min read',
      likes: 156
    },
    {
      id: '3',
      title: 'Healthy Cooking Made Simple',
      description: 'Quick and nutritious recipes for busy professionals.',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=200&fit=crop',
      category: 'Food',
      readTime: '6 min read',
      likes: 89
    }
  ];

  const suggestedPeople = [
    {
      id: '1',
      username: 'alex_photographer',
      bio: 'Landscape photographer sharing daily adventures',
      followers: '12.5k',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
      isFollowing: false
    },
    {
      id: '2',
      username: 'sarah_foodie',
      bio: 'Food blogger & recipe creator',
      followers: '8.3k',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
      isFollowing: true
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Discover</h1>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : ''
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {activeCategory === 'trending' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Trending Content</h2>
          {trendingContent.map((content) => (
            <Card key={content.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video">
                <img 
                  src={content.image} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{content.category}</Badge>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{content.readTime}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
                <p className="text-gray-600 mb-3">{content.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{content.likes} likes</span>
                  <Button size="sm" variant="outline">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeCategory === 'people' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Suggested People</h2>
          {suggestedPeople.map((person) => (
            <Card key={person.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={person.avatar}
                    alt={person.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{person.username}</h3>
                    <p className="text-sm text-gray-600">{person.bio}</p>
                    <p className="text-sm text-gray-500">{person.followers} followers</p>
                  </div>
                  <Button
                    size="sm"
                    variant={person.isFollowing ? "outline" : "default"}
                    className={!person.isFollowing ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}
                  >
                    {person.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(activeCategory === 'articles' || activeCategory === 'videos') && (
        <div className="text-center py-8">
          <p className="text-gray-500">More {activeCategory} coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default DiscoverTab;
