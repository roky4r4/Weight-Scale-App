
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
    <div className="min-h-screen bg-blue-100">
      <Header title="Weight & Information" />
      
      <div className="driver-container">
        <div className="space-y-12">
          
          {/* Weight Display - Prominent */}
          <div className="bg-white p-12 rounded-xl border-4 border-yellow-400 shadow-xl">
            <div className="text-center">
              <div className="text-gray-600 text-3xl mb-6 font-semibold">
                TRUCK WEIGHT DETECTED
              </div>
              <div className="text-9xl font-black text-gray-800 mb-6">
                {detectedWeight}
              </div>
              <div className="text-gray-600 text-4xl font-bold">
                KG
              </div>
            </div>
          </div>

          {/* Number Plate - Single Column */}
          <div className="bg-white p-8 rounded-xl border-2 border-gray-300 shadow-lg">
            <div className="text-center space-y-6">
              <div className="text-gray-700 text-2xl font-bold">
                LICENSE PLATE NUMBER
              </div>
              <div className="text-6xl font-bold text-black mb-8 p-6 bg-yellow-400 text-black rounded-lg inline-block font-mono border-4 border-black">
                {detectedPlate}
              </div>
              
              {detectedCustomerName && (
                <div className="mb-8 bg-green-50 p-6 rounded-lg border-2 border-green-300">
                  <div className="text-3xl text-green-600 font-bold">
                    ✓ REGISTERED: {detectedCustomerName}
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <label className="block text-gray-700 text-xl mb-4 font-semibold">
                  DIFFERENT PLATE? ENTER YOURS:
                </label>
                <Input
                  value={detectedPlate}
                  onChange={(e) => {
                    setDetectedPlate(e.target.value);
                  }}
                  className="h-20 px-6 text-4xl font-mono text-center bg-yellow-50 border-4 border-yellow-400 text-gray-800 rounded-lg max-w-md mx-auto"
                  placeholder="AB-123-CD"
                />
              </div>
            </div>
          </div>

          {/* Customer Name - Single Column */}
          <div className="bg-white p-8 rounded-xl border-2 border-gray-300 shadow-lg">
            <div className="text-center space-y-6">
              <div className="text-gray-700 text-2xl font-bold">
                CUSTOMER/COMPANY NAME
              </div>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-20 px-6 text-2xl text-center bg-white border-4 border-gray-400 text-gray-800 rounded-lg max-w-lg mx-auto"
                placeholder="Enter customer name"
              />
              <div className="text-lg text-gray-600">
                Enter your company name or customer name
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleConfirm}
              disabled={!customerName.trim()}
              className="h-24 px-16 bg-green-500 hover:bg-green-600 text-white text-3xl font-bold rounded-xl shadow-lg disabled:bg-gray-300"
            >
              CONFIRM WEIGHT & INFO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen1;
