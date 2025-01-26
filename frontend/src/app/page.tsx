'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { API_URL } from '@/redux/features/taskSlice';

const HomePage = () => {
  const [taskCount, setTaskCount] = useState<number>(0);

  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        const response = await fetch(`${API_URL}/count`);
        if (response.ok) {
          const data = await response.json();
          setTaskCount(data.count);
        } else {
          console.error('Failed to fetch task count');
        }
      } catch (error) {
        console.error('Error fetching task count:', error);
      }
    };
    fetchTaskCount();
  }, []);

  const getGreeting = () => {
    const hours = new Date().getHours();
    return hours < 12 ? 'Good Morning!' : hours < 18 ? 'Good Afternoon!' : 'Good Evening!';
  };

  return (
    <Provider store={store}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f8f9fa',
          color: '#333',
        }}
      >
        {/* Header */}
        <header
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Task Manager</h1>
          <nav>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                gap: '1.5rem',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link
                  href="/tasks"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Task Details Page ({taskCount})
                </Link>
              </li>
              <li>
                <Link
                  href="/newtask"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  New Task Page
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            {getGreeting()}
          </h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            Welcome to Task Manager! Manage your tasks efficiently and stay on
            top of your goals.
          </p>
        </main>

        {/* Footer */}
        <footer
          style={{
            position: 'fixed',
            right: '0',
            bottom: '0',
            backgroundColor: '#343a40',
            color: 'white',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            borderTopLeftRadius: '10px',
          }}
        >
          <p style={{ margin: 0 }}>
            &copy; 2025 Task Manager. All rights reserved.
          </p>
        </footer>
      </div>
    </Provider>
  );
};

export default HomePage;
