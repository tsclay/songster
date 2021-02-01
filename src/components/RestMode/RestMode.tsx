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
      </div>
    </div>
  );
};
