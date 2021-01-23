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
  const lyricContent = useRef('');
  const aboutContent = useRef('');
  const fetchLyrics = useCallback(async (url: string | null): Promise<any> => {
    if (!url) return;
    // console.log(url);
    const response = await fetch(`https://songster-cors.herokuapp.com/${url}`, {
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
      ?.textContent?.trimEnd()
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

  return (
    <div className="Lyrics">
      <button
        className="return-btn"
        onClick={(e) => {
          contentReducer({
            type: 'SEARCHING',
            searchTerm: prevSearchTerm,
            urlToLyrics: null,
          });
        }}
      >
        ⬅
      </button>
      <p>What up lyrics</p>
      {gotLyrics ? (
        <>
          <div
            className="song-lyrics"
            dangerouslySetInnerHTML={makeMarkup(lyricContent.current)}
          ></div>
          <div
            className="song-about"
            dangerouslySetInnerHTML={makeMarkup(aboutContent.current)}
          ></div>
        </>
      ) : (
        <h2>Waiting...</h2>
      )}
    </div>
  );
};

// testing