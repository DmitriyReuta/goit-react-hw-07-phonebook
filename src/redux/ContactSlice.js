import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await fetch('https://6556578884b36e3a431f9b89.mockapi.io/contacts');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
  try {
    // Перевірка на унікальність імені
    const existingContacts = await fetch('https://6556578884b36e3a431f9b89.mockapi.io/contacts');
    const existingContactsData = await existingContacts.json();

    if (existingContactsData.some(contact => contact.name === newContact.name)) {
      throw new Error('Contact with this name already exists');
    }

    const response = await fetch('https://6556578884b36e3a431f9b89.mockapi.io/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    });

    if (!response.ok) {
      throw new Error('Failed to add contact');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    const response = await fetch(`https://6556578884b36e3a431f9b89.mockapi.io/contacts/${contactId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    return contactId;
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