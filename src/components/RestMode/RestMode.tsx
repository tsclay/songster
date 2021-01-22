import React from 'react';

import './RestMode.scss';

export const RestMode: React.FC = () => {
  return (
    <div className="RestMode">
      <div className="ctr-blurb">
        <h1>
          Welcome to <h1 className="logo small">Songster</h1>
        </h1>
        <p>
          Get started by searching for your favorite album, artist, or song!
        </p>
      </div>
    </div>
  );
};
