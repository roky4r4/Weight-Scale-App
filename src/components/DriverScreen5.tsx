
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check } from 'lucide-react';
import Header from './Header';
import { Product } from '../types';

interface DriverScreen5Props {
  products: Product[];
  quantities: Record<string, number>;
  onDone: () => void;
}

const DriverScreen5 = ({ products, quantities, onDone }: DriverScreen5Props) => {
  const { t } = useLanguage();

  // Get unique stockyard areas from selected products
  const stockyardAreas = [...new Set(products.map(p => p.stockyardArea))];

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('screen5.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Location Instructions */}
          <Card className="p-12 bg-primary/10 border-primary border-2">
            <div className="text-center">
              <div className="text-2xl text-primary mb-4">
                {t('screen5.proceed.to')}
              </div>
              {stockyardAreas.map((area, index) => (
                <div key={area} className="mb-4">
                  <div className="text-4xl font-bold text-white mb-2">
                    {area}
                  </div>
                  {index < stockyardAreas.length - 1 && (
                    <div className="text-industrial-300 text-lg">and</div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Order Summary */}
          <Card className="p-8 bg-industrial-800 border-industrial-600">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                Order Summary
              </h3>
              {products.map((product) => (
                <div key={product.id} className="space-y-2 pb-4 border-b border-industrial-600 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <span className="text-industrial-300">Product:</span>
                    <span className="text-white font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-industrial-300">Quantity:</span>
                    <span className="text-white font-medium">{quantities[product.id]} {t('screen4.quantity.tons')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-industrial-300">Location:</span>
                    <span className="text-white font-medium">{product.stockyardArea}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Sync Confirmation */}
          <Card className="p-8 bg-success/10 border-success">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                  <Check size={24} className="text-white" />
                </div>
              </div>
              <div className="text-success text-lg">
                {t('screen5.sync.message')}
              </div>
            </div>
          </Card>

          {/* Proceed Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={onDone}
              className="btn-large bg-success hover:bg-success/90 text-white text-2xl px-16 py-8"
              size="lg"
            >
              {t('screen5.proceed.load')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen5;
