import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Textarea } from '@/components/UI/textarea';
import { CreateTaskRequest, taskService } from '@/services/task.service';
import { PlusCircle, Loader2 } from 'lucide-react';
import Modal from '@/components/UI/Modal';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TaskForm({ isOpen, onClose, onSuccess }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Reference to the form element
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Custom reset function
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAssigneeEmail('');
    setError('');
    
    // Also reset the form using the native reset
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const taskData: CreateTaskRequest = {
        title,
        description,
        assigneeEmail
      };
      
      await taskService.createTask(taskData);
      onSuccess();
      resetForm(); // Reset form after successful submission
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
            onClick={() => {
              resetForm();
              onClose();
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                <span>Create Task</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
} 