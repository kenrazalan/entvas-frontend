import { Button } from '@/components/UI/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Task } from '@/services/task.service';

interface SendApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
}

export default function SendApprovalModal({
  isOpen,
  onClose,
  onConfirm,
  task,
}: SendApprovalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Approval Email</DialogTitle>
          <DialogDescription>
            Are you sure you want to send an approval email to {task?.assigneeEmail}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Send Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 