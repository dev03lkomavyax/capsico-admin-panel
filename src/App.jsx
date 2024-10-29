import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';

const NotFound = lazy(() => import('./pages/NotFound'));
const Order = lazy(() => import('./pages/Order/Order'));
const OrderDetails = lazy(() => import('./pages/Order/OrderDetails'));
const Login = lazy(() => import('./pages/Login'))

function App() {

  return (
    <>
      <Router>
        <Suspense fallback={<div className='w-full h-screen bg-white text-black flex justify-center items-center text-xl font-semibold'>Loading...</div>}>
          <Routes>
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='/admin/order/123' element={<OrderDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
