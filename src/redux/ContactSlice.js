import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
  },
  reducers: {
    addContact: (state, action) => {
      const { name, number } = action.payload;

      const isDuplicate = state.contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase() && contact.number === number
      );

      if (!isDuplicate) {
        state.contacts.push({ id: nanoid(), name, number });
      } else {
        alert('Contact already exists.');
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;