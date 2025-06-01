
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Plus } from 'lucide-react';
import Header from './Header';
import { Address } from '../types';

interface DriverScreen2Props {
  onNext: (address: Address) => void;
  onPrevious: () => void;
}

const DriverScreen2 = ({ onNext, onPrevious }: DriverScreen2Props) => {
  const { t } = useLanguage();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  
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
  };

  const handleNext = () => {
    if (selectedAddress) {
      onNext(selectedAddress);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('screen2.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            {predefinedAddresses.map((address) => (
              <Card
                key={address.id}
                className={`card-selectable ${
                  selectedAddress?.id === address.id 
                    ? 'border-primary bg-primary/10' 
                    : ''
                }`}
                onClick={() => handleAddressSelect(address)}
              >
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-white">
                    {address.street}
                  </div>
                  <div className="text-industrial-300">
                    {address.postalCode} {address.city}
                  </div>
                  <div className="text-industrial-400">
                    {address.country}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Add New Address Button */}
          <Card className="card-selectable border-dashed border-industrial-500">
            <div className="flex items-center justify-center space-x-4 text-industrial-300">
              <Plus size={32} />
              <span className="text-xl">{t('screen2.add.new')}</span>
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <Button
              onClick={onPrevious}
              variant="outline"
              className="btn-large"
              size="lg"
            >
              {t('common.previous')}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedAddress}
              className="btn-large bg-primary hover:bg-blue-600 text-white"
              size="lg"
            >
              {t('common.next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen2;
