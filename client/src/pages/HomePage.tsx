import React, { useContext } from 'react';
import { myContext } from './Context';

const HomePage = () => {
  const ctx = useContext(myContext)


  return <div>
    <h1>Home Page</h1>
  </div>;
};

export default HomePage;
