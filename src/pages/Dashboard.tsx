import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { PlusCircle } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import DeleteTaskModal from '@/components/modals/DeleteTaskModal';
import EditTaskModal from '@/components/modals/EditTaskModal';
import SendApprovalModal from '@/components/modals/SendApprovalModal';
import { Task, taskService } from '@/services/task.service';
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [taskToSendApproval, setTaskToSendApproval] = useState<Task | null>(null);
  const [sendingApprovalId, setSendingApprovalId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;

    try {
      setDeletingTaskId(taskToDelete._id);
      await taskService.deleteTask(taskToDelete._id);
      setTasks(tasks.filter(task => task._id !== taskToDelete._id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setDeletingTaskId(null);
      setTaskToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setTaskToDelete(null);
    setDeletingTaskId(null);
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
  };

  const handleEditConfirm = async (taskData: { title: string; description: string; assigneeEmail: string }) => {
    if (!taskToEdit) return;

    try {
      setUpdatingTaskId(taskToEdit._id);
      const updatedTask = await taskService.updateTask(taskToEdit._id, taskData);
      
      setTasks(tasks.map(task => 
        task._id === taskToEdit._id ? updatedTask : task
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setUpdatingTaskId(null);
      setTaskToEdit(null);
    }
  };

  const handleEditCancel = () => {
    setTaskToEdit(null);
    setUpdatingTaskId(null);
  };

  const handleSendApprovalClick = (task: Task) => {
    setTaskToSendApproval(task);
  };

  const handleSendApprovalConfirm = async () => {
    if (!taskToSendApproval) return;

    try {
      setSendingApprovalId(taskToSendApproval._id);
      await taskService.sendApprovalEmail(taskToSendApproval._id);
      setSuccessMessage(`Approval email sent to ${taskToSendApproval.assigneeEmail}`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send approval email');
    } finally {
      setSendingApprovalId(null);
      setTaskToSendApproval(null);
    }
  };

  const handleSendApprovalCancel = () => {
    setTaskToSendApproval(null);
    setSendingApprovalId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Your Tasks</h2>
            <Button 
              onClick={() => setShowTaskForm(true)}
              className="w-full sm:w-auto gap-2"
            >
              <PlusCircle size={18} />
              <span>Create Task</span>
            </Button>
          </div>

          <TaskForm 
            isOpen={showTaskForm}
            onClose={() => setShowTaskForm(false)}
            onSuccess={handleTaskCreated}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-2 text-gray-500">Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onSendApproval={handleSendApprovalClick}
              deletingTaskId={deletingTaskId}
              updatingTaskId={updatingTaskId}
              sendingApprovalId={sendingApprovalId}
            />
          )}
        </div>
      </main>

      <DeleteTaskModal
        isOpen={!!taskToDelete}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        task={taskToDelete}
      />

      <EditTaskModal
        isOpen={!!taskToEdit}
        onClose={handleEditCancel}
        onConfirm={handleEditConfirm}
        task={taskToEdit}
      />

      <SendApprovalModal
        isOpen={!!taskToSendApproval}
        onClose={handleSendApprovalCancel}
        onConfirm={handleSendApprovalConfirm}
        task={taskToSendApproval}
      />
    </div>
  );
} 