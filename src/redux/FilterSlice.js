import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;