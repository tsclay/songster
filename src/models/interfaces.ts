export interface ContentAction {
  type: string;
  searchTerm: string | null;
  urlToLyrics: string | null;
}

export interface ContentState {
  mode: 'SEARCHING' | 'LYRICS' | 'REST';
  searchTerm: string | null;
  urlToLyrics: string | null;
}
