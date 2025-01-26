'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';  
import { addTask } from '@/redux/features/taskSlice'; 
import { AppDispatch } from '@/redux/store'; 
import withReduxProvider from '@/components/withReduxProvider'; 

const NewTaskPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter(); // Initialize router for navigation
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title) {
      setError('Title is required');
      return;
    }
    if (!description) {
      setError('Description should not be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await dispatch(addTask({ title, description, status }));
      setTitle('');
      setDescription('');
      setStatus('pending');
      setSuccessMessage('Task created successfully!');  
      setTimeout(() => {
        router.push('/tasks');  
      }, 2000);
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#333' }}>Create New Task</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</div>} 

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="title" style={{ marginBottom: '8px' }}>Task Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          style={{ padding: '10px', marginBottom: '12px', borderRadius: '5px', border: '1px solid #ddd' }}
        />

        <label htmlFor="description" style={{ marginBottom: '8px' }}>Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={4}
          style={{ padding: '10px', marginBottom: '12px', borderRadius: '5px', border: '1px solid #ddd' }}
        />

        <label htmlFor="status" style={{ marginBottom: '8px' }}>Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: '10px', marginBottom: '12px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007acc',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '20px',
          }}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default withReduxProvider(NewTaskPage);