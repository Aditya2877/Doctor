// src/App.jsx
import React, { useState, useEffect } from 'react';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import axios from 'axios';

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    consultationType: '',
    specialization: '',
    minFees: 0,
    maxFees: 10000
  });

  useEffect(() => {
    axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const applyFilters = () => {
    return doctors.filter(doctor => {
      return (
        (filters.consultationType ? doctor.consultationType === filters.consultationType : true) &&
        (filters.specialization ? doctor.specialization.toLowerCase().includes(filters.specialization.toLowerCase()) : true) &&
        (doctor.fees >= filters.minFees && doctor.fees <= filters.maxFees)
      );
    });
  };

  return (
    <div className="App">
      <FilterPanel filters={filters} setFilters={setFilters} />
      <DoctorList doctors={applyFilters()} />
    </div>
  );
};

export default App;
