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
