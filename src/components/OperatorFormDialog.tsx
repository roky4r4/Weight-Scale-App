
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface Operator {
  id: string;
  name: string;
  shift: string;
  status: 'active' | 'off-duty';
}

interface OperatorFormDialogProps {
  operator?: Operator;
  isOpen: boolean;
  onClose: () => void;
  onSave: (operator: Omit<Operator, 'id'> & { id?: string }) => void;
  onDelete?: (id: string) => void;
}

const OperatorFormDialog = ({ operator, isOpen, onClose, onSave, onDelete }: OperatorFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: operator?.name || '',
    shift: operator?.shift || '',
    status: operator?.status || 'active' as const
  });

  const handleSave = () => {
    onSave({
      ...formData,
      ...(operator && { id: operator.id })
    });
    onClose();
  };

  const handleDelete = () => {
    if (operator && onDelete) {
      onDelete(operator.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 bg-industrial-800 border-industrial-600">
        <h2 className="text-xl font-bold text-white mb-4">
          {operator ? 'Edit Operator' : 'Add Operator'}
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
            <Label htmlFor="shift" className="text-white">Shift</Label>
            <Select value={formData.shift} onValueChange={(value) => setFormData({ ...formData, shift: value })}>
              <SelectTrigger className="bg-industrial-700 border-industrial-500 text-white">
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning (06:00-14:00)">Morning (06:00-14:00)</SelectItem>
                <SelectItem value="Afternoon (14:00-22:00)">Afternoon (14:00-22:00)</SelectItem>
                <SelectItem value="Night (22:00-06:00)">Night (22:00-06:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status" className="text-white">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'active' | 'off-duty') => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-industrial-700 border-industrial-500 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="off-duty">Off Duty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <div>
            {operator && onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the operator.
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

export default OperatorFormDialog;
