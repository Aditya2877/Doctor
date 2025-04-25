// src/components/DoctorList.jsx
import React from 'react';

const DoctorList = ({ doctors }) => {
  return (
    <div className="doctor-list">
      {doctors.map(doctor => (
        <div key={doctor.id} className="doctor-card">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
          <p>{doctor.consultationType}</p>
          <p>Fees: {doctor.fees}</p>
          <p>Experience: {doctor.experience} years</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
