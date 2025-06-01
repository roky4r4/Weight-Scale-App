
import { useState } from 'react';
import DriverScreen1 from '../components/DriverScreen1';
import DriverScreen2 from '../components/DriverScreen2';
import DriverScreen3 from '../components/DriverScreen3';
import DriverScreen4 from '../components/DriverScreen4';
import DriverScreen5 from '../components/DriverScreen5';
import { Address, Product } from '../types';

type DriverStep = 1 | 2 | 3 | 4 | 5;

interface DriverData {
  weight?: number;
  numberPlate?: string;
  customerName?: string;
  address?: Address;
  product?: Product;
  quantity?: number;
}

const DriverFlow = () => {
  const [currentStep, setCurrentStep] = useState<DriverStep>(1);
  const [driverData, setDriverData] = useState<DriverData>({});

  const handleStep1Next = (data: { weight: number; numberPlate: string; customerName: string }) => {
    setDriverData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Next = (address: Address) => {
    setDriverData(prev => ({ ...prev, address }));
    setCurrentStep(3);
  };

  const handleStep3Next = (product: Product) => {
    setDriverData(prev => ({ ...prev, product }));
    setCurrentStep(4);
  };

  const handleStep4Next = (quantity: number) => {
    setDriverData(prev => ({ ...prev, quantity }));
    setCurrentStep(5);
  };

  const handleStep5Done = () => {
    // Reset flow or navigate to completion
    setCurrentStep(1);
    setDriverData({});
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((current - 1) as DriverStep);
    }
  };

  switch (currentStep) {
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
        />
      );
    case 4:
      return (
        <DriverScreen4 
          product={driverData.product!}
          onNext={handleStep4Next} 
          onPrevious={handlePrevious}
        />
      );
    case 5:
      return (
        <DriverScreen5 
          product={driverData.product!}
          quantity={driverData.quantity!}
          onDone={handleStep5Done}
        />
      );
    default:
      return <DriverScreen1 onNext={handleStep1Next} />;
  }
};

export default DriverFlow;
