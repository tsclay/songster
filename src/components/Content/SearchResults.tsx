import React, { useState } from 'react';

export default function SearchResults(): JSX.Element {
  const [count, setCount] = useState(4);

  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <p>This is the search results</p>
      <p>Heres some state {count}</p>
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  );
}
