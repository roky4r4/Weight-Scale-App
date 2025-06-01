
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, Address, Product } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addNoteToOrder: (orderId: string, note: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Mock products data
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Premium Gravel',
    description: 'High-quality construction gravel',
    stockyardArea: 'Area A',
    availability: 'available',
    unit: 'tons',
    price: 45
  },
  '2': {
    id: '2',
    name: 'Sand',
    description: 'Fine construction sand',
    stockyardArea: 'Area B',
    availability: 'available',
    unit: 'tons',
    price: 35
  },
  '3': {
    id: '3',
    name: 'Crushed Stone',
    description: 'Various sizes available',
    stockyardArea: 'Area C',
    availability: 'low',
    unit: 'tons',
    price: 50
  }
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      truckId: 'AB-123-CD',
      products: [{ productId: '1', quantity: 20 }],
      status: 'pending',
      type: 'loading',
      notes: []
    },
    {
      id: '2',
      truckId: 'DE-456-FG',
      products: [{ productId: '2', quantity: 15 }],
      status: 'in-progress',
      type: 'unloading',
      notes: []
    },
    {
      id: '3',
      truckId: 'HI-789-JK',
      products: [{ productId: '3', quantity: 25 }],
      status: 'pending',
      type: 'loading',
      notes: []
    }
  ]);

  const addOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      notes: []
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addNoteToOrder = (orderId: string, note: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, notes: [...(order.notes || []), { text: note, timestamp: new Date().toISOString() }] }
        : order
    ));
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      addNoteToOrder,
      getOrderById
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export { mockProducts };
