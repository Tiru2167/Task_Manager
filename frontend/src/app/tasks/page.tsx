'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, fetchTask } from '@/redux/features/taskSlice'; 
import { RootState, AppDispatch } from '@/redux/store'; 
import withReduxProvider from '@/components/withReduxProvider'; 
import { useRouter } from 'next/navigation'; 

const TaskListPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter(); 
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading)
    return <div style={{ textAlign: 'center', fontSize: '18px', color: '#555', marginTop: '20px' }}>Loading...</div>;
  if (error)
    return <div style={{ textAlign: 'center', fontSize: '18px', color: 'red', marginTop: '20px' }}>Error: {error}</div>;

  const handleUpdate = (taskId: string) => {
    
    dispatch(fetchTask(taskId)).then(() => {
      router.push(`/editTask/${taskId}`); 
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#333' }}>Task List</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {tasks.map((task, index) => (
          <li
            key={task._id || index}
            style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#007acc' }}>{task.title}</h2>
            <p style={{ fontSize: '16px', marginBottom: '10px', color: '#555' }}>{task.description || 'No description provided' }</p>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: task.status === 'completed' ? '#28a745' : task.status === 'in-progress' ? '#ffc107' : '#dc3545',
                backgroundColor: task.status === 'completed' ? '#d4edda' : task.status === 'in-progress' ? '#fff3cd' : '#f8d7da',
                padding: '4px 8px',
                borderRadius: '5px',
              }}
            >
              {task.status || 'Pending'}
            </span>
            <button
              onClick={() => handleUpdate(String(task._id))} 
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withReduxProvider(TaskListPage);