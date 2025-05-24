
import { useState } from 'react';
import { User } from '../types/User';
import BottomNavigation from './navigation/BottomNavigation';
import HomeFeed from './feed/HomeFeed';
import MessagesTab from './messages/MessagesTab';
import ProfileTab from './profile/ProfileTab';
import DiscoverTab from './discover/DiscoverTab';

interface MainAppProps {
  user: User | null;
}

type TabType = 'home' | 'discover' | 'messages' | 'profile';

const MainApp = ({ user }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeFeed user={user} />;
      case 'discover':
        return <DiscoverTab user={user} />;
      case 'messages':
        return <MessagesTab user={user} />;
      case 'profile':
        return <ProfileTab user={user} />;
      default:
        return <HomeFeed user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MainApp;
