
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
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('welcome.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Welcome Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t('welcome.greeting')}
            </h1>
            <p className="text-xl text-industrial-300">
              {t('welcome.choose.action')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-6">
            
            {/* Pickup/Load Button */}
            <Card className="p-8 bg-industrial-800 border-industrial-600">
              <Button
                onClick={() => onSelectAction('pickup')}
                className="w-full h-32 bg-primary hover:bg-blue-600 text-white text-3xl font-semibold flex items-center justify-center space-x-4"
                size="lg"
              >
                <ArrowUp size={48} />
                <span>{t('welcome.pickup.load')}</span>
              </Button>
            </Card>

            {/* Delivery/Unload Button */}
            <Card className="p-8 bg-industrial-800 border-industrial-600">
              <Button
                onClick={() => onSelectAction('delivery')}
                className="w-full h-32 bg-success hover:bg-green-600 text-white text-3xl font-semibold flex items-center justify-center space-x-4"
                size="lg"
              >
                <ArrowDown size={48} />
                <span>{t('welcome.delivery.unload')}</span>
              </Button>
            </Card>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverWelcomeScreen;
