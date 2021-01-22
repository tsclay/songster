import React from 'react';
import { SearchResults } from './SearchResults';
import { RestMode } from '../RestMode/RestMode';
import { Lyrics } from './Lyrics';
import { ContentAction } from '../../models/interfaces';

import './ContentManager.scss';

// interface Props extends ContentState
interface Props {
  contentState: {
    mode: 'SEARCHING' | 'LYRICS' | 'REST';
    searchTerm: string | null;
    urlToLyrics: string | null;
  };
  contentReducer: React.Dispatch<ContentAction>;
  rememberSongs: React.Dispatch<React.SetStateAction<never[]>>;
  songs: never[];
}

export const ContentManager: React.FC<Props> = (props) => {
  const { contentState, contentReducer, rememberSongs, songs } = props;
  switch (contentState.mode) {
    case 'REST':
      return <RestMode />;
    case 'SEARCHING':
      return (
        <SearchResults
          songs={songs}
          rememberSongs={rememberSongs}
          searchTerm={contentState.searchTerm}
          contentReducer={contentReducer}
        />
      );
    case 'LYRICS':
      return (
        <Lyrics
          prevSearchTerm={contentState.searchTerm}
          url={contentState.urlToLyrics}
          contentReducer={contentReducer}
        />
      );
    default:
      return <RestMode />;
  }
};
