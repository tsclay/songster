import React, { useEffect, useCallback } from 'react';
import { ContentAction } from '../../models/interfaces';

import './SearchResults.scss';

interface Props {
  searchTerm: string | null;
  contentReducer: React.Dispatch<ContentAction>;
  rememberSongs: React.Dispatch<React.SetStateAction<never[]>>;
  songs: never[];
}

// This component only needs the setSongs hook, not songs

export const SearchResults: React.FC<Props> = (props) => {
  const { searchTerm, contentReducer, rememberSongs, songs } = props;
  // const [songs, setSongs] = useState([]);

  const callDispatchOp = (e: React.SyntheticEvent) => {
    if (!(e.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    console.log(e.currentTarget.dataset.url);
    contentReducer({
      type: 'LYRICS',
      searchTerm: null,
      urls: {
        lyrics: e.currentTarget.dataset.url!,
        songData: e.currentTarget.dataset.apiPath!
      }
    });
  };

  const fetchGenius = useCallback(
    async (query: string): Promise<any> => {
      const token =
        'Kk8yGYv93-tGb_--I0iwDhMDP8VAeGrv99MyWjk5KgepAlSGPCjTLbavINlIuyO1';
      const url = `https://api.genius.com/search?access_token=${token}&q=${encodeURIComponent(
        query
      )}`;
      const { response } = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json'
        }
      }).then((r) => r.json());
      const { hits } = response;
      console.log(hits);
      rememberSongs(hits);
    },
    [rememberSongs]
  );

  useEffect(() => {
    if (searchTerm) {
      console.log('running fetchGenius');
      fetchGenius(searchTerm);
    }
  }, [searchTerm, rememberSongs, fetchGenius]);

  return (
    <div className="SearchResults">
      {songs.length > 0 ? (
        songs.map((s: any) => (
          <div
            className="genius-result"
            key={s.result.id}
            data-url={s.result.url}
            data-api-path={s.result.api_path}
            onClick={callDispatchOp}
          >
            <img
              src={s.result.header_image_thumbnail_url}
              alt={s.result.title_with_featured}
            />
            <h3>{s.result.title_with_featured}</h3>
            <p>{s.result.primary_artist.name}</p>
          </div>
        ))
      ) : (
        <h1>Waiting...</h1>
      )}
    </div>
  );
};

/*
response = await fetch('https://api.genius.com/songs/4601887?access_token=Kk8yGYv93-tGb_--I0iwDhMDP8VAeGrv99MyWjk5KgepAlSGPCjTLbavINlIuyO1', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json'
      }
    }).then(r => r.json());
    */
