import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// Define types
export interface User {
  id: number;
  name: string;
  email: string;
}

// Query key
const USERS_QUERY_KEY = 'users';

// Fetch users
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

// Create user
const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const { data } = await api.post<User>('/users', userData);
  return data;
};

// Update user
const updateUser = async (userData: User): Promise<User> => {
  const { data } = await api.put<User>(`/users/${userData.id}`, userData);
  return data;
};

// Delete user
const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// Custom hooks
export const useUsers = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: fetchUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
}; 