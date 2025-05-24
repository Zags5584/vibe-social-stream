
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PhoneAuthProps {
  onVerified: (phoneNumber: string) => void;
}

const PhoneAuth = ({ onVerified }: PhoneAuthProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'phone' | 'verify'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phoneNumber) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) return;
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onVerified(phoneNumber);
    }, 1000);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to SocialHub
        </CardTitle>
        <p className="text-gray-600 mt-2">
          {step === 'phone' ? 'Enter your phone number to get started' : 'Enter the verification code'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 'phone' ? (
          <>
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-lg"
              />
            </div>
            <Button 
              onClick={handleSendCode}
              disabled={!phoneNumber || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? 'Sending Code...' : 'Send Verification Code'}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-lg text-center"
                maxLength={6}
              />
            </div>
            <Button 
              onClick={handleVerifyCode}
              disabled={verificationCode.length !== 6 || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setStep('phone')}
              className="w-full"
            >
              Back to Phone Number
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneAuth;
