
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
    <div className="min-h-screen bg-custom-blue">
      <Header title="Driver Station" />
      
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Welcome Message */}
          <div className="text-center mb-16">
            <h1 className="heading-xl mb-6">
              Welcome Driver
            </h1>
            <p className="text-2xl text-custom-gray font-medium">
              What would you like to do today?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Pickup/Load Button */}
            <Card className="p-12">
              <Button
                onClick={() => onSelectAction('pickup')}
                className="w-full h-40 bg-custom-green hover:bg-green-600 text-text-dark text-3xl font-bold flex items-center justify-center space-x-6 shadow-xl hover:shadow-2xl"
                size="lg"
              >
                <ArrowUp size={64} />
                <span>📦 Load Materials</span>
              </Button>
              <p className="text-center text-driver-secondary mt-4">
                Pick up materials from the stockyard
              </p>
            </Card>

            {/* Delivery/Unload Button */}
            <Card className="p-12">
              <Button
                onClick={() => onSelectAction('delivery')}
                className="w-full h-40 bg-custom-yellow hover:bg-yellow-500 text-text-dark text-3xl font-bold flex items-center justify-center space-x-6 shadow-xl hover:shadow-2xl"
                size="lg"
                variant="warning"
              >
                <ArrowDown size={64} />
                <span>🚛 Deliver Load</span>
              </Button>
              <p className="text-center text-driver-secondary mt-4">
                Deliver materials to destination
              </p>
            </Card>
            
          </div>
          
          {/* Help text */}
          <div className="text-center mt-12">
            <p className="text-driver-secondary">
              Need help? Contact the office at extension 100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverWelcomeScreen;
