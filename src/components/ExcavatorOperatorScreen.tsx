
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import Header from './Header';
import { Order } from '../types';

const ExcavatorOperatorScreen = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      truckId: 'AB-123-CD',
      products: [{ productId: '1', quantity: 20 }],
      status: 'pending',
      type: 'loading'
    },
    {
      id: '2',
      truckId: 'DE-456-FG',
      products: [{ productId: '2', quantity: 15 }],
      status: 'in-progress',
      type: 'unloading'
    },
    {
      id: '3',
      truckId: 'HI-789-JK',
      products: [{ productId: '3', quantity: 25 }],
      status: 'pending',
      type: 'loading'
    }
  ]);

  const products = {
    '1': { name: 'Premium Gravel', stockyardArea: 'Area A' },
    '2': { name: 'Sand', stockyardArea: 'Area B' },
    '3': { name: 'Crushed Stone', stockyardArea: 'Area C' }
  };

  const customers = {
    'AB-123-CD': 'Acme Corp',
    'DE-456-FG': 'BuildCo Ltd',
    'HI-789-JK': 'Construction Inc'
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-warning text-white">{t('operator.awaiting')}</Badge>;
      case 'in-progress':
        return <Badge className="bg-primary text-white">{t('operator.in.progress')}</Badge>;
      case 'completed':
        return <Badge className="bg-success text-white">{t('operator.completed')}</Badge>;
      default:
        return null;
    }
  };

  const handleStartTask = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'in-progress' as const }
        : order
    ));
  };

  const handleCompleteTask = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed' as const }
        : order
    ));
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('operator.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {orders.map((order) => {
            const product = products[order.products[0].productId];
            const customer = customers[order.truckId];
            
            return (
              <Card key={order.id} className="p-8 bg-industrial-800 border-industrial-600">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  
                  {/* Truck & Customer Info */}
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-white font-mono">
                      {order.truckId}
                    </div>
                    <div className="text-industrial-300">
                      {customer}
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Product & Quantity */}
                  <div className="space-y-2">
                    <div className="text-xl font-semibold text-white">
                      {product?.name}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {order.products[0].quantity} tons
                    </div>
                    <div className="text-sm text-industrial-400 uppercase">
                      {order.type}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="text-center">
                    <div className="text-industrial-300 mb-2">Location</div>
                    <div className="text-3xl font-bold text-warning">
                      {product?.stockyardArea}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    {order.status === 'pending' && (
                      <Button
                        onClick={() => handleStartTask(order.id)}
                        className="w-full btn-large bg-primary hover:bg-blue-600"
                        size="lg"
                      >
                        {order.type === 'loading' 
                          ? t('operator.start.loading')
                          : t('operator.start.unloading')
                        }
                      </Button>
                    )}
                    
                    {order.status === 'in-progress' && (
                      <Button
                        onClick={() => handleCompleteTask(order.id)}
                        className="w-full btn-large bg-success hover:bg-success/90"
                        size="lg"
                      >
                        {t('operator.mark.completed')}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className="w-full btn-large"
                      size="lg"
                    >
                      {t('operator.add.note')}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExcavatorOperatorScreen;
