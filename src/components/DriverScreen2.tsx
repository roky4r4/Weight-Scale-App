
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Plus, MapPin } from 'lucide-react';
import Header from './Header';
import { Address } from '../types';

interface DriverScreen2Props {
  onNext: (address: Address | null) => void;
  onPrevious: () => void;
}

const DriverScreen2 = ({ onNext, onPrevious }: DriverScreen2Props) => {
  const { t } = useLanguage();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [noAddressSelected, setNoAddressSelected] = useState(false);
  
  const predefinedAddresses: Address[] = [
    {
      id: '1',
      street: 'Hauptstraße 123',
      city: 'Berlin',
      postalCode: '10115',
      country: 'Deutschland'
    },
    {
      id: '2',
      street: 'Industrieweg 45',
      city: 'Hamburg',
      postalCode: '20095',
      country: 'Deutschland'
    },
    {
      id: '3',
      street: 'Bahnhofstraße 67',
      city: 'München',
      postalCode: '80331',
      country: 'Deutschland'
    }
  ];

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setNoAddressSelected(false);
  };

  const handleNoAddressSelect = () => {
    setSelectedAddress(null);
    setNoAddressSelected(true);
  };

  const handleNext = () => {
    if (selectedAddress || noAddressSelected) {
      onNext(selectedAddress);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title="Delivery Address" />
      
      <div className="driver-container">
        <div className="space-y-8">
          
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              SELECT DELIVERY ADDRESS
            </h2>
          </div>
          
          {/* Single Column Layout for Addresses */}
          <div className="space-y-6 max-w-3xl mx-auto">
            
            {/* No Delivery Address Option */}
            <div
              className={`card-driver ${
                noAddressSelected 
                  ? 'card-driver-selected' 
                  : ''
              }`}
              onClick={handleNoAddressSelect}
            >
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                    <MapPin size={32} className="text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-700">
                    NO DELIVERY ADDRESS NEEDED
                  </div>
                  <div className="text-xl text-gray-600">
                    Select this for direct pickup operations
                  </div>
                </div>
              </div>
            </div>

            {/* Predefined Addresses */}
            {predefinedAddresses.map((address) => (
              <div
                key={address.id}
                className={`card-driver ${
                  selectedAddress?.id === address.id 
                    ? 'card-driver-selected' 
                    : ''
                }`}
                onClick={() => handleAddressSelect(address)}
              >
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-gray-700">
                    {address.street}
                  </div>
                  <div className="text-xl text-gray-600">
                    {address.postalCode} {address.city}
                  </div>
                  <div className="text-lg text-gray-500">
                    {address.country}
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Address Button */}
            <div className="card-driver border-dashed border-gray-400">
              <div className="flex items-center justify-center space-x-6 text-gray-600">
                <Plus size={48} />
                <span className="text-2xl font-semibold">ADD NEW ADDRESS</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 max-w-3xl mx-auto">
            <Button
              onClick={onPrevious}
              className="h-20 px-8 text-xl font-semibold bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-lg"
            >
              ← GO BACK
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedAddress && !noAddressSelected}
              className="h-20 px-8 text-xl font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg disabled:bg-gray-300"
            >
              NEXT STEP →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen2;
