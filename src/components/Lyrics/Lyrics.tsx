import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ContentAction } from '../../models/interfaces';

import './Lyrics.scss';

interface Props {
  url: string | null;
  prevSearchTerm: string | null;
  contentReducer: React.Dispatch<ContentAction>;
}

export const Lyrics: React.FC<Props> = (props) => {
  const { url, contentReducer, prevSearchTerm } = props;
  const [gotLyrics, setGotLyrics] = useState(false);
  // const [songMetadata, setSongMetadata] = useState(null);
  const lyricContent = useRef('');
  const aboutContent = useRef('');
  const theseLyrics = useRef<null | HTMLDivElement>(null);
  const infoDiv = useRef<null | HTMLDivElement>(null);

  // const fetchSongData = useCallback(
  //   async (url: string | null): Promise<any> => {
  //     if (!url) return;
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: {
  //         Accept: 'application/json'
  //       }
  //     });
  //     if (response) {
  //       const data = await response.json();
  //       console.log(data);
  //       setSongMetadata(data);
  //     }
  //   },
  //   []
  // );

  const fetchLyrics = useCallback(async (url: string | null): Promise<any> => {
    if (!url) return;
    // console.log(url);
    // const response = await fetch(`https://songster-cors.herokuapp.com/${url}`, {
    const response = await fetch(`http://0.0.0.0:7000/${url}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
      },
    });
    // console.log(response);
    if (response) {
      const data = await response.text();
      parseHTMLString(data);
      setGotLyrics(true);
    }
  }, []);

  const parseHTMLString = (string: string): void => {
    if (!string) return;
    const template = document.createElement('template');
    template.innerHTML = string;
    const foundLyrics = template.content
      .querySelector('.lyrics')
      ?.textContent?.trimEnd()
      .trimLeft();
    const foundInfo = template.content
      .querySelector('div.rich_text_formatting')
      ?.innerHTML?.trimEnd()
      .trimLeft();
    lyricContent.current = foundLyrics || '';
    aboutContent.current = foundInfo || '';
  };

  const makeMarkup = (htmlString: string): { __html: string } | undefined => {
    return htmlString
      ? {
          __html: htmlString,
        }
      : undefined;
  };

  useEffect(() => {
    fetchLyrics(url);
  }, [url, fetchLyrics]);

  // useEffect(() => {
  //   fetchSongData(null);
  // }, [fetchSongData]);

  return (
    <div className="Lyrics">
      <div className="user-options">
        <button
          className="return-btn"
          type="button"
          onClick={(e) => {
            contentReducer({
              type: 'SEARCHING',
              searchTerm: prevSearchTerm,
              urlToLyrics: null,
            });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
          </svg>
        </button>
        <div>
          <button
            type="button"
            onClick={(e) => {
              infoDiv.current?.classList.toggle('show');
              theseLyrics.current?.classList.toggle('sml-width');
            }}
          >
            info
          </button>
          <button type="button">video</button>
        </div>
      </div>
      {gotLyrics ? (
        <div className="lyrics-body">
          <p>This song</p>
          <div
            ref={theseLyrics}
            className="song-lyrics dynamic-font-size"
            dangerouslySetInnerHTML={makeMarkup(lyricContent.current)}
          ></div>
          <div
            ref={infoDiv}
            className="song-info dynamic-font-size"
            dangerouslySetInnerHTML={makeMarkup(aboutContent.current)}
          ></div>
          {/* <div>{JSON.stringify(songMetadata)}</div> */}
        </div>
      ) : (
        <h2>Waiting...</h2>
      )}
    </div>
  );
};

// testing
