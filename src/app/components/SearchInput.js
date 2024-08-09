import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre del banco..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
