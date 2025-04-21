import { Button } from '@/components/UI/button';
import Modal from '@/components/UI/Modal';
import { Loader2, Mail } from 'lucide-react';
import { Task } from '@/services/task.service';

interface SendApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
  isSending: boolean;
}

export default function SendApprovalModal({
  isOpen,
  onClose,
  onConfirm,
  task,
  isSending
}: SendApprovalModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Approval Email">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-blue-600">
          <Mail size={20} />
          <p className="font-medium">Send approval email for this task?</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-900">{task?.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{task?.description}</p>
          <p className="text-xs text-gray-500 mt-2">Assigned to: {task?.assigneeEmail}</p>
        </div>
        
        <p className="text-sm text-gray-600">
          An email will be sent to {task?.assigneeEmail} with a link to approve or reject this task.
        </p>

        <div className="flex justify-end gap-2 w-full">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm}
            disabled={isSending}
            className="gap-2"
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
} 