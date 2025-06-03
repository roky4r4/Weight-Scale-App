
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CreditCard, Printer, Receipt } from 'lucide-react';
import Header from './Header';
import { Product } from '../types';

interface NonRegDriverInvoiceProps {
  product: Product;
  quantity: number;
  netWeight: number;
  tareWeight: number;
  customerName: string;
  numberPlate: string;
  onPayment: () => void;
}

const NonRegDriverInvoice = ({ 
  product, 
  quantity, 
  netWeight, 
  tareWeight, 
  customerName, 
  numberPlate, 
  onPayment 
}: NonRegDriverInvoiceProps) => {
  const { t } = useLanguage();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  
  const invoiceNumber = `INV-${Date.now()}`;
  const currentDate = new Date().toLocaleDateString();
  const actualTons = netWeight / 1000;
  const pricePerTon = product.price || 45;
  const subtotal = actualTons * pricePerTon;
  const taxRate = 0.19; // 19% VAT
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handlePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('completed');
      onPayment();
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title="Invoice & Payment" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Payment Status */}
          {paymentStatus !== 'pending' && (
            <Card className={`p-6 ${paymentStatus === 'completed' ? 'bg-success/10 border-success' : 'bg-yellow-500/10 border-yellow-500'}`}>
              <div className="flex items-center justify-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentStatus === 'completed' ? 'bg-success' : 'bg-yellow-500'}`}>
                  {paymentStatus === 'completed' ? <Receipt size={24} className="text-white" /> : <CreditCard size={24} className="text-white" />}
                </div>
                <div className={`text-lg font-semibold ${paymentStatus === 'completed' ? 'text-success' : 'text-yellow-500'}`}>
                  {paymentStatus === 'completed' ? 'Payment Completed Successfully' : 'Processing Payment...'}
                </div>
              </div>
            </Card>
          )}

          {/* Invoice */}
          <Card className="p-8 bg-white text-black print:shadow-none">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b-2 border-gray-300 pb-4">
                <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
                <div className="text-lg">Stockyard Materials Co.</div>
                <div className="text-sm text-gray-600">Industrial District, Main Street 123</div>
              </div>

              {/* Invoice Info */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold">Invoice #:</div>
                  <div className="text-lg">{invoiceNumber}</div>
                </div>
                <div>
                  <div className="font-semibold">Date:</div>
                  <div>{currentDate}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3">Bill To:</h3>
                <div className="space-y-1">
                  <div className="text-lg">{customerName}</div>
                  <div>Vehicle: {numberPlate}</div>
                  <div className="text-gray-600">Non-Registered Customer</div>
                </div>
              </div>

              {/* Product & Pricing */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-4">Items</h3>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Product</th>
                      <th className="border border-gray-300 p-3 text-right">Quantity</th>
                      <th className="border border-gray-300 p-3 text-right">Price/Ton</th>
                      <th className="border border-gray-300 p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.description}</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-right">{actualTons.toFixed(1)} tons</td>
                      <td className="border border-gray-300 p-3 text-right">€{pricePerTon}</td>
                      <td className="border border-gray-300 p-3 text-right">€{subtotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (19%):</span>
                      <span>€{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-2 font-bold text-lg">
                      <span>Total:</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weight Summary */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-4">Weight Details</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="border border-gray-300 p-3">
                    <div className="font-medium">Tare Weight</div>
                    <div>{tareWeight} kg</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <div className="font-medium">Gross Weight</div>
                    <div>{tareWeight + netWeight} kg</div>
                  </div>
                  <div className="border border-gray-300 p-3 bg-blue-50">
                    <div className="font-medium">Net Weight</div>
                    <div className="font-bold">{netWeight} kg</div>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Payment Status:</span>
                  <Badge className={
                    paymentStatus === 'completed' ? 'bg-success' : 
                    paymentStatus === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                  }>
                    {paymentStatus === 'completed' ? 'PAID' : 
                     paymentStatus === 'processing' ? 'PROCESSING' : 'PENDING'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 no-print">
            {paymentStatus === 'pending' && (
              <Button
                onClick={handlePayment}
                className="btn-large bg-primary hover:bg-blue-600 text-white text-xl px-12 py-6"
                size="lg"
              >
                <CreditCard size={20} className="mr-2" />
                Pay €{total.toFixed(2)}
              </Button>
            )}
            
            {paymentStatus === 'completed' && (
              <Button
                onClick={handlePrint}
                className="btn-large bg-success hover:bg-success/90 text-white text-xl px-12 py-6"
                size="lg"
              >
                <Printer size={20} className="mr-2" />
                Print Invoice
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonRegDriverInvoice;
