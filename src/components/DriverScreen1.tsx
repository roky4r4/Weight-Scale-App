
import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import Header from './Header';

interface DriverScreen1Props {
  onNext: (data: { weight: number; numberPlate: string; customerName: string }) => void;
}

const DriverScreen1 = ({ onNext }: DriverScreen1Props) => {
  const { t } = useLanguage();
  const [detectedWeight] = useState(1650);
  const [detectedPlate, setDetectedPlate] = useState('AB-123-CD');
  const [customerName, setCustomerName] = useState('');
  const [detectedCustomerName, setDetectedCustomerName] = useState('');

  // Mock function to get customer name by number plate
  const getCustomerByPlate = (plate: string) => {
    const registeredPlates = {
      'AB-123-CD': 'Acme Corp',
      'DE-456-FG': 'BuildCo Ltd', 
      'HI-789-JK': 'Construction Plus'
    };
    return registeredPlates[plate] || '';
  };

  useEffect(() => {
    const detected = getCustomerByPlate(detectedPlate);
    setDetectedCustomerName(detected);
    if (detected) {
      setCustomerName(detected);
    }
  }, [detectedPlate]);

  const handleConfirm = () => {
    if (customerName.trim()) {
      onNext({
        weight: detectedWeight,
        numberPlate: detectedPlate,
        customerName: customerName.trim()
      });
    }
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('screen1.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Weight Display */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="text-center">
              <div className="text-industrial-300 text-xl mb-2">
                {t('screen1.detected.weight')}
              </div>
              <div className="text-6xl font-bold text-primary mb-4">
                {detectedWeight} kg
              </div>
            </div>
          </Card>

          {/* Number Plate */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="text-center">
              <div className="text-industrial-300 text-xl mb-4">
                {t('screen1.number.plate')}
              </div>
              <div className="text-4xl font-bold text-white mb-6 p-4 bg-yellow-500 text-black rounded-lg inline-block font-mono">
                {detectedPlate}
              </div>
              
              {detectedCustomerName && (
                <div className="mb-6">
                  <div className="text-2xl text-success font-semibold">
                    Registered: {detectedCustomerName}
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <label className="block text-industrial-300 text-lg mb-4">
                  {t('screen1.not.you')}
                </label>
                <Input
                  value={detectedPlate}
                  onChange={(e) => {
                    setDetectedPlate(e.target.value);
                  }}
                  className="input-large text-center text-2xl font-mono bg-industrial-700 border-industrial-500"
                  placeholder="XX-123-XX"
                />
              </div>
            </div>
          </Card>

          {/* Customer Name Input */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="text-center">
              <div className="text-industrial-300 text-xl mb-4">
                Customer/Company Name
              </div>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="input-large text-center text-2xl bg-industrial-700 border-industrial-500"
                placeholder="Enter customer name"
              />
              <div className="text-sm text-industrial-400 mt-2">
                Enter your company name or customer name
              </div>
            </div>
          </Card>

          {/* Confirm Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleConfirm}
              disabled={!customerName.trim()}
              className="btn-large bg-primary hover:bg-blue-600 text-white text-2xl px-16 py-8"
              size="lg"
            >
              {t('screen1.confirm.info')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen1;
