
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
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('screen4.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Selected Products */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="text-center mb-6">
              <div className="text-industrial-300 text-lg mb-2">
                {t('screen4.selected.product')}s
              </div>
              <div className="text-lg text-industrial-400">
                {products.length} product{products.length !== 1 ? 's' : ''} selected
              </div>
            </div>
          </Card>

          {/* Quantity Selection for Each Product */}
          <div className="space-y-6">
            {products.map((product) => (
              <Card key={product.id} className="p-6 bg-industrial-800 border-industrial-600">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-industrial-400">{product.description}</p>
                  <p className="text-industrial-300 text-sm mt-1">Location: {product.stockyardArea}</p>
                </div>

                {/* Preset Quantities */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {presetQuantities.map((preset) => (
                      <Button
                        key={preset}
                        onClick={() => handlePresetSelect(product.id, preset)}
                        variant={quantities[product.id] === preset ? 'default' : 'outline'}
                        className="text-sm"
                        size="sm"
                      >
                        {preset} {t('screen4.quantity.tons')}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Manual Quantity Input */}
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    onClick={() => handleDecrement(product.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Minus size={16} />
                  </Button>
                  
                  <Input
                    type="number"
                    value={quantities[product.id] || ''}
                    onChange={(e) => handleManualChange(product.id, e.target.value)}
                    className="w-24 text-center"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                  
                  <Button
                    onClick={() => handleIncrement(product.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus size={16} />
                  </Button>
                  
                  <span className="text-industrial-300 ml-2">
                    {t('screen4.quantity.tons')}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Total Summary */}
          {getTotalQuantity() > 0 && (
            <Card className="p-6 bg-success/10 border-success">
              <div className="text-center text-success text-lg">
                Total: {getTotalQuantity()} {t('screen4.quantity.tons')}
              </div>
            </Card>
          )}

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
              disabled={getTotalQuantity() <= 0}
              className="btn-large bg-primary hover:bg-blue-600 text-white"
              size="lg"
            >
              {t('screen4.add.to.load')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen4;
