import React, { useRef } from 'react';

export default function SearchBar(): JSX.Element {
  const ref = useRef('');

  const handleSearch = (): void => {
    alert(ref.current);
  };

  return (
    <div>
      <input
        onChange={(e) => {
          ref.current = e.target.value;
        }}
        type="text"
      />
      <button type="button" onClick={handleSearch}>
        🔎
      </button>
    </div>
  );
}
