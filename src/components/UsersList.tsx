import React, { useState } from 'react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, User } from '../hooks/useUsers';

const UsersList: React.FC = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  
  // Query hooks
  const { data: users, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate({
      name: newUserName,
      email: newUserEmail,
    });
    setNewUserName('');
    setNewUserEmail('');
  };
  
  // Handle user update
  const handleUpdate = (user: User) => {
    updateUserMutation.mutate(user);
  };
  
  // Handle user deletion
  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  
  return (
    <div>
      <h2>Users</h2>
      
      {/* Add user form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? 'Adding...' : 'Add User'}
        </button>
      </form>
      
      {/* Users list */}
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleUpdate({ ...user, name: `${user.name} (updated)` })}>
              Update
            </button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList; 