import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Task } from "@/services/task.service";
import { useState } from "react";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (taskData: { title: string; description: string; assigneeEmail: string }) => void;
  task: Task | null;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onConfirm,
  task,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assigneeEmail, setAssigneeEmail] = useState(task?.assigneeEmail || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ title, description, assigneeEmail });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Assignee Email</Label>
              <Input
                id="assignee"
                type="email"
                value={assigneeEmail}
                onChange={(e) => setAssigneeEmail(e.target.value)}
                placeholder="Enter assignee email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 