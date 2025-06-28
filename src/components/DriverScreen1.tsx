
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
  const [isWeighing, setIsWeighing] = useState(false);

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
      setIsWeighing(true);
      // Simulate weighing process
      setTimeout(() => {
        onNext({
          weight: detectedWeight,
          numberPlate: detectedPlate,
          customerName: customerName.trim()
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-custom-blue">
      <Header title="Vehicle Registration" />
      
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Weight Display */}
          <Card className="p-12 text-center">
            <div className="weight-label mb-4">
              Vehicle Weight Detected
            </div>
            <div className="weight-display mb-6">
              {detectedWeight} kg
            </div>
            {isWeighing && (
              <div className="status-weighing mx-auto w-fit">
                ⚖️ Weighing in Progress...
              </div>
            )}
          </Card>

          {/* Number Plate */}
          <Card className="p-12">
            <div className="text-center">
              <div className="heading-md mb-6 text-custom-gray">
                License Plate Number
              </div>
              <div className="text-5xl font-bold text-text-dark mb-8 p-6 bg-custom-yellow rounded-lg inline-block font-mono shadow-lg">
                {detectedPlate}
              </div>
              
              {detectedCustomerName && (
                <div className="mb-8">
                  <div class="text-3xl text-custom-green font-bold">
                    ✓ Registered Customer: {detectedCustomerName}
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <label className="block text-driver mb-6">
                  Not your vehicle? Enter correct plate number:
                </label>
                <Input
                  value={detectedPlate}
                  onChange={(e) => {
                    setDetectedPlate(e.target.value.toUpperCase());
                  }}
                  className="input-large text-center text-3xl font-mono mx-auto max-w-md"
                  placeholder="XX-123-XX"
                />
              </div>
            </div>
          </Card>

          {/* Customer Name Input */}
          <Card className="p-12">
            <div className="text-center">
              <div className="heading-md mb-6 text-custom-gray">
                Customer/Company Name
              </div>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="input-large text-center text-2xl mx-auto max-w-2xl"
                placeholder="Enter your company name"
              />
              <div className="text-driver-secondary mt-4">
                Enter the name of your company or organization
              </div>
            </div>
          </Card>

          {/* Confirm Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleConfirm}
              disabled={!customerName.trim() || isWeighing}
              className="text-3xl px-20 py-12 bg-custom-green hover:bg-green-600 text-text-dark font-bold shadow-2xl"
              size="lg"
            >
              {isWeighing ? (
                <>
                  <div className="loading-spinner"></div>
                  Processing...
                </>
              ) : (
                <>✔ Confirm Weight</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen1;
