import { lazy, Suspense, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { Button } from './components/ui/button';

const NotFound = lazy(() => import('./pages/NotFound'));

function App() {

  return (
    <>
    <Router>
      <Suspense fallback={<div className='w-full h-screen bg-white text-black flex justify-center items-center text-xl font-semibold'>Loading...</div>}>
        <Routes>
          {/* <Route path='/restaurant/reporting' element={<Reporting />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
    </>
  )
}

export default App
