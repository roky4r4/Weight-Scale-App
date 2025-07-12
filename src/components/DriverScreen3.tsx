
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
    <div className="min-h-screen bg-blue-100">
      <Header title="Product Selection" />
      
      <div className="driver-container">
        <div className="space-y-8">
          
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              SELECT PRODUCTS TO LOAD
            </h2>
          </div>
          
          {/* Selection Summary */}
          {selectedProducts.length > 0 && (
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-300">
              <div className="text-gray-700">
                <div className="text-2xl font-bold mb-3">
                  SELECTED: {selectedProducts.length} PRODUCT{selectedProducts.length > 1 ? 'S' : ''}
                </div>
                <div className="text-xl text-gray-600 mb-3">
                  {selectedProducts.map(p => p.name).join(', ')}
                </div>
                {!isRegistered && getTotalPrice() && (
                  <div className="text-green-600 font-bold text-2xl">
                    TOTAL: €{getTotalPrice()}/TON
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Single Column Products List */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className={`card-driver ${
                  isProductSelected(product.id)
                    ? 'card-driver-selected' 
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
                    <div className="flex items-start space-x-6 flex-1">
                      <Checkbox
                        checked={isProductSelected(product.id)}
                        disabled={product.availability === 'unavailable'}
                        className="mt-2 w-6 h-6"
                      />
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-gray-700 mb-3">
                          {product.name}
                        </div>
                        <div className="text-xl text-gray-600 mb-3">
                          {product.description}
                        </div>
                        {!isRegistered && product.price && (
                          <div className="text-green-600 font-bold text-2xl">
                            €{product.price}/TON
                          </div>
                        )}
                      </div>
                    </div>
                    {getAvailabilityBadge(product.availability)}
                  </div>
                  
                  <div className="text-gray-600 text-xl bg-gray-50 p-4 rounded-lg">
                    <span className="font-bold">LOCATION:</span> {product.stockyardArea}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 max-w-4xl mx-auto">
            <Button
              onClick={onPrevious}
              className="h-20 px-8 text-xl font-semibold bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-lg"
            >
              ← GO BACK
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={selectedProducts.length === 0}
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

export default DriverScreen3;
