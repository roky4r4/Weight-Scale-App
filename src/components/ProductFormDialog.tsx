
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Product } from '../types';

interface ProductFormDialogProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> & { id?: string }) => void;
  onDelete?: (id: string) => void;
}

const ProductFormDialog = ({ product, isOpen, onClose, onSave, onDelete }: ProductFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    stockyardArea: product?.stockyardArea || '',
    availability: product?.availability || 'available' as const,
    unit: product?.unit || 'tons',
    price: product?.price || 0
  });

  const handleSave = () => {
    onSave({
      ...formData,
      ...(product && { id: product.id })
    });
    onClose();
  };

  const handleDelete = () => {
    if (product && onDelete) {
      onDelete(product.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 bg-industrial-800 border-industrial-600">
        <h2 className="text-xl font-bold text-white mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-industrial-700 border-industrial-500 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-industrial-700 border-industrial-500 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="area" className="text-white">Stockyard Area</Label>
            <Input
              id="area"
              value={formData.stockyardArea}
              onChange={(e) => setFormData({ ...formData, stockyardArea: e.target.value })}
              className="bg-industrial-700 border-industrial-500 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="availability" className="text-white">Availability</Label>
            <Select value={formData.availability} onValueChange={(value: 'available' | 'low' | 'unavailable') => setFormData({ ...formData, availability: value })}>
              <SelectTrigger className="bg-industrial-700 border-industrial-500 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unit" className="text-white">Unit</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="bg-industrial-700 border-industrial-500 text-white"
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-white">Price (€)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="bg-industrial-700 border-industrial-500 text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <div>
            {product && onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product.
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

export default ProductFormDialog;
