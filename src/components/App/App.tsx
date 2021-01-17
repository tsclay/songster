import React, { useReducer, useRef } from 'react';
import './App.css';
import { SearchBar } from '../Header/SearchBar';
import { ContentManager } from '../Content/ContentManager';

interface ContentAction {
  type: string;
  searchTerm: string | null;
}

interface ContentState {
  index: number;
  mode: 'SEARCHING' | 'LYRICS' | 'REST';
  searchTerm: string | null;
}

const contentReducer = (
  state: ContentState,
  action: ContentAction
): ContentState => {
  switch (action.type) {
    case 'SEARCHING':
      return {
        index: 1,
        mode: 'SEARCHING',
        searchTerm: action.searchTerm,
      };
    case 'LYRICS':
      return {
        index: 2,
        mode: 'LYRICS',
        searchTerm: null,
      };
    default:
      return {
        index: 0,
        mode: 'REST',
        searchTerm: null,
      };
  }
};

const initialState: ContentState = {
  index: 0,
  mode: 'REST',
  searchTerm: null,
};

export const App: React.FC = () => {
  const searchBarRef = useRef('');
  const [contentConfig, dispatch] = useReducer(contentReducer, initialState);

  const handleSearch = (): void => {
    dispatch({ type: 'SEARCHING', searchTerm: searchBarRef.current });
    // alert(searchBarRef.current);
  };

  return (
    <div className="App">
      <nav className="Header">
        <h1>Songster</h1>
        <SearchBar inputRef={searchBarRef} handleSearch={handleSearch} />
      </nav>
      <div className="Content">
        <ContentManager contentState={contentConfig} />
      </div>
    </div>
  );
};
