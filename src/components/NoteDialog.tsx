
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../hooks/useLanguage';

interface NoteDialogProps {
  onAddNote: (note: string) => void;
  children: React.ReactNode;
}

const NoteDialog = ({ onAddNote, children }: NoteDialogProps) => {
  const [note, setNote] = useState('');
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (note.trim()) {
      onAddNote(note.trim());
      setNote('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-industrial-800 border-industrial-600">
        <DialogHeader>
          <DialogTitle className="text-white">Add Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter your note here..."
            className="bg-industrial-700 border-industrial-500 text-white"
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSubmit} disabled={!note.trim()}>
              {t('common.add')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
