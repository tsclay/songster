import React, { useRef, useEffect } from 'react';

import './SearchBar.scss';

interface Props {
  inputRef: React.MutableRefObject<string>;
  handleSearch: (e: React.SyntheticEvent) => void;
}

export const SearchBar: React.FC<Props> = (props) => {
  const { inputRef, handleSearch } = props;
  const underline = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  });
  return (
    <div className="SearchBar">
      <input
        ref={inputElement}
        onFocus={() => {
          if (underline && underline.current) {
            underline.current.className = 'input-underline focused';
          }
        }}
        onBlur={() => {
          if (underline && underline.current) {
            underline.current.className = 'input-underline';
          }
        }}
        form="search-genius"
        onChange={(e) => {
          inputRef.current = e.target.value;
        }}
        type="text"
      />
      <div ref={underline} className="input-underline"></div>
      <button form="search-genius" type="button">
        🔎
      </button>
      <form
        id="search-genius"
        onSubmit={(e) => {
          handleSearch(e);
        }}
      ></form>
    </div>
  );
};
