import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ doctors }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (input) {
      const matches = doctors.filter(doc => doc.name.toLowerCase().includes(input.toLowerCase())).slice(0, 3);
      setSuggestions(matches);
    } else setSuggestions([]);
  }, [input, doctors]);

  const handleSelect = name => {
    navigate(`/?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="relative">
      <input
        className="w-full p-2 rounded"
        type="text"
        placeholder="Search Doctors"
        data-testid="autocomplete-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSelect(input); }}
      />
      <div className="absolute bg-white w-full z-10 shadow">
        {suggestions.map((doc, idx) => (
          <div
            key={idx}
            className="p-2 cursor-pointer hover:bg-gray-200"
            data-testid="suggestion-item"
            onClick={() => handleSelect(doc.name)}>
            {doc.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;