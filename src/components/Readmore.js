
import React, { useState } from 'react';

const ReadMore = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      {isTruncated ? (
        <div>
          {`${text.slice(0, maxLength)}...`}
          <button className="read-more-button" onClick={toggleTruncate}>Read More</button>
        </div>
      ) : (
        <div>
          {text}
          <button className="read-less-button" onClick={toggleTruncate}>See Less</button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;