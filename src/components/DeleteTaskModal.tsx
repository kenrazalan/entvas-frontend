import { Button } from '@/components/ui/button';
import Modal from '@/components/UI/Modal';
import { Loader2, AlertTriangle } from 'lucide-react';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
  isDeleting: boolean;
}

export default function DeleteTaskModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  isDeleting
}: DeleteTaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-yellow-600">
          <AlertTriangle size={20} />
          <p className="font-medium">Are you sure you want to delete this task?</p>
        </div>
        
        <p className="text-sm text-gray-600">
          This will permanently delete the task "{taskTitle}". This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 w-full">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Task</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
} 