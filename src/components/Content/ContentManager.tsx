import React from 'react';
import { SearchResults } from './SearchResults';
import { RestMode } from '../RestMode/RestMode';
import Lyrics from './Lyrics';

// interface Props extends ContentState
interface Props {
  contentState: {
    index: number;
    mode: 'SEARCHING' | 'LYRICS' | 'REST';
    searchTerm: string | null;
  };
}

export const ContentManager: React.FC<Props> = (props) => {
  const { contentState } = props;
  switch (contentState.mode) {
    case 'REST':
      return <RestMode />;
    case 'SEARCHING':
      return <SearchResults searchTerm={contentState.searchTerm} />;
    case 'LYRICS':
      return <Lyrics />;
    default:
      return <RestMode />;
  }
};
