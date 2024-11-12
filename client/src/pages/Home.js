import React from 'react';
import FrontImg from "../assest/Front.jpg";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <img
        src={FrontImg}
        alt="Front"
        className="w-full"
        style={{ height: 'calc(100vh - 4rem)', objectFit: 'cover' }} // 4rem is the equivalent of h-16
      />
    </div>
  );
}

export default Home;
