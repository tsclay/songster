import React from 'react';

interface Props {
  inputRef: React.MutableRefObject<string>;
  handleSearch: () => void;
}

export const SearchBar: React.FC<Props> = (props) => {
  const { inputRef, handleSearch } = props;
  return (
    <div>
      <input
        onChange={(e) => {
          inputRef.current = e.target.value;
        }}
        type="text"
      />
      <button type="button" onClick={handleSearch}>
        🔎
      </button>
    </div>
  );
};
