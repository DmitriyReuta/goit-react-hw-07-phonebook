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

export const addContact = createAsyncThunk('contacts/addContact', async (newContact, { getState }) => {
  try {
    const state = getState();
     const isDuplicate = state.contacts.items.some(
  (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase() && contact.number === newContact.number
);

      if (!isDuplicate) {
        state.contacts.push({ id: nanoid(), name, number });
      } else {
        alert('Contact already exists.');
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
      .addCase(addContact.fulfilled, (state, action) => {
  state.items.push(newContact);
})
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
  state.error = action.error.message || 'Не вдалося додати контакт';
})
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
  state.error = action.error.message || 'Не вдалося видалити контакт';
});
  },
});

export default contactsSlice.reducer;