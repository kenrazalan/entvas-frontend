import { Task } from '@/services/task.service';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onSendApproval: (task: Task) => void;
  deletingTaskId: string | null;
  updatingTaskId: string | null;
  sendingApprovalId: string | null;
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onSendApproval,
  deletingTaskId,
  updatingTaskId,
  sendingApprovalId,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No tasks found. Create your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onSendApproval={onSendApproval}
            isDeleting={deletingTaskId === task._id}
            isUpdating={updatingTaskId === task._id}
            isSendingApproval={sendingApprovalId === task._id}
          />
        ))}
      </ul>
    </div>
  );
} 