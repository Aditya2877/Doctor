// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { fetchDoctors } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorList";
import Filters from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    mode: "",
    specialties: [],
    sort: ""
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchDoctors().then(data => setDoctors(data));
  }, []);

  useEffect(() => {
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.mode) params.mode = filters.mode;
    if (filters.specialties.length) params.specialties = filters.specialties.join(",");
    if (filters.sort) params.sort = filters.sort;
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const filteredDoctors = doctors
    .filter(doc => !filters.name || doc.name.toLowerCase().includes(filters.name.toLowerCase()))
    .filter(doc => !filters.mode || doc.mode === filters.mode)
    .filter(doc => !filters.specialties.length || filters.specialties.some(s => doc.specialty.includes(s)))
    .sort((a, b) => {
      if (filters.sort === "fees") return a.fees - b.fees;
      if (filters.sort === "experience") return b.experience - a.experience;
      return 0;
    });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <SearchBar doctors={doctors} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div><Filters filters={filters} setFilters={setFilters} /></div>
        <div className="md:col-span-3">
          {filteredDoctors.length === 0 ? (
            <p className="text-gray-600 text-lg" data-testid="no-doctors-message">No doctors found</p>
          ) : (
            filteredDoctors.map(doc => <DoctorCard key={doc.name} doctor={doc} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
