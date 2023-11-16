
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../redux/ContactSlice';
import { setFilter, selectFilter } from '../redux/FilterSlice';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';

export function App() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector(selectFilter) || ''; 
  const dispatch = useDispatch();

  const generateUniqueId = () => {
    return nanoid();
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm generateUniqueId={generateUniqueId} /> 

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={(value) => dispatch(setFilter(value))} />
      <ContactList contacts={contacts} onDeleteContact={(contactId) => dispatch(deleteContact(contactId))} filter={filter} />
    </div>
  );
}