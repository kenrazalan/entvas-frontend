import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { PlusCircle, LogOut, Trash2, Edit2, Mail } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import DeleteTaskModal from '@/components/modals/DeleteTaskModal';
import EditTaskModal from '@/components/modals/EditTaskModal';
import SendApprovalModal from '@/components/modals/SendApprovalModal';
import { Task, taskService } from '@/services/task.service';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
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
      
      // Update the task in the local state
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
      
      // Clear success message after 5 seconds
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
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Task Management Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user?.name || 'User'}</span>
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="gap-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Tasks</h2>
            <Button 
              onClick={() => setShowTaskForm(true)}
              className="gap-2"
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
          ) : tasks.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-gray-500">No tasks found. Create your first task to get started.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <li key={task._id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{task.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                        <p className="mt-1 text-xs text-gray-400">Assigned to: {task.assigneeEmail}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === 'APPROVED' 
                            ? 'bg-green-100 text-green-800' 
                            : task.status === 'REJECTED' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.status}
                        </span>
                        <div className="flex gap-2">
                          {task.status === 'PENDING' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendApprovalClick(task)}
                                disabled={sendingApprovalId === task._id}
                                className="gap-2"
                              >
                                <Mail size={16} />
                                <span>Send Approval</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClick(task)}
                                disabled={updatingTaskId === task._id}
                                className="gap-2"
                              >
                                <Edit2 size={16} />
                                <span>Edit</span>
                              </Button>
                            </>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(task)}
                            disabled={deletingTaskId === task._id}
                            className="gap-2"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <DeleteTaskModal
        isOpen={!!taskToDelete}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        taskTitle={taskToDelete?.title || ''}
        isDeleting={!!deletingTaskId}
      />

      <EditTaskModal
        isOpen={!!taskToEdit}
        onClose={handleEditCancel}
        onConfirm={handleEditConfirm}
        task={taskToEdit}
        isUpdating={!!updatingTaskId}
      />

      <SendApprovalModal
        isOpen={!!taskToSendApproval}
        onClose={handleSendApprovalCancel}
        onConfirm={handleSendApprovalConfirm}
        task={taskToSendApproval}
        isSending={!!sendingApprovalId}
      />
    </div>
  );
} 