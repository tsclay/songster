import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SongData, LyricsProps, YouTubeLink } from '../../models/interfaces';

import './Lyrics.scss';

const findYouTubeLink = (dataObj: any[]): YouTubeLink | undefined => {
  let videoLink: YouTubeLink;
  for (let i = dataObj.length - 1; i >= 0; i--) {
    if (
      dataObj[i].hasOwnProperty('provider') &&
      dataObj[i].provider === 'youtube'
    ) {
      videoLink = dataObj[i];
      videoLink.url = videoLink.url.replace('watch?v=', 'embed/');
      videoLink.url = videoLink.url.replace('http', 'https');
      return videoLink;
    }
  }
  return undefined;
};

const styleSongStructure = (text: string | undefined): string | undefined => {
  if (!text) return;
  let resultText = '';
  console.log('input', text);
  const regEx = new RegExp(/\[.+/, 'g');
  const allMatches: string[] = [...new Set(text.match(regEx)).values()];
  if (allMatches.length === 0) {
    return text;
  }
  console.log(allMatches);
  for (let i = 0; i < allMatches.length; i++) {
    if (i === 0) {
      resultText = text.replaceAll(
        allMatches[i],
        `<span class="song-structure">${allMatches[i]}</span>`
      );
    } else {
      resultText = resultText.replaceAll(
        allMatches[i],
        `<span class="song-structure">${allMatches[i]}</span>`
      );
    }
  }
  console.log(resultText);
  return resultText;
};

export const Lyrics: React.FC<LyricsProps> = (props) => {
  const { url, contentReducer, prevSearchTerm, apiPath } = props;
  const [gotLyrics, setGotLyrics] = useState(false);
  const [songMetadata, setSongMetadata] = useState<SongData | null>(null);
  const [video, setVideo] = useState<YouTubeLink | null>(null);
  const lyricContent = useRef('');
  const aboutContent = useRef('');
  const thisVideo = useRef<null | HTMLDivElement>(null);
  const theseLyrics = useRef<null | HTMLDivElement>(null);
  const infoDiv = useRef<null | HTMLDivElement>(null);

  const fetchSongData = useCallback(async (url: string | null): Promise<
    SongData | undefined
  > => {
    if (!url) return;
    const token =
      'Kk8yGYv93-tGb_--I0iwDhMDP8VAeGrv99MyWjk5KgepAlSGPCjTLbavINlIuyO1';
    const fullPath = `https://api.genius.com${url}/?access_token=${token}`;
    const response = await fetch(fullPath, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
      },
    });
    if (response) {
      const data = await response.json();
      console.log(data);
      const foundVideo = findYouTubeLink(data.response.song.media);
      if (foundVideo) setVideo(foundVideo);
      setSongMetadata(data);
    }
  }, []);

  const fetchLyrics = useCallback(async (url: string | null): Promise<any> => {
    if (!url) return;
    // console.log(url);
    const response = await fetch(`https://songster-cors.herokuapp.com/${url}`, {
      // const response = await fetch(`http://0.0.0.0:7000/${url}`, {
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
    let foundLyrics = template.content
      .querySelector('.lyrics')
      ?.textContent?.trimEnd()
      .trimLeft();
    foundLyrics = styleSongStructure(foundLyrics);
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

  useEffect(() => {
    fetchSongData(apiPath);
  }, [fetchSongData, apiPath]);

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
              urls: {
                lyrics: null,
                songData: null,
              },
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
          <button
            type="button"
            onClick={(e) => {
              thisVideo.current?.classList.toggle('show');
            }}
          >
            video
          </button>
        </div>
      </div>
      {gotLyrics && songMetadata ? (
        <div className="lyrics-body">
          <p className="song-title dynamic-font-size">
            {songMetadata?.response.song.full_title}
          </p>
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
          <div ref={thisVideo} className="song-video">
            {video ? (
              <iframe
                title={songMetadata?.response.song.full_title}
                src={video.url}
                referrerPolicy="no-referrer"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            ) : (
              <div className="no-video-msg">
                <p className="emoji">😐</p>
                <p className="msg">
                  Looks like this song does not have a video linked to it, but
                  you may find it on YouTube!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h2>Waiting...</h2>
      )}
    </div>
  );
};
