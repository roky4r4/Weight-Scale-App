
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import Header from './Header';
import { Product } from '../types';

interface DriverScreen3Props {
  onNext: (products: Product[]) => void;
  onPrevious: () => void;
  isRegistered: boolean;
}

const DriverScreen3 = ({ onNext, onPrevious, isRegistered }: DriverScreen3Props) => {
  const { t } = useLanguage();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  
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

  const handleProductToggle = (product: Product) => {
    if (product.availability === 'unavailable') return;
    
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isProductSelected = (productId: string) => {
    return selectedProducts.some(p => p.id === productId);
  };

  const handleNext = () => {
    if (selectedProducts.length > 0) {
      onNext(selectedProducts);
    }
  };

  const getTotalPrice = () => {
    if (isRegistered) return null;
    return selectedProducts.reduce((total, product) => total + (product.price || 0), 0);
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('screen3.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Selection Summary */}
          {selectedProducts.length > 0 && (
            <Card className="p-4 bg-primary/10 border-primary">
              <div className="text-white">
                <div className="font-semibold mb-2">
                  Selected: {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''}
                </div>
                <div className="text-sm text-industrial-300">
                  {selectedProducts.map(p => p.name).join(', ')}
                </div>
                {!isRegistered && getTotalPrice() && (
                  <div className="text-primary font-bold text-lg mt-2">
                    Total: €{getTotalPrice()}/ton
                  </div>
                )}
              </div>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`card-selectable ${
                  isProductSelected(product.id)
                    ? 'border-primary bg-primary/10' 
                    : ''
                } ${
                  product.availability === 'unavailable' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={() => handleProductToggle(product)}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3 flex-1">
                      <Checkbox
                        checked={isProductSelected(product.id)}
                        disabled={product.availability === 'unavailable'}
                        className="mt-1"
                      />
                      <div className="flex-1">
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
                    </div>
                    {getAvailabilityBadge(product.availability)}
                  </div>
                  
                  <div className="text-industrial-400">
                    <span className="font-medium">{t('screen3.stockyard')}:</span> {product.stockyardArea}
                  </div>
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
              disabled={selectedProducts.length === 0}
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
