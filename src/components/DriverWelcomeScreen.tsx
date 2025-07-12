
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Header from './Header';

interface DriverWelcomeScreenProps {
  onSelectAction: (action: 'pickup' | 'delivery') => void;
}

const DriverWelcomeScreen = ({ onSelectAction }: DriverWelcomeScreenProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title="Driver Interface" />
      
      <div className="driver-container">
        <div className="space-y-12">
          
          {/* Welcome Message */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-700 mb-6">
              Welcome Driver
            </h1>
            <p className="text-3xl text-gray-600">
              Choose your action to begin
            </p>
          </div>

          {/* Action Buttons - Single Column */}
          <div className="space-y-8 max-w-2xl mx-auto">
            
            {/* Pickup/Load Button */}
            <div className="bg-white p-8 rounded-xl border-2 border-gray-300 shadow-lg">
              <Button
                onClick={() => onSelectAction('pickup')}
                className="w-full h-40 bg-green-500 hover:bg-green-600 text-white text-4xl font-bold flex items-center justify-center space-x-6 rounded-xl shadow-lg"
              >
                <ArrowUp size={64} />
                <span>LOAD TRUCK</span>
              </Button>
            </div>

            {/* Delivery/Unload Button */}
            <div className="bg-white p-8 rounded-xl border-2 border-gray-300 shadow-lg">
              <Button
                onClick={() => onSelectAction('delivery')}
                className="w-full h-40 bg-green-500 hover:bg-green-600 text-white text-4xl font-bold flex items-center justify-center space-x-6 rounded-xl shadow-lg"
              >
                <ArrowDown size={64} />
                <span>UNLOAD TRUCK</span>
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverWelcomeScreen;
