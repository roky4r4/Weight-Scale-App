
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Scale, FileText } from 'lucide-react';
import Header from './Header';
import { Product } from '../types';

interface DriverScreen6Props {
  products: Product[];
  quantities: Record<string, number>;
  grossWeight: number;
  onNext: (netWeight: number, tareWeight: number) => void;
}

const DriverScreen6 = ({ products, quantities, grossWeight, onNext }: DriverScreen6Props) => {
  const { t } = useLanguage();
  const [loadedWeight] = useState(2850); // Simulated loaded weight
  const [isProcessing, setIsProcessing] = useState(false);
  const tareWeight = grossWeight;
  const netWeight = loadedWeight - tareWeight;

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      onNext(netWeight, tareWeight);
    }, 2000);
  };

  const getTotalOrderedQuantity = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <div className="min-h-screen bg-custom-blue">
      <Header title="Final Weight Check" />
      
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Success Message */}
          <Card className="p-8 bg-green-100 border-2 border-custom-green text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-custom-green rounded-full flex items-center justify-center">
                <Check size={48} className="text-text-dark" />
              </div>
            </div>
            <h2 className="heading-lg text-custom-green mb-2">
              ✅ Loading Complete!
            </h2>
            <p className="text-driver text-text-dark">
              Your truck has been successfully loaded with materials
            </p>
          </Card>
          
          {/* Weight Confirmation */}
          <Card className="p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-custom-yellow/20 rounded-full flex items-center justify-center">
                  <Scale size={48} className="text-custom-yellow" />
                </div>
              </div>
              <div className="weight-label mb-4">
                Final Loaded Weight
              </div>
              <div className="weight-display mb-8">
                {loadedWeight} kg
              </div>
            </div>
          </Card>

          {/* Weight Breakdown */}
          <Card className="p-12">
            <h3 className="heading-md mb-8">📊 Weight Summary</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b-2 border-gray-200">
                <span className="text-driver-secondary">Empty Truck Weight:</span>
                <span className="text-driver font-bold">{grossWeight} kg</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b-2 border-gray-200">
                <span className="text-driver-secondary">Loaded Truck Weight:</span>
                <span className="text-driver font-bold">{loadedWeight} kg</span>
              </div>
              <div className="flex justify-between items-center py-6 border-t-4 border-custom-green bg-green-50 px-6 rounded-lg">
                <span className="text-2xl font-bold text-custom-green">Net Material Weight:</span>
                <span className="text-3xl font-black text-custom-green">{netWeight} kg</span>
              </div>
            </div>
          </Card>

          {/* Products Summary */}
          <Card className="p-12">
            <h3 className="heading-md mb-8">📦 Materials Loaded</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-custom-blue/30 rounded-lg">
                  <div className="text-3xl font-bold text-text-dark">{products.length}</div>
                  <div className="text-driver-secondary">Product Types</div>
                </div>
                <div className="text-center p-4 bg-custom-blue/30 rounded-lg">
                  <div className="text-3xl font-bold text-text-dark">{getTotalOrderedQuantity()}</div>
                  <div className="text-driver-secondary">Tons Ordered</div>
                </div>
                <div className="text-center p-4 bg-custom-green/20 rounded-lg">
                  <div className="text-3xl font-bold text-custom-green">{(netWeight / 1000).toFixed(1)}</div>
                  <div className="text-driver-secondary">Tons Loaded</div>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow border border-gray-200">
                    <div>
                      <span className="text-driver font-bold">{product.name}</span>
                      <span className="text-driver-secondary text-base ml-4">({product.stockyardArea})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-driver font-bold">{quantities[product.id]} tons</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Confirm Button */}
          <div className="flex justify-center pt-12">
            <Button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="text-3xl px-20 py-12 bg-custom-green hover:bg-green-600 text-text-dark font-bold shadow-2xl"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="loading-spinner"></div>
                  Generating Delivery Note...
                </>
              ) : (
                <>
                  <FileText size={40} />
                  ✔ Confirm Load & Generate Delivery Note
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen6;
