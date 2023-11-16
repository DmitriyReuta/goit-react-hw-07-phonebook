import React from 'react';

export const ContactList = ({ contacts, onDeleteContact, filter }) => {
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (contactId) => {
    onDeleteContact(contactId);
  };

  return (
    <ul>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button type="button" onClick={() => handleDeleteContact(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};