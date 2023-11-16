import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/ContactSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string().required('Phone number is required'),
});

export const ContactForm = ({ generateUniqueId }) => { 
  const dispatch = useDispatch();

  const handleAddContact = (values, { resetForm }) => {
    const { name, number } = values;
    const newContact = { id: generateUniqueId(), name, number };
    
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleAddContact}
    >
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <ErrorMessage name="name" />
        <Field type="text" name="number" placeholder="Phone Number" />
        <ErrorMessage name="number" />
        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
};