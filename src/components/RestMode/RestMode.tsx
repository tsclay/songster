import React from 'react';

import './RestMode.scss';

export const RestMode: React.FC = () => {
  return (
    <div className="RestMode">
      <div className="ctr-blurb">
        <h1>
          Welcome to <span className="logo small">Songster</span>
        </h1>
        <p>
          Get started by searching for your favorite album, artist, or song!
        </p>
        <p>
          Note: Some songs' videos won't play in this app due to copyright
          reasons. Simply click "Watch on YouTube" to watch the video on
          YouTube.
        </p>
      </div>
    </div>
  );
};
