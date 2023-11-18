import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContactsAPI, addContactAPI, deleteContactAPI } from './api';
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    return await fetchContactsAPI();
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
  try {
    return await addContactAPI(newContact);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    return await deleteContactAPI(contactId);
  } catch (error) {
    throw new Error(error.message);
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
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
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;