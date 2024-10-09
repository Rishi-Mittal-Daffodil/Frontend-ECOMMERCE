import React from 'react';
import './NotFoundPage.css'; 

function NotFoundPage(){
  return (
    <div className="not-found-container">
      <img
        src="https://tss-static-images.gumlet.io/notfound.png"
        alt="Not Found"
        className="not-found-image"
      />
      <p className="not-found-text">We can't seem to find the page you are looking for.</p>
    </div>
  );
};

export default NotFoundPage;
