
export interface Truck {
  id: string;
  numberPlate: string;
  customerName: string;
  isRegistered: boolean;
  currentWeight?: number;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stockyardArea: string;
  availability: 'available' | 'low' | 'unavailable';
  unit: string;
  price?: number;
}

export interface OrderNote {
  text: string;
  timestamp: string;
}

export interface Order {
  id: string;
  truckId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  address?: Address;
  status: 'pending' | 'in-progress' | 'completed';
  grossWeight?: number;
  tareWeight?: number;
  netWeight?: number;
  type: 'loading' | 'unloading' | 'both';
  notes?: OrderNote[];
  customerName?: string;
}

export interface Language {
  code: 'en' | 'de';
  name: string;
}
