
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Truck, Users, Settings } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const userTypes = [
    {
      title: 'Truck Driver Interface',
      description: 'Weight confirmation, address selection, and product loading management',
      icon: Truck,
      path: '/driver',
      color: 'bg-primary'
    },
    {
      title: 'Excavator Operator Interface',
      description: 'Order management and transaction finalization',
      icon: Users,
      path: '/operator',
      color: 'bg-warning'
    },
    {
      title: 'Admin Dashboard',
      description: 'System configuration, master data, and oversight',
      icon: Settings,
      path: '/admin',
      color: 'bg-success'
    }
  ];

  return (
    <div className="min-h-screen bg-industrial-900">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t('app.title')}
            </h1>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Comprehensive truck weighing and management system designed for truck drivers, 
              excavator operators, and system administrators.
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((userType) => {
              const IconComponent = userType.icon;
              
              return (
                <Card 
                  key={userType.path}
                  className="card-selectable p-8 text-center hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate(userType.path)}
                >
                  <div className={`w-16 h-16 ${userType.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {userType.title}
                  </h3>
                  
                  <p className="text-industrial-300 mb-6">
                    {userType.description}
                  </p>
                  
                  <Button 
                    className="btn-large w-full"
                    size="lg"
                  >
                    Access Interface
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Large, Touch-Friendly Interface',
                'Multi-Language Support (German/English)',
                'Real-Time Weight Detection',
                'Automated ERP Integration',
                'Industrial-Grade Design',
                'Comprehensive Order Management',
                'Payment Processing',
                'Admin Dashboard & Analytics'
              ].map((feature, index) => (
                <Card key={index} className="p-6 bg-industrial-800 border-industrial-600">
                  <div className="text-industrial-200 font-medium">
                    {feature}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
