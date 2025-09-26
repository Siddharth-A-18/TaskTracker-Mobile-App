import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTasks, insertTask, updateTask as updateTaskDB, deleteTask as deleteTaskDB } from '../components/SqliteFunctions';

// Async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await getAllTasks();
  return tasks || [];
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  // Expect task object with title, description, updatedAt
  await insertTask(task);
  // After insertion, fetch fresh list
  const tasks = await getAllTasks();
  return tasks || [];
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  // Expect task with id, title, description, updatedAt
  await updateTaskDB(task.id, task);
  const tasks = await getAllTasks();
  return tasks || [];
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await deleteTaskDB(id);
  const tasks = await getAllTasks();
  return tasks || [];
});

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export default taskSlice.reducer;
