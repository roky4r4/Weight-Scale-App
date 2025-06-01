
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Plus, Minus } from 'lucide-react';
import Header from './Header';
import { Product } from '../types';

interface DriverScreen4Props {
  product: Product;
  onNext: (quantity: number) => void;
  onPrevious: () => void;
}

const DriverScreen4 = ({ product, onNext, onPrevious }: DriverScreen4Props) => {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState<number>(0);
  const [manualQuantity, setManualQuantity] = useState<string>('');
  
  const presetQuantities = [10, 20, 30, 40];

  const handlePresetSelect = (preset: number) => {
    setQuantity(preset);
    setManualQuantity('');
  };

  const handleManualChange = (value: string) => {
    setManualQuantity(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setQuantity(parsed);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setManualQuantity(newQuantity.toString());
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setManualQuantity(newQuantity.toString());
    }
  };

  const handleNext = () => {
    if (quantity > 0) {
      onNext(quantity);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('screen4.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Selected Product */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="text-center">
              <div className="text-industrial-300 text-lg mb-2">
                {t('screen4.selected.product')}
              </div>
              <div className="text-2xl font-bold text-white mb-4">
                {product.name}
              </div>
              <div className="text-industrial-400">
                {product.description}
              </div>
            </div>
          </Card>

          {/* Preset Quantities */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Select ({t('screen4.quantity.tons')})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {presetQuantities.map((preset) => (
                <Button
                  key={preset}
                  onClick={() => handlePresetSelect(preset)}
                  variant={quantity === preset ? 'default' : 'outline'}
                  className="btn-large text-xl"
                  size="lg"
                >
                  {preset} {t('screen4.quantity.tons')}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={() => handlePresetSelect(50)}
              variant={quantity === 50 ? 'default' : 'outline'}
              className="btn-large text-xl mt-4 w-full"
              size="lg"
            >
              {t('screen4.full.load')}
            </Button>
          </div>

          {/* Manual Quantity Input */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-6">
                {t('screen4.manual.quantity')}
              </h3>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  onClick={handleDecrement}
                  variant="outline"
                  size="lg"
                  className="btn-large"
                >
                  <Minus size={24} />
                </Button>
                
                <Input
                  type="number"
                  value={manualQuantity}
                  onChange={(e) => handleManualChange(e.target.value)}
                  className="input-large text-center text-3xl font-bold w-32"
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
                
                <Button
                  onClick={handleIncrement}
                  variant="outline"
                  size="lg"
                  className="btn-large"
                >
                  <Plus size={24} />
                </Button>
              </div>
              
              <div className="text-industrial-300 text-lg">
                {t('screen4.quantity.tons')}
              </div>
            </div>
          </Card>

          {/* Location Info */}
          {quantity > 0 && (
            <Card className="p-6 bg-success/10 border-success">
              <div className="text-center text-success text-lg">
                {t('screen4.location.info')} <strong>{product.stockyardArea}</strong>
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
              disabled={quantity <= 0}
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
