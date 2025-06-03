
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Scale } from 'lucide-react';
import Header from './Header';
import { Product } from '../types';

interface DriverScreen6Props {
  product: Product;
  quantity: number;
  grossWeight: number;
  onNext: (netWeight: number, tareWeight: number) => void;
}

const DriverScreen6 = ({ product, quantity, grossWeight, onNext }: DriverScreen6Props) => {
  const { t } = useLanguage();
  const [loadedWeight] = useState(2850); // Simulated loaded weight
  const tareWeight = grossWeight;
  const netWeight = loadedWeight - tareWeight;

  const handleConfirm = () => {
    onNext(netWeight, tareWeight);
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title="Post-Loading Weight Check" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Weight Confirmation */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Scale size={32} className="text-primary" />
                </div>
              </div>
              <div className="text-industrial-300 text-xl mb-2">
                Loaded Weight Detected
              </div>
              <div className="text-6xl font-bold text-primary mb-4">
                {loadedWeight} kg
              </div>
            </div>
          </Card>

          {/* Weight Breakdown */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <h3 className="text-xl font-semibold text-white mb-6">Weight Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-industrial-600">
                <span className="text-industrial-300">Gross Weight (Empty Truck):</span>
                <span className="text-white font-medium">{grossWeight} kg</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-industrial-600">
                <span className="text-industrial-300">Loaded Weight:</span>
                <span className="text-white font-medium">{loadedWeight} kg</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t-2 border-primary">
                <span className="text-primary font-semibold">Net Load Weight:</span>
                <span className="text-primary font-bold text-xl">{netWeight} kg</span>
              </div>
            </div>
          </Card>

          {/* Product Confirmation */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <h3 className="text-xl font-semibold text-white mb-6">Load Confirmation</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-industrial-300">Product:</span>
                <span className="text-white font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-industrial-300">Ordered Quantity:</span>
                <span className="text-white font-medium">{quantity} tons</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-industrial-300">Actual Load:</span>
                <span className="text-white font-medium">{(netWeight / 1000).toFixed(1)} tons</span>
              </div>
            </div>
          </Card>

          {/* Status */}
          <Card className="p-6 bg-success/10 border-success">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                  <Check size={24} className="text-white" />
                </div>
              </div>
              <div className="text-success text-lg">
                Loading completed successfully. Ready for delivery.
              </div>
            </div>
          </Card>

          {/* Confirm Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleConfirm}
              className="btn-large bg-success hover:bg-success/90 text-white text-2xl px-16 py-8"
              size="lg"
            >
              Confirm Load & Generate Delivery Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen6;
