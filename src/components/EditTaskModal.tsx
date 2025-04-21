import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Modal from '@/components/UI/Modal';
import { Loader2, Save } from 'lucide-react';
import { Task } from '@/services/task.service';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (taskData: { title: string; description: string; assigneeEmail: string }) => void;
  task: Task | null;
  isUpdating: boolean;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onConfirm,
  task,
  isUpdating
}: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [error, setError] = useState('');

  // Reset form when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssigneeEmail(task.assigneeEmail);
      setError('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    
    if (!assigneeEmail.trim()) {
      setError('Assignee email is required');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(assigneeEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    onConfirm({
      title,
      description,
      assigneeEmail
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="assigneeEmail">Assignee Email</Label>
            <Input
              id="assigneeEmail"
              type="email"
              placeholder="Enter assignee email"
              value={assigneeEmail}
              onChange={(e) => setAssigneeEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="flex justify-end gap-2 w-full">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2" disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Update Task</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
} 