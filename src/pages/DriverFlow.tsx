
import { useState } from 'react';
import DriverWelcomeScreen from '../components/DriverWelcomeScreen';
import DriverScreen1 from '../components/DriverScreen1';
import DriverScreen2 from '../components/DriverScreen2';
import DriverScreen3 from '../components/DriverScreen3';
import DriverScreen4 from '../components/DriverScreen4';
import DriverScreen5 from '../components/DriverScreen5';
import DriverScreen6 from '../components/DriverScreen6';
import DeliveryNotePrint from '../components/DeliveryNotePrint';
import NonRegDriverInvoice from '../components/NonRegDriverInvoice';
import { useOrders } from '../contexts/OrderContext';
import { Address, Product } from '../types';

type DriverStep = 'welcome' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface DriverData {
  action?: 'pickup' | 'delivery';
  weight?: number;
  numberPlate?: string;
  customerName?: string;
  address?: Address;
  products?: Product[];
  quantities?: Record<string, number>;
  netWeight?: number;
  tareWeight?: number;
  isRegistered?: boolean;
}

const DriverFlow = () => {
  const [currentStep, setCurrentStep] = useState<DriverStep>('welcome');
  const [driverData, setDriverData] = useState<DriverData>({});
  const { addOrder } = useOrders();

  // Mock function to check if customer is registered
  const isRegisteredCustomer = (customerName: string) => {
    const registeredCustomers = ['Acme Corp', 'BuildCo Ltd', 'Construction Plus'];
    return registeredCustomers.includes(customerName);
  };

  const handleWelcomeNext = (action: 'pickup' | 'delivery') => {
    setDriverData(prev => ({ ...prev, action }));
    setCurrentStep(1);
  };

  const handleStep1Next = (data: { weight: number; numberPlate: string; customerName: string }) => {
    const isRegistered = isRegisteredCustomer(data.customerName);
    setDriverData(prev => ({ ...prev, ...data, isRegistered }));
    setCurrentStep(2);
  };

  const handleStep2Next = (address: Address | null) => {
    setDriverData(prev => ({ ...prev, address }));
    setCurrentStep(3);
  };

  const handleStep3Next = (products: Product[]) => {
    setDriverData(prev => ({ ...prev, products }));
    setCurrentStep(4);
  };

  const handleStep4Next = (quantities: Record<string, number>) => {
    setDriverData(prev => ({ ...prev, quantities }));
    setCurrentStep(5);
  };

  const handleStep5Done = () => {
    // Create the order when the driver completes the flow
    if (driverData.numberPlate && driverData.products && driverData.quantities && driverData.customerName) {
      const orderProducts = driverData.products.map(product => ({
        productId: product.id,
        quantity: driverData.quantities![product.id] || 0
      }));

      addOrder({
        truckId: driverData.numberPlate,
        customerName: driverData.customerName,
        products: orderProducts,
        address: driverData.address,
        status: 'in-progress',
        type: 'loading',
        grossWeight: driverData.weight
      });
    }
    
    // Move to post-loading weight check
    setCurrentStep(6);
  };

  const handleStep6Next = (netWeight: number, tareWeight: number) => {
    setDriverData(prev => ({ ...prev, netWeight, tareWeight }));
    
    // For registered customers, go to delivery note; for non-registered, go to invoice
    if (driverData.isRegistered) {
      setCurrentStep(7);
    } else {
      setCurrentStep(8);
    }
  };

  const handleDeliveryNoteDone = () => {
    // Reset flow for registered customers
    setCurrentStep('welcome');
    setDriverData({});
  };

  const handlePaymentComplete = () => {
    // Reset flow for non-registered customers
    setCurrentStep('welcome');
    setDriverData({});
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      setCurrentStep('welcome');
    } else if (typeof currentStep === 'number' && currentStep > 1 && currentStep <= 5) {
      setCurrentStep((currentStep - 1) as DriverStep);
    }
  };

  // Helper to get first product for components that expect single product
  const getFirstProduct = () => driverData.products?.[0];
  const getFirstQuantity = () => {
    const firstProduct = getFirstProduct();
    return firstProduct ? driverData.quantities?.[firstProduct.id] || 0 : 0;
  };

  switch (currentStep) {
    case 'welcome':
      return <DriverWelcomeScreen onSelectAction={handleWelcomeNext} />;
    case 1:
      return <DriverScreen1 onNext={handleStep1Next} />;
    case 2:
      return (
        <DriverScreen2 
          onNext={handleStep2Next} 
          onPrevious={handlePrevious}
        />
      );
    case 3:
      return (
        <DriverScreen3 
          onNext={handleStep3Next} 
          onPrevious={handlePrevious}
          isRegistered={driverData.isRegistered || false}
        />
      );
    case 4:
      return (
        <DriverScreen4 
          products={driverData.products || []}
          onNext={handleStep4Next} 
          onPrevious={handlePrevious}
        />
      );
    case 5:
      return (
        <DriverScreen5 
          products={driverData.products || []}
          quantities={driverData.quantities || {}}
          onDone={handleStep5Done}
        />
      );
    case 6:
      return (
        <DriverScreen6
          products={driverData.products || []}
          quantities={driverData.quantities || {}}
          grossWeight={driverData.weight!}
          onNext={handleStep6Next}
        />
      );
    case 7:
      return (
        <DeliveryNotePrint
          products={driverData.products || []}
          quantities={driverData.quantities || {}}
          netWeight={driverData.netWeight!}
          tareWeight={driverData.tareWeight!}
          customerName={driverData.customerName!}
          numberPlate={driverData.numberPlate!}
          onDone={handleDeliveryNoteDone}
        />
      );
    case 8:
      return (
        <NonRegDriverInvoice
          products={driverData.products || []}
          quantities={driverData.quantities || {}}
          netWeight={driverData.netWeight!}
          tareWeight={driverData.tareWeight!}
          customerName={driverData.customerName!}
          numberPlate={driverData.numberPlate!}
          onPayment={handlePaymentComplete}
        />
      );
    default:
      return <DriverWelcomeScreen onSelectAction={handleWelcomeNext} />;
  }
};

export default DriverFlow;
