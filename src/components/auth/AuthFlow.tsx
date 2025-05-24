
import { useState } from 'react';
import PhoneAuth from './PhoneAuth';
import ProfileSetup from './ProfileSetup';
import InterestSelection from './InterestSelection';
import { User } from '../../types/User';

interface AuthFlowProps {
  onAuthSuccess: (user: User) => void;
}

type AuthStep = 'phone' | 'profile' | 'interests';

const AuthFlow = ({ onAuthSuccess }: AuthFlowProps) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    profilePicture: ''
  });

  const handlePhoneVerified = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentStep('profile');
  };

  const handleProfileComplete = (profile: any) => {
    setProfileData(profile);
    setCurrentStep('interests');
  };

  const handleInterestsComplete = (interests: string[]) => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: profileData.username,
      phoneNumber,
      bio: profileData.bio,
      profilePicture: profileData.profilePicture,
      interests,
      followers: [],
      following: [],
      createdAt: new Date()
    };
    onAuthSuccess(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentStep === 'phone' && (
          <PhoneAuth onVerified={handlePhoneVerified} />
        )}
        {currentStep === 'profile' && (
          <ProfileSetup onComplete={handleProfileComplete} />
        )}
        {currentStep === 'interests' && (
          <InterestSelection onComplete={handleInterestsComplete} />
        )}
      </div>
    </div>
  );
};

export default AuthFlow;
