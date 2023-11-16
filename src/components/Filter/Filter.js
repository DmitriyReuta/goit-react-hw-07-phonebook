import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/FilterSlice';

export const Filter = () => {
  const filter = useSelector((state) => state.filter) || '';
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search Contacts"
      value={filter}
      onChange={handleFilterChange}
    />
  );
};