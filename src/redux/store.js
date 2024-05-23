import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// configuring the initial redux store for state management
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;