
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface Customer {
  id: string;
  name: string;
  numberPlate: string;
  contact: string;
}

interface CustomerFormDialogProps {
  customer?: Customer;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id'> & { id?: string }) => void;
  onDelete?: (id: string) => void;
}

const CustomerFormDialog = ({ customer, isOpen, onClose, onSave, onDelete }: CustomerFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    numberPlate: customer?.numberPlate || '',
    contact: customer?.contact || ''
  });

  const handleSave = () => {
    onSave({
      ...formData,
      ...(customer && { id: customer.id })
    });
    onClose();
  };

  const handleDelete = () => {
    if (customer && onDelete) {
      onDelete(customer.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 bg-industrial-800 border-industrial-600">
        <h2 className="text-xl font-bold text-white mb-4">
          {customer ? 'Edit Customer' : 'Add Customer'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Company Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-industrial-700 border-industrial-500 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="numberPlate" className="text-white">Number Plate</Label>
            <Input
              id="numberPlate"
              value={formData.numberPlate}
              onChange={(e) => setFormData({ ...formData, numberPlate: e.target.value })}
              className="bg-industrial-700 border-industrial-500 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="contact" className="text-white">Contact</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="bg-industrial-700 border-industrial-500 text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <div>
            {customer && onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the customer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerFormDialog;
