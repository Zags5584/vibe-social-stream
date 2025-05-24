
import { useState, useEffect } from 'react';
import { User, Post } from '../../types/User';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { Button } from '../ui/button';

interface HomeFeedProps {
  user: User | null;
}

const HomeFeed = ({ user }: HomeFeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulate loading posts with mix of user and curated content
    const mockPosts: Post[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'alex_photographer',
        userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
        content: 'Just captured this amazing sunset! 🌅 The colors were absolutely incredible today.',
        images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'],
        likes: ['user2', 'user3'],
        comments: [],
        shares: 2,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'user'
      },
      {
        id: '2',
        userId: 'curator',
        username: 'Tech News Today',
        userAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop&crop=face',
        content: 'Breaking: New AI breakthrough could revolutionize how we interact with technology. Researchers have developed a system that understands context better than ever before.',
        likes: ['user1', 'user4', 'user5'],
        comments: [],
        shares: 12,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        type: 'curated'
      },
      {
        id: '3',
        userId: 'user2',
        username: 'sarah_foodie',
        userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
        content: 'Tried making homemade pasta for the first time! Not perfect but so delicious 🍝',
        images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'],
        likes: ['user1'],
        comments: [],
        shares: 1,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        type: 'user'
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleNewPost = (newPost: Omit<Post, 'id' | 'createdAt'>) => {
    const post: Post = {
      ...newPost,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (postId: string) => {
    if (!user) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user.id);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id]
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Welcome to Kisan Network, {user?.username}! 👋
        </h1>
        <CreatePost user={user} onPost={handleNewPost} />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts yet. Start following people to see their content!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              currentUser={user}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
