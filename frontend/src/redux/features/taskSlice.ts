import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Task {
  _id?: string;
  title: string;
  description: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  task: Task | null; // Add this line to store a single task
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: null, // Initialize task as null
  loading: false,
  error: null,
};

// Define the base URL for the API
export const API_URL = 'http://13.60.2.49:4000/tasks';

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
});

// Async thunk to fetch a single task
export const fetchTask = createAsyncThunk('tasks/fetchTask', async (taskId: string) => {
  const response = await fetch(`${API_URL}/${taskId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json(); // Assuming the API returns a single task object
});

// Async thunk to add a new task
export const addTask = createAsyncThunk('/tasks/addTask', async (newTask: Task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  return response.json();
});

// Async thunk to update an existing task
export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask: Omit<Task, 'id'> & { id: string }) => {
  const response = await fetch(`${API_URL}/${updatedTask.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return response.json();
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return taskId; 
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(fetchTask.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state .error = null; // Reset error on new request
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when done
        state.task = action.payload; // Set task to the fetched task
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message || 'Failed to fetch task'; // Set error message
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload; // Keep taskId as a string
        state.tasks = state.tasks.filter(task => task._id !== taskId); // Compare as strings
      });
  },
});

// Export actions and reducer
export default taskSlice.reducer;