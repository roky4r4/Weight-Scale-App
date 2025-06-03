
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import Header from './Header';
import { Product } from '../types';

interface DriverScreen3Props {
  onNext: (product: Product) => void;
  onPrevious: () => void;
  isRegistered: boolean;
}

const DriverScreen3 = ({ onNext, onPrevious, isRegistered }: DriverScreen3Props) => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Gravel',
      description: 'High-quality construction gravel',
      stockyardArea: 'Stockyard Area A',
      availability: 'available',
      unit: 'tons',
      price: 45
    },
    {
      id: '2',
      name: 'Sand',
      description: 'Fine construction sand',
      stockyardArea: 'Stockyard Area B',
      availability: 'available',
      unit: 'tons',
      price: 35
    },
    {
      id: '3',
      name: 'Crushed Stone',
      description: 'Various sizes available',
      stockyardArea: 'Stockyard Area C',
      availability: 'low',
      unit: 'tons',
      price: 50
    },
    {
      id: '4',
      name: 'Concrete Mix',
      description: 'Ready-mix concrete',
      stockyardArea: 'Stockyard Area D',
      availability: 'unavailable',
      unit: 'tons',
      price: 55
    }
  ];

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="status-available">{t('screen3.available')}</Badge>;
      case 'low':
        return <Badge className="status-low">{t('screen3.low.stock')}</Badge>;
      case 'unavailable':
        return <Badge className="status-unavailable">{t('screen3.unavailable')}</Badge>;
      default:
        return null;
    }
  };

  const handleProductSelect = (product: Product) => {
    if (product.availability !== 'unavailable') {
      setSelectedProduct(product);
    }
  };

  const handleNext = () => {
    if (selectedProduct) {
      onNext(selectedProduct);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('screen3.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`card-selectable ${
                  selectedProduct?.id === product.id 
                    ? 'border-primary bg-primary/10' 
                    : ''
                } ${
                  product.availability === 'unavailable' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl font-semibold text-white mb-2">
                        {product.name}
                      </div>
                      <div className="text-industrial-300 mb-2">
                        {product.description}
                      </div>
                      {!isRegistered && product.price && (
                        <div className="text-primary font-bold text-lg">
                          €{product.price}/ton
                        </div>
                      )}
                    </div>
                    {getAvailabilityBadge(product.availability)}
                  </div>
                  
                  <div className="text-industrial-400">
                    <span className="font-medium">{t('screen3.stockyard')}:</span> {product.stockyardArea}
                  </div>
                  
                  {product.availability !== 'unavailable' && (
                    <Button
                      className="w-full btn-large bg-success hover:bg-success/90"
                      size="lg"
                      disabled={selectedProduct?.id !== product.id}
                    >
                      {t('screen3.select.product')}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

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
              disabled={!selectedProduct}
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

export default DriverScreen3;
