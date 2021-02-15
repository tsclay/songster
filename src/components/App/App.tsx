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
        urls: {
          lyrics: null,
          songData: null,
        },
      };
    case 'LYRICS':
      return {
        mode: 'LYRICS',
        searchTerm: null,
        urls: {
          lyrics: action.urls.lyrics,
          songData: action.urls.songData,
        },
      };
    default:
      return {
        mode: 'REST',
        searchTerm: null,
        urls: {
          lyrics: null,
          songData: null,
        },
      };
  }
};

const initialState: ContentState = {
  mode: 'REST',
  searchTerm: null,
  urls: {
    lyrics: null,
    songData: null,
  },
};

export const App: React.FC = () => {
  const searchBarRef = useRef('');
  const [contentConfig, dispatchContentReducer] = useReducer(
    contentReducer,
    initialState
  );
  const [songs, setSongs] = useState([]);

  const handleSearch = (e: React.SyntheticEvent): void => {
    dispatchContentReducer({
      type: 'SEARCHING',
      searchTerm: searchBarRef.current,
      urls: {
        lyrics: null,
        songData: null,
      },
    });
  };

  const renderRestMode = (e: React.SyntheticEvent): void => {
    dispatchContentReducer({
      type: 'REST',
      searchTerm: searchBarRef.current,
      urls: {
        lyrics: null,
        songData: null,
      },
    });
  };

  return (
    <>
      <nav className="Header">
        <h1 className="logo logo-font-clamp" onClick={renderRestMode}>
          Songster
        </h1>
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
