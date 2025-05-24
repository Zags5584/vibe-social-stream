
import { useState } from 'react';
import AuthFlow from '../components/auth/AuthFlow';
import MainApp from '../components/MainApp';
import { User } from '../types/User';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthFlow onAuthSuccess={handleAuthSuccess} />;
  }

  return <MainApp user={user} />;
};

export default Index;
