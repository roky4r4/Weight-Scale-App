
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Plus, Minus } from 'lucide-react';
import Header from './Header';
import { Product } from '../types';

interface DriverScreen4Props {
  products: Product[];
  onNext: (quantities: Record<string, number>) => void;
  onPrevious: () => void;
}

const DriverScreen4 = ({ products, onNext, onPrevious }: DriverScreen4Props) => {
  const { t } = useLanguage();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  const presetQuantities = [10, 20, 30, 40];

  const handlePresetSelect = (productId: string, preset: number) => {
    setQuantities(prev => ({ ...prev, [productId]: preset }));
  };

  const handleManualChange = (productId: string, value: string) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0) {
      setQuantities(prev => ({ ...prev, [productId]: parsed }));
    } else if (value === '') {
      setQuantities(prev => ({ ...prev, [productId]: 0 }));
    }
  };

  const handleIncrement = (productId: string) => {
    setQuantities(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const handleDecrement = (productId: string) => {
    setQuantities(prev => ({ 
      ...prev, 
      [productId]: Math.max(0, (prev[productId] || 0) - 1) 
    }));
  };

  const handleNext = () => {
    const hasQuantities = Object.values(quantities).some(qty => qty > 0);
    if (hasQuantities) {
      onNext(quantities);
    }
  };

  const getTotalQuantity = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0);
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title="Quantity Selection" />
      
      <div className="driver-container">
        <div className="space-y-8">
          
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              ENTER QUANTITIES
            </h2>
            <div className="text-2xl text-gray-600">
              {products.length} PRODUCT{products.length !== 1 ? 'S' : ''} SELECTED
            </div>
          </div>

          {/* Single Column Quantity Selection */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-8 rounded-xl border-2 border-gray-300 shadow-lg">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-700 mb-4">{product.name}</h3>
                  <p className="text-xl text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <span className="font-bold">LOCATION:</span> {product.stockyardArea}
                  </p>
                </div>

                {/* Preset Quantities - Large Buttons */}
                <div className="mb-8">
                  <div className="text-xl font-bold text-gray-700 mb-4">QUICK SELECT:</div>
                  <div className="grid grid-cols-2 gap-4">
                    {presetQuantities.map((preset) => (
                      <Button
                        key={preset}
                        onClick={() => handlePresetSelect(product.id, preset)}
                        className={`h-16 text-xl font-bold rounded-lg ${
                          quantities[product.id] === preset 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border-2 border-gray-400'
                        }`}
                      >
                        {preset} TONS
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Manual Quantity Input - Large */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-xl font-bold text-gray-700 mb-4 text-center">CUSTOM AMOUNT:</div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={() => handleDecrement(product.id)}
                      className="w-16 h-16 text-2xl font-bold bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                    >
                      <Minus size={24} />
                    </Button>
                    
                    <Input
                      type="number"
                      value={quantities[product.id] || ''}
                      onChange={(e) => handleManualChange(product.id, e.target.value)}
                      className="w-32 h-16 text-3xl text-center font-bold border-4 border-gray-400 rounded-lg"
                      placeholder="0"
                      min="0"
                      step="0.1"
                    />
                    
                    <Button
                      onClick={() => handleIncrement(product.id)}
                      className="w-16 h-16 text-2xl font-bold bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                    >
                      <Plus size={24} />
                    </Button>
                    
                    <span className="text-2xl font-bold text-gray-700">
                      TONS
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          {getTotalQuantity() > 0 && (
            <div className="bg-green-50 p-8 rounded-xl border-4 border-green-400 max-w-4xl mx-auto">
              <div className="text-center text-green-600 text-3xl font-bold">
                TOTAL: {getTotalQuantity()} TONS
              </div>
            </div>
          )}

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
              disabled={getTotalQuantity() <= 0}
              className="h-20 px-8 text-xl font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg disabled:bg-gray-300"
            >
              ADD TO LOAD →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen4;
