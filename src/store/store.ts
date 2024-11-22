import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
// import yourReducer from './yourReducer';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // yourReducer: yourReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 