import { createSlice } from '@reduxjs/toolkit';

// using redux slices to make a counter with an initial value of 0 and using redux reducers to have a switch case of increminting
// decrementing and incrementing by a set amount
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;