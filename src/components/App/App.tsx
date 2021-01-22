import React, { useReducer, useRef, useState } from 'react';
import './App.scss';
import { SearchBar } from '../Header/SearchBar';
import { ContentManager } from '../ContentManager/ContentManager';
import { ContentAction, ContentState } from '../../models/interfaces';

const contentReducer = (
  state: ContentState,
  action: ContentAction
): ContentState => {
  switch (action.type) {
    case 'SEARCHING':
      return {
        mode: 'SEARCHING',
        searchTerm: action.searchTerm,
        urlToLyrics: null,
      };
    case 'LYRICS':
      return {
        mode: 'LYRICS',
        searchTerm: null,
        urlToLyrics: action.urlToLyrics,
      };
    default:
      return {
        mode: 'REST',
        searchTerm: null,
        urlToLyrics: null,
      };
  }
};

const initialState: ContentState = {
  mode: 'REST',
  searchTerm: null,
  urlToLyrics: null,
};

export const App: React.FC = () => {
  const searchBarRef = useRef('');
  const [contentConfig, dispatchContentReducer] = useReducer(
    contentReducer,
    initialState
  );
  const [songs, setSongs] = useState([]);

  const handleSearch = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    dispatchContentReducer({
      type: 'SEARCHING',
      searchTerm: searchBarRef.current,
      urlToLyrics: null,
    });
  };

  return (
    <>
      <nav className="Header">
        <h1 className="logo logo-font-clamp">Songster</h1>
        <SearchBar inputRef={searchBarRef} handleSearch={handleSearch} />
      </nav>
      <div className="Content">
        <ContentManager
          songs={songs}
          rememberSongs={setSongs}
          contentState={contentConfig}
          contentReducer={dispatchContentReducer}
        />
      </div>
    </>
  );
};
