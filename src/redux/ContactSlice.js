import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch('https://6556578884b36e3a431f9b89.mockapi.io/contacts');
  return response.json();
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {

      state.items = state.items.filter((contact) => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;