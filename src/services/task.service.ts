import axios from 'axios';
import { authService } from './auth.service';

const API_URL = 'https://entvas-backend.onrender.com/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeEmail: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  assigneeEmail: string;
}

class TaskService {
  private getAuthHeader() {
    const token = authService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    try {
      const response = await axios.post(
        `${API_URL}/tasks`, 
        taskData,
        this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get(
        `${API_URL}/tasks`,
        this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(taskId: string, taskData: Partial<CreateTaskRequest>): Promise<Task> {
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        taskData,
        this.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      await axios.delete(
        `${API_URL}/tasks/${taskId}`,
        this.getAuthHeader()
      );
    } catch (error) {
      throw error;
    }
  }
}

export const taskService = new TaskService(); 