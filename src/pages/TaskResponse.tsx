import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '@/services/task.service';
import { Button } from '@/components/UI/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function TaskResponse() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [task, setTask] = useState<any>(null);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!token) {
        setError('Invalid or missing token');
        setLoading(false);
        return;
      }

      try {
        const taskData = await taskService.getTaskByToken(token);
        setTask(taskData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [token]);

  const handleResponse = async (approve: boolean) => {
    if (!token) return;

    try {
      setResponding(true);
      await taskService.respondToTask(token, approve);
      setSuccess(true);
      setTask(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process your response');
    } finally {
      setResponding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-500">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <div className="text-red-500 mb-4">
              <XCircle className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <div className="text-green-500 mb-4">
              <CheckCircle className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">Your response has been recorded successfully.</p>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Task Approval Request</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Title</h3>
              <p className="mt-1 text-gray-900">{task?.title}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-gray-900">{task?.description}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created By</h3>
              <p className="mt-1 text-gray-900">{task?.creator?.email}</p>
            </div>
            
            {/* <div>
              <h3 className="text-sm font-medium text-gray-500">Assigned By</h3>
              <p className="mt-1 text-gray-900">{task?.assigneeEmail}</p>
            </div> */}
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => handleResponse(false)}
              disabled={responding}
            >
              {responding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Reject
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={() => handleResponse(true)}
              disabled={responding}
            >
              {responding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 