import React from 'react';
import { IoCloseSharp } from "react-icons/io5";

function Option({ value, onChange, onRemove }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
      <IoCloseSharp className='iconx' type="button" onClick={onRemove} />
    </div>
  );
}

export default Option;
