import { Button } from '@/components/UI/button';
import { Edit2, Mail, Trash2 } from 'lucide-react';
import { Task } from '@/services/task.service';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onSendApproval: (task: Task) => void;
  isDeleting: boolean;
  isUpdating: boolean;
  isSendingApproval: boolean;
}

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onSendApproval,
  isDeleting,
  isUpdating,
  isSendingApproval,
}: TaskItemProps) {
  return (
    <li className="px-4 sm:px-6 py-4 hover:bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          <p className="mt-1 text-xs text-gray-400">Assigned to: {task.assigneeEmail}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            task.status === 'APPROVED' 
              ? 'bg-green-100 text-green-800' 
              : task.status === 'REJECTED' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {task.status}
          </span>
          <div className="flex flex-wrap gap-2">
            {task.status === 'PENDING' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSendApproval(task)}
                  disabled={isSendingApproval}
                  className="gap-2"
                >
                  <Mail size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(task)}
                  disabled={isUpdating}
                  className="gap-2"
                >
                  <Edit2 size={16} />
                </Button>
              </>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(task)}
              disabled={isDeleting}
              className="gap-2"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
} 