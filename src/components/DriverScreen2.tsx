
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Plus, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-custom-blue">
      <Header title="Delivery Address" />
      
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Instructions */}
          <Card className="p-8 text-center">
            <h2 className="heading-lg mb-4">Where are you delivering?</h2>
            <p className="text-driver-secondary">Select your delivery destination or skip if not applicable</p>
          </Card>
          
          {/* No Delivery Address Option */}
          <Card
            className={`card-selectable ${
              noAddressSelected 
                ? 'card-active' 
                : ''
            }`}
            onClick={handleNoAddressSelect}
          >
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-custom-gray rounded-full flex items-center justify-center">
                  <MapPin size={32} className="text-text-light" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-text-dark">
                  🏠 No Delivery Required
                </div>
                <div className="text-driver-secondary">
                  Materials will be used on-site or picked up by customer
                </div>
              </div>
              {noAddressSelected && (
                <div className="ml-auto">
                  <div className="w-8 h-8 bg-custom-green rounded-full flex items-center justify-center">
                    <span className="text-text-dark font-bold">✓</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            {predefinedAddresses.map((address) => (
              <Card
                key={address.id}
                className={`card-selectable ${
                  selectedAddress?.id === address.id 
                    ? 'card-active' 
                    : ''
                }`}
                onClick={() => handleAddressSelect(address)}
              >
                <div className="relative">
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-text-dark">
                      📍 {address.street}
                    </div>
                    <div className="text-driver">
                      {address.postalCode} {address.city}
                    </div>
                    <div className="text-driver-secondary">
                      {address.country}
                    </div>
                  </div>
                  {selectedAddress?.id === address.id && (
                    <div className="absolute top-0 right-0">
                      <div className="w-8 h-8 bg-custom-green rounded-full flex items-center justify-center">
                        <span className="text-text-dark font-bold">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Add New Address Button */}
          <Card className="card-selectable border-dashed border-custom-gray">
            <div className="flex items-center justify-center space-x-6 text-custom-gray py-8">
              <Plus size={48} />
              <span className="text-2xl font-semibold">➕ Add New Address</span>
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-12">
            <Button
              onClick={onPrevious}
              variant="outline"
              className="text-2xl px-12 py-6"
              size="lg"
            >
              <ArrowLeft size={32} />
              Go Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedAddress && !noAddressSelected}
              className="text-2xl px-12 py-6 bg-custom-green hover:bg-green-600"
              size="lg"
            >
              Next Step
              <ArrowRight size={32} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen2;
