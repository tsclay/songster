import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ContentAction } from '../../models/interfaces';

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
    const response = await fetch(`http://0.0.0.0:8080/${url}`, {
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
    template.innerHTML = string.trim();
    const foundLyrics = template.content.querySelector('.lyrics')?.textContent;
    const foundInfo = template.content.querySelector('div.rich_text_formatting')
      ?.textContent;
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
    <div>
      <button
        onClick={(e) => {
          contentReducer({
            type: 'SEARCHING',
            searchTerm: prevSearchTerm,
            urlToLyrics: null,
          });
        }}
      >
        Return
      </button>
      <p>What up lyrics</p>
      {gotLyrics ? (
        <>
          <div dangerouslySetInnerHTML={makeMarkup(lyricContent.current)}></div>
          <div dangerouslySetInnerHTML={makeMarkup(aboutContent.current)}></div>
        </>
      ) : (
        <h2>Waiting...</h2>
      )}
    </div>
  );
};
