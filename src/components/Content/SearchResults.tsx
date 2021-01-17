import React, { useState, useEffect } from 'react';

interface Props {
  searchTerm: string | null;
}

export const SearchResults: React.FC<Props> = (props) => {
  const { searchTerm } = props;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchSongData = async (query: string): Promise<any> => {
        const token =
          'Kk8yGYv93-tGb_--I0iwDhMDP8VAeGrv99MyWjk5KgepAlSGPCjTLbavINlIuyO1';
        const url = `https://api.genius.com/search?access_token=${token}&q=${encodeURIComponent(
          query
        )}`;
        const { response } = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
          },
        }).then((r) => r.json());
        const { hits } = response;
        setSongs(hits);
      };
      fetchSongData(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div>
      <p>This is the search results</p>
      {/* <pre>{JSON.stringify(songs, null, 2)}</pre> */}
      {songs.map((s) => (
        <div></div>
      ))}
    </div>
  );
};
