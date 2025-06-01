
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useOrders, mockProducts } from '../contexts/OrderContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Header from '../components/Header';
import ProductFormDialog from '../components/ProductFormDialog';
import CustomerFormDialog from '../components/CustomerFormDialog';
import OperatorFormDialog from '../components/OperatorFormDialog';
import { Product } from '../types';

interface Customer {
  id: string;
  name: string;
  numberPlate: string;
  contact: string;
}

interface Operator {
  id: string;
  name: string;
  shift: string;
  status: 'active' | 'off-duty';
}

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { orders } = useOrders();
  const [products, setProducts] = useState<Product[]>(Object.values(mockProducts));
  const [customers, setCustomers] = useState<Customer[]>([
    { id: '1', name: 'Acme Corp', numberPlate: 'AB-123-CD', contact: 'contact@acme.com' },
    { id: '2', name: 'BuildCo Ltd', numberPlate: 'DE-456-FG', contact: 'info@buildco.com' },
    { id: '3', name: 'Construction Inc', numberPlate: 'HI-789-JK', contact: 'hello@construction.com' }
  ]);
  const [operators, setOperators] = useState<Operator[]>([
    { id: '1', name: 'Hans Mueller', shift: 'Morning (06:00-14:00)', status: 'active' },
    { id: '2', name: 'Klaus Weber', shift: 'Afternoon (14:00-22:00)', status: 'active' },
    { id: '3', name: 'Fritz Schmidt', shift: 'Night (22:00-06:00)', status: 'off-duty' }
  ]);

  // Dialog states
  const [productDialog, setProductDialog] = useState<{ isOpen: boolean; product?: Product }>({ isOpen: false });
  const [customerDialog, setCustomerDialog] = useState<{ isOpen: boolean; customer?: Customer }>({ isOpen: false });
  const [operatorDialog, setOperatorDialog] = useState<{ isOpen: boolean; operator?: Operator }>({ isOpen: false });

  // Search and filter states
  const [orderSearch, setOrderSearch] = useState('');

  // Product handlers
  const handleProductSave = (productData: Omit<Product, 'id'> & { id?: string }) => {
    if (productData.id) {
      // Edit existing product
      setProducts(prev => prev.map(p => p.id === productData.id ? { ...productData, id: productData.id } as Product : p));
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString()
      };
      setProducts(prev => [...prev, newProduct]);
    }
  };

  const handleProductDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Customer handlers
  const handleCustomerSave = (customerData: Omit<Customer, 'id'> & { id?: string }) => {
    if (customerData.id) {
      // Edit existing customer
      setCustomers(prev => prev.map(c => c.id === customerData.id ? { ...customerData, id: customerData.id } as Customer : c));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString()
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
  };

  const handleCustomerDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  // Operator handlers
  const handleOperatorSave = (operatorData: Omit<Operator, 'id'> & { id?: string }) => {
    if (operatorData.id) {
      // Edit existing operator
      setOperators(prev => prev.map(o => o.id === operatorData.id ? { ...operatorData, id: operatorData.id } as Operator : o));
    } else {
      // Add new operator
      const newOperator: Operator = {
        ...operatorData,
        id: Date.now().toString()
      };
      setOperators(prev => [...prev, newOperator]);
    }
  };

  const handleOperatorDelete = (id: string) => {
    setOperators(prev => prev.filter(o => o.id !== id));
  };

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

  // Filter orders based on search
  const filteredOrders = orders.filter(order => {
    const searchLower = orderSearch.toLowerCase();
    const product = mockProducts[order.products[0]?.productId];
    const customer = order.customerName || customers.find(c => c.numberPlate === order.truckId)?.name;
    
    return !orderSearch || 
           order.truckId.toLowerCase().includes(searchLower) ||
           customer?.toLowerCase().includes(searchLower) ||
           product?.name.toLowerCase().includes(searchLower) ||
           order.status.toLowerCase().includes(searchLower);
  });

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
                <Button 
                  className="btn-large bg-primary hover:bg-blue-600"
                  onClick={() => setProductDialog({ isOpen: true })}
                >
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProductDialog({ isOpen: true, product })}
                        >
                          {t('common.edit')}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleProductDelete(product.id)}
                        >
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
                <Button 
                  className="btn-large bg-primary hover:bg-blue-600"
                  onClick={() => setCustomerDialog({ isOpen: true })}
                >
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setCustomerDialog({ isOpen: true, customer })}
                        >
                          {t('common.edit')}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCustomerDelete(customer.id)}
                        >
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
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                  <Button variant="outline">Filter</Button>
                </div>
              </div>
              
              <div className="grid gap-6">
                {filteredOrders.map((order) => {
                  const product = mockProducts[order.products[0]?.productId];
                  const customer = order.customerName || customers.find(c => c.numberPlate === order.truckId)?.name;
                  
                  return (
                    <Card key={order.id} className="p-6 bg-industrial-800 border-industrial-600">
                      <div className="grid md:grid-cols-6 gap-4 items-center">
                        <div>
                          <div className="text-lg font-semibold text-white">{customer}</div>
                          <div className="text-industrial-300 text-sm font-mono">{order.truckId}</div>
                        </div>
                        <div className="text-white">
                          {product?.name}
                        </div>
                        <div className="text-primary font-semibold">
                          {order.products[0]?.quantity} tons
                        </div>
                        <div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="text-industrial-300">
                          {new Date().toLocaleDateString()}
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      {order.notes && order.notes.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-industrial-600">
                          <div className="text-sm text-industrial-300 mb-2">Notes: {order.notes.length}</div>
                          <div className="text-sm text-industrial-400">
                            Latest: {order.notes[order.notes.length - 1].text}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Operators Tab */}
            <TabsContent value="operators" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Excavator Operators</h2>
                <Button 
                  className="btn-large bg-primary hover:bg-blue-600"
                  onClick={() => setOperatorDialog({ isOpen: true })}
                >
                  {t('common.add')} Operator
                </Button>
              </div>
              
              <div className="grid gap-6">
                {operators.map((operator) => (
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setOperatorDialog({ isOpen: true, operator })}
                        >
                          {t('common.edit')}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleOperatorDelete(operator.id)}
                        >
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

      {/* Form Dialogs */}
      <ProductFormDialog
        product={productDialog.product}
        isOpen={productDialog.isOpen}
        onClose={() => setProductDialog({ isOpen: false })}
        onSave={handleProductSave}
        onDelete={handleProductDelete}
      />

      <CustomerFormDialog
        customer={customerDialog.customer}
        isOpen={customerDialog.isOpen}
        onClose={() => setCustomerDialog({ isOpen: false })}
        onSave={handleCustomerSave}
        onDelete={handleCustomerDelete}
      />

      <OperatorFormDialog
        operator={operatorDialog.operator}
        isOpen={operatorDialog.isOpen}
        onClose={() => setOperatorDialog({ isOpen: false })}
        onSave={handleOperatorSave}
        onDelete={handleOperatorDelete}
      />
    </div>
  );
};

export default AdminDashboard;
