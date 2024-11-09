import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';

const NotFound = lazy(() => import('./pages/NotFound'));
const Order = lazy(() => import('./pages/Order/Order'));
const OrderDetails = lazy(() => import('./pages/Order/OrderDetails'));
const Login = lazy(() => import('./pages/Login'))
const Reviews = lazy(() => import('./pages/Reviews'))
const StatusList = lazy(() => import('./components/order/StatusList'))
const Customer = lazy(()=> import('./pages/customer/Customer'))
// const Restaurant = lazy(()=> import('./pages/restaurant/Restaurant'))
const RestaurantList = lazy(()=> import('./pages/restaurant/RestaurantList'))
const Dashborad = lazy(() => import('./pages/restaurant/Dashborad'));
const AddMenu = lazy(() => import('./pages/restaurant/AddMenu'));
const Review = lazy(() => import('./pages/restaurant/Reviews'));
const Revenue = lazy(() => import('./pages/revenue/Revenue'));
const CustomerDetails = lazy(() => import('./pages/customer/CustomerDetails'))

function App() {

  return (
    <>
      <Router>
        <Suspense fallback={<div className='w-full h-screen bg-white text-black flex justify-center items-center text-xl font-semibold'>Loading...</div>}>
          <Routes>
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='/admin/order/status' element={<StatusList />} />
            <Route path='/admin/order/123' element={<OrderDetails />} />
            <Route path='/admin/customer' element={<Customer />} />
            <Route path='/admin/reviews' element={<Reviews />} />
            <Route path='/admin/restaurant/dashboard' element={<Dashborad />} />
            <Route path='/admin/restaurant-list' element={<RestaurantList />} />
            <Route path='/admin/restaurant/addmenu' element={<AddMenu />} />
            <Route path='/admin/restaurant/reviews' element={<Review />} />
            <Route path='/admin/revenue' element={<Revenue />} />
            <Route path='/admin/customer/123' element={<CustomerDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
