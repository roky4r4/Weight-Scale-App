
import { useLanguage } from '../hooks/useLanguage';
import { useOrders, mockProducts } from '../contexts/OrderContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import Header from './Header';
import NoteDialog from './NoteDialog';

const ExcavatorOperatorScreen = () => {
  const { t } = useLanguage();
  const { orders, updateOrderStatus, addNoteToOrder } = useOrders();

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
    updateOrderStatus(orderId, 'in-progress');
  };

  const handleCompleteTask = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
  };

  const handleAddNote = (orderId: string, note: string) => {
    addNoteToOrder(orderId, note);
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title={t('operator.title')} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {orders.map((order) => {
            const product = mockProducts[order.products[0].productId];
            const customer = order.customerName || customers[order.truckId];
            
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
                    {order.notes && order.notes.length > 0 && (
                      <div className="text-sm text-industrial-400">
                        {order.notes.length} note(s)
                      </div>
                    )}
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
                    
                    <NoteDialog onAddNote={(note) => handleAddNote(order.id, note)}>
                      <Button
                        variant="outline"
                        className="w-full btn-large"
                        size="lg"
                      >
                        {t('operator.add.note')}
                      </Button>
                    </NoteDialog>
                  </div>
                </div>
                
                {/* Notes Display */}
                {order.notes && order.notes.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-industrial-600">
                    <div className="text-sm text-industrial-300 mb-2">Notes:</div>
                    <div className="space-y-2">
                      {order.notes.map((note, index) => (
                        <div key={index} className="text-sm bg-industrial-700 p-2 rounded">
                          <div className="text-white">{note.text}</div>
                          <div className="text-industrial-400 text-xs mt-1">
                            {new Date(note.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExcavatorOperatorScreen;
