// src/components/FilterPanel.jsx
import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="filter-panel">
      <h2>Filters</h2>
      <label>
        Consultation Type:
        <select
          name="consultationType"
          value={filters.consultationType}
          onChange={handleFilterChange}
        >
          <option value="In-Person">In-Person</option>
          <option value="Online">Online</option>
        </select>
      </label>
      <label>
        Specialization:
        <input
          type="text"
          name="specialization"
          value={filters.specialization}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Fees (Min):
        <input
          type="number"
          name="minFees"
          value={filters.minFees}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Fees (Max):
        <input
          type="number"
          name="maxFees"
          value={filters.maxFees}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};

export default FilterPanel;
