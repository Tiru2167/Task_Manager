'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter,useParams } from 'next/navigation';
import { updateTask, deleteTask } from '@/redux/features/taskSlice'; 
import { AppDispatch } from '@/redux/store';
import withReduxProvider from '@/components/withReduxProvider';

const EditTaskPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const params = useParams(); // useParams now returns a promise-like object

  const taskId:any = params ? params._id : null;

  // Get tasks from the Redux store
  const {tasks} = useSelector((state: any) => state.tasks || []);
  const task = Array.isArray(tasks)
    ? tasks.find((task: any) => task._id === taskId) 
    : null;

  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
    } else {
      setError('Task not found'); 
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateTask({ id: taskId, title, description, status }))
      .then(() => {
        setSuccessMessage('Task updated successfully!');
        setLoading(false);
        router.push('/tasks'); 
      })
      .catch((err) => {
        setError('Failed to update task.');
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId)) 
        .then(() => {
          setSuccessMessage('Task deleted successfully!');
          setTimeout(() => {
            router.push('/tasks'); 
          }, 2000);
        })
        .catch((err) => {
          setError('Failed to delete task.');
        });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0 , 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#333' }}>Edit Task</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px', fontWeight: 'bold' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Task'}
        </button>
      </form>
      <button
        onClick={handleDelete}
        style={{
          padding: '10px 15px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '15px',
          transition: 'background-color 0.2s',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Delete Task
      </button>
    </div>
  );
};


export default withReduxProvider(EditTaskPage);