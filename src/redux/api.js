export const fetchContactsAPI = async () => {
  try {
    const response = await fetch('https://6556578884b36e3a431f9b89.mockapi.io/contacts');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addContactAPI = async (newContact) => {
  try {
    const existingContacts = await fetch('https://6556578884b36e3a431f9b89.mockapi.io/contacts');
    const existingContactsData = await existingContacts.json();

    if (existingContactsData.some(contact => contact.number === newContact.number)) {
      throw new Error('Contact is already exists');
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
};

export const deleteContactAPI = async (contactId) => {
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
};