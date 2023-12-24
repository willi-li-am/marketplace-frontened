// Layout.js
import React from 'react';
import Navbar from './navbar/navbarFrame';
import { isPropertySignature } from 'typescript';
import { BeatLoader } from 'react-spinners';


const Layout = ({ children, loading, isLoggedIn, lastVisit, locked }:any) => {
  return (
    <div className="flex flex-col items-center bg-slate-200 overflow-auto min-h-[100vh] w-full">
      <Navbar loading={loading} locked={locked} isLoggedIn={isLoggedIn} lastVisit={lastVisit} />
      {loading? <div className='h-[100vh] w-[100vw] absolute flex items-center justify-center'>
        <div className='h-[100vh] w-[100vw] absolute bg-black opacity-80'></div>
        <BeatLoader color="white" size="70px"></BeatLoader>
      </div> : <>{children}</>}
    </div>
  );
};

export default Layout;