
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface InterestSelectionProps {
  onComplete: (interests: string[]) => void;
}

const AVAILABLE_INTERESTS = [
  'Technology', 'Sports', 'Music', 'Travel', 'Food', 'Fashion',
  'Art', 'Gaming', 'Fitness', 'Photography', 'Movies', 'Books',
  'Business', 'Science', 'Politics', 'Comedy', 'Health', 'Education'
];

const InterestSelection = ({ onComplete }: InterestSelectionProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleComplete = () => {
    onComplete(selectedInterests);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">What interests you?</CardTitle>
        <p className="text-gray-600">Select topics you'd like to see content about</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {AVAILABLE_INTERESTS.map((interest) => (
            <Badge
              key={interest}
              variant={selectedInterests.includes(interest) ? "default" : "outline"}
              className={`cursor-pointer p-3 text-center justify-center transition-all duration-200 ${
                selectedInterests.includes(interest) 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </Badge>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500">
          {selectedInterests.length > 0 
            ? `${selectedInterests.length} interest${selectedInterests.length > 1 ? 's' : ''} selected`
            : 'Select at least one interest to continue'
          }
        </div>

        <Button 
          onClick={handleComplete}
          disabled={selectedInterests.length === 0}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Complete Setup
        </Button>
      </CardContent>
    </Card>
  );
};

export default InterestSelection;
