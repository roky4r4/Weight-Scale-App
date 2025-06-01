
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Header from '../components/Header';
import { Product } from '../types';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Gravel',
      description: 'High-quality construction gravel',
      stockyardArea: 'Area A',
      availability: 'available',
      unit: 'tons',
      price: 45
    },
    {
      id: '2',
      name: 'Sand',
      description: 'Fine construction sand',
      stockyardArea: 'Area B',
      availability: 'available',
      unit: 'tons',
      price: 35
    },
    {
      id: '3',
      name: 'Crushed Stone',
      description: 'Various sizes available',
      stockyardArea: 'Area C',
      availability: 'low',
      unit: 'tons',
      price: 50
    }
  ]);

  const customers = [
    { id: '1', name: 'Acme Corp', numberPlate: 'AB-123-CD', contact: 'contact@acme.com' },
    { id: '2', name: 'BuildCo Ltd', numberPlate: 'DE-456-FG', contact: 'info@buildco.com' },
    { id: '3', name: 'Construction Inc', numberPlate: 'HI-789-JK', contact: 'hello@construction.com' }
  ];

  const orders = [
    { id: '1', truck: 'AB-123-CD', customer: 'Acme Corp', product: 'Premium Gravel', quantity: 20, status: 'completed', date: '2024-06-01' },
    { id: '2', truck: 'DE-456-FG', customer: 'BuildCo Ltd', product: 'Sand', quantity: 15, status: 'in-progress', date: '2024-06-01' },
    { id: '3', truck: 'HI-789-JK', customer: 'Construction Inc', product: 'Crushed Stone', quantity: 25, status: 'pending', date: '2024-06-01' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success text-white">Available</Badge>;
      case 'low':
        return <Badge className="bg-warning text-white">Low Stock</Badge>;
      case 'unavailable':
        return <Badge className="bg-danger text-white">Unavailable</Badge>;
      case 'completed':
        return <Badge className="bg-success text-white">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-primary text-white">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-white">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header title="Admin Dashboard" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          
          <Tabs defaultValue="products" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-industrial-800">
              <TabsTrigger value="products" className="data-[state=active]:bg-primary">
                Products
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-primary">
                Customers
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-primary">
                Orders
              </TabsTrigger>
              <TabsTrigger value="operators" className="data-[state=active]:bg-primary">
                Operators
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Product Management</h2>
                <Button className="btn-large bg-primary hover:bg-blue-600">
                  {t('common.add')} Product
                </Button>
              </div>
              
              <div className="grid gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="p-6 bg-industrial-800 border-industrial-600">
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div>
                        <div className="text-lg font-semibold text-white">{product.name}</div>
                        <div className="text-industrial-300 text-sm">{product.description}</div>
                      </div>
                      <div className="text-industrial-300">
                        <div className="font-medium">{product.stockyardArea}</div>
                      </div>
                      <div>
                        {getStatusBadge(product.availability)}
                      </div>
                      <div className="text-white font-medium">
                        €{product.price}/{product.unit}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          {t('common.edit')}
                        </Button>
                        <Button variant="destructive" size="sm">
                          {t('common.delete')}
                        </Button>
                      </div>
                      <div>
                        <Input 
                          type="number" 
                          placeholder="Stock level"
                          className="bg-industrial-700 border-industrial-500"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Customer Management</h2>
                <Button className="btn-large bg-primary hover:bg-blue-600">
                  {t('common.add')} Customer
                </Button>
              </div>
              
              <div className="grid gap-6">
                {customers.map((customer) => (
                  <Card key={customer.id} className="p-6 bg-industrial-800 border-industrial-600">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <div className="text-lg font-semibold text-white">{customer.name}</div>
                        <div className="text-industrial-300 text-sm">{customer.contact}</div>
                      </div>
                      <div className="text-white font-mono text-lg">
                        {customer.numberPlate}
                      </div>
                      <div>
                        <Badge className="bg-success text-white">Registered</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          {t('common.edit')}
                        </Button>
                        <Button variant="destructive" size="sm">
                          {t('common.delete')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Order Management</h2>
                <div className="flex space-x-4">
                  <Input 
                    placeholder="Search orders..."
                    className="bg-industrial-700 border-industrial-500"
                  />
                  <Button variant="outline">Filter</Button>
                </div>
              </div>
              
              <div className="grid gap-6">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6 bg-industrial-800 border-industrial-600">
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div>
                        <div className="text-lg font-semibold text-white">{order.customer}</div>
                        <div className="text-industrial-300 text-sm font-mono">{order.truck}</div>
                      </div>
                      <div className="text-white">
                        {order.product}
                      </div>
                      <div className="text-primary font-semibold">
                        {order.quantity} tons
                      </div>
                      <div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-industrial-300">
                        {order.date}
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Operators Tab */}
            <TabsContent value="operators" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Excavator Operators</h2>
                <Button className="btn-large bg-primary hover:bg-blue-600">
                  {t('common.add')} Operator
                </Button>
              </div>
              
              <div className="grid gap-6">
                {[
                  { id: '1', name: 'Hans Mueller', shift: 'Morning (06:00-14:00)', status: 'active' },
                  { id: '2', name: 'Klaus Weber', shift: 'Afternoon (14:00-22:00)', status: 'active' },
                  { id: '3', name: 'Fritz Schmidt', shift: 'Night (22:00-06:00)', status: 'off-duty' }
                ].map((operator) => (
                  <Card key={operator.id} className="p-6 bg-industrial-800 border-industrial-600">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <div className="text-lg font-semibold text-white">{operator.name}</div>
                      </div>
                      <div className="text-industrial-300">
                        {operator.shift}
                      </div>
                      <div>
                        <Badge className={operator.status === 'active' ? 'bg-success text-white' : 'bg-industrial-600 text-white'}>
                          {operator.status === 'active' ? 'Active' : 'Off Duty'}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          {t('common.edit')}
                        </Button>
                        <Button variant="destructive" size="sm">
                          {t('common.delete')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
