export interface ContentAction {
  type: string;
  searchTerm: string | null;
  urls: {
    lyrics: string | null;
    songData: string | null;
  };
}

export interface ContentState {
  mode: 'SEARCHING' | 'LYRICS' | 'REST';
  searchTerm: string | null;
  urls: {
    lyrics: string | null;
    songData: string | null;
  };
}

export interface SongData {
  meta: {
    status: number;
  };
  response: {
    song: {
      [propName: string]: any;
    };
  };
}

export interface LyricsProps {
  url: string | null;
  apiPath: string | null;
  prevSearchTerm: string | null;
  contentReducer: React.Dispatch<ContentAction>;
}
