import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Printer } from 'lucide-react';
import Header from './Header';
import { Product } from '../types';

interface DeliveryNotePrintProps {
  product: Product;
  quantity: number;
  netWeight: number;
  tareWeight: number;
  customerName: string;
  numberPlate: string;
  onDone: () => void;
}

const DeliveryNotePrint = ({ 
  product, 
  quantity, 
  netWeight, 
  tareWeight, 
  customerName, 
  numberPlate, 
  onDone 
}: DeliveryNotePrintProps) => {
  const { t } = useLanguage();
  const deliveryNoteNumber = `DN-${Date.now()}`;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title="Delivery Note" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Print Actions */}
          <div className="flex justify-center space-x-4 no-print">
            <Button
              onClick={handlePrint}
              className="btn-large bg-primary hover:bg-blue-600 text-white"
              size="lg"
            >
              <Printer size={20} className="mr-2" />
              Print Delivery Note
            </Button>
          </div>

          {/* Delivery Note */}
          <Card className="p-8 bg-white text-black print:shadow-none">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b-2 border-gray-300 pb-4">
                <h1 className="text-3xl font-bold mb-2">DELIVERY NOTE</h1>
                <div className="text-lg">Stockyard Materials Co.</div>
                <div className="text-sm text-gray-600">Industrial District, Main Street 123</div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold">Delivery Note #:</div>
                  <div className="text-lg">{deliveryNoteNumber}</div>
                </div>
                <div>
                  <div className="font-semibold">Date & Time:</div>
                  <div>{currentDate} at {currentTime}</div>
                </div>
              </div>

              {/* Customer & Vehicle Info */}
              <div className="grid grid-cols-2 gap-8 border-t pt-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Company:</span> {customerName}</div>
                    <div><span className="font-medium">Vehicle:</span> {numberPlate}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Loading Location</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Area:</span> {product.stockyardArea}</div>
                    <div><span className="font-medium">Product:</span> {product.name}</div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Product</th>
                      <th className="border border-gray-300 p-3 text-left">Description</th>
                      <th className="border border-gray-300 p-3 text-right">Ordered</th>
                      <th className="border border-gray-300 p-3 text-right">Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">{product.name}</td>
                      <td className="border border-gray-300 p-3">{product.description}</td>
                      <td className="border border-gray-300 p-3 text-right">{quantity} tons</td>
                      <td className="border border-gray-300 p-3 text-right font-semibold">
                        {(netWeight / 1000).toFixed(1)} tons
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Weight Details */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-4">Weight Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="border border-gray-300 p-4">
                    <div className="font-medium">Tare Weight</div>
                    <div className="text-xl">{tareWeight} kg</div>
                  </div>
                  <div className="border border-gray-300 p-4">
                    <div className="font-medium">Gross Weight</div>
                    <div className="text-xl">{tareWeight + netWeight} kg</div>
                  </div>
                  <div className="border border-gray-300 p-4 bg-blue-50">
                    <div className="font-medium">Net Weight</div>
                    <div className="text-xl font-bold">{netWeight} kg</div>
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="border-t pt-6 mt-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="font-medium mb-4">Driver Signature:</div>
                    <div className="border-b border-gray-400 h-12"></div>
                    <div className="text-sm text-gray-600 mt-2">Date: {currentDate}</div>
                  </div>
                  <div>
                    <div className="font-medium mb-4">Operator Signature:</div>
                    <div className="border-b border-gray-400 h-12"></div>
                    <div className="text-sm text-gray-600 mt-2">Date: {currentDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Done Button */}
          <div className="flex justify-center pt-8 no-print">
            <Button
              onClick={onDone}
              className="btn-large bg-success hover:bg-success/90 text-white text-2xl px-16 py-8"
              size="lg"
            >
              Confirm & Print Delivery Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotePrint;
