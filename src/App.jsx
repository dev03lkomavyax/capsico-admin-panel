import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';

const NotFound = lazy(() => import('./pages/NotFound'));
const Order = lazy(() => import('./pages/Order/Order'));
const OrderDetails = lazy(() => import('./pages/Order/OrderDetails'));
const Login = lazy(() => import('./pages/Login'))
const Reviews = lazy(() => import('./pages/reviews/Reviews'))
const StatusList = lazy(() => import('./components/order/StatusList'))
const NewOrder = lazy(() => import('./pages/order/NewOrder'))
// const Restaurant = lazy(()=> import('./pages/restaurant/Restaurant'))
const RestaurantList = lazy(() => import('./pages/restaurant/RestaurantList'))
const RestaurantDashborad = lazy(()=> import('./pages/restaurant/RestaurantDashboard'))
// const Dashborad = lazy(() => import('./pages/restaurant/Dashborad'));
const AddMenu = lazy(() => import('./pages/restaurant/AddMenu'));
const Review = lazy(() => import('./pages/restaurant/Reviews'));
const Revenue = lazy(() => import('./pages/revenue/Revenue'));
const CustomerList = lazy(() => import('./pages/customer/CustomerList'));
const CustomerDetails = lazy(() => import('./pages/customer/CustomerDetails'))
const RestaurantEditProfile = lazy(() => import('./pages/restaurant/RestaurantEditProfile'))
const RestaurantMenu = lazy(()=> import('./pages/restaurant/RestaurantMenu'))
const VendorList = lazy(() => import('./pages/vendor/VendorList'))
const VendorDashboard = lazy(() => import('./pages/vendor/VendorDashboard'))
const VendorReviews = lazy(() => import('./pages/vendor/VendorReviews'))
const VendorRevenue = lazy(() => import('./pages/vendor/VendorRevenue'))
const VendorEditProfile = lazy(() => import('./pages/vendor/VendorEditProfile'))
const VendorProducts = lazy(()=> import('./pages/vendor/VendorProducts'))
const DeliveryAgent = lazy(() => import('./pages/delivery-agent/DeliveryAgent'))
const DeliveryAgentDetails = lazy(() => import('./pages/delivery-agent/DeliveryAgentDetails'))
const DeliveryAgentProfileEdit = lazy(() => import('./pages/delivery-agent/DeliveryAgentProfileEdit'))
const AvailableBalanceDetails = lazy(() => import('./pages/delivery-agent/AvailableBalanceDetails'))
const ReviewsDetails = lazy(() => import('./pages/reviews/ReviewsDetails'))
const SubAdminList = lazy(()=>import('./pages/admin/SubAdminList'))
const AddSubAdmin = lazy(() => import('./pages/admin/AddSubAdmin'))
const EditSubAdmin = lazy(()=> import('./pages/admin/EditSubAdmin'))
const AdminDashBoard = lazy(() => import('./pages/admin/AdminDashBoard'))
const SalesReport = lazy(()=> import('./pages/admin/SalesReport'))
const UpdateAdminProfile = lazy(() => import('./pages/admin/UpdateAdminProfile'))
const Offers = lazy(()=> import('./pages/offers/Offers'))
const CreateOfferPage = lazy(()=> import('./pages/offers/CreateOfferPage'))
const ApplicationRequest = lazy(()=>import('./pages/application-request/ApplicationRequest'))
const AddRestaurant = lazy(()=> import('./pages/application-request/AddRestaurant'))

function App() {

  return (
    <>
      <Router>
        <Suspense fallback={<div className='w-full h-screen bg-white text-black flex justify-center items-center text-xl font-semibold'>Loading...</div>}>
          <Routes>
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='/admin/order/status' element={<StatusList />} />
            <Route path='/admin/order/new-order' element={<NewOrder />} />
            <Route path='/admin/order/:orderId' element={<OrderDetails />} />
            <Route path='/admin/reviews' element={<Reviews />} />
            <Route path='/admin/reviews/:reviewId' element={<ReviewsDetails />} />
            <Route path='/admin/restaurant-list' element={<RestaurantList />} />
            <Route path='/admin/restaurant/dashboard' element={<RestaurantDashborad />} />
            <Route path='/admin/restaurant/edit-profile' element={<RestaurantEditProfile />} />
            <Route path='/admin/restaurant/addmenu' element={<AddMenu />} />
            <Route path='/admin/restaurant/reviews' element={<Review />} />
            <Route path='/admin/restaurant/revenue' element={<Revenue />} />
            <Route path='/admin/restaurant/menu' element={<RestaurantMenu />} />
            <Route path='/admin/customer-list' element={<CustomerList />} />
            <Route path='/admin/customer/123' element={<CustomerDetails />} />
            <Route path='/admin/vendor-list' element={<VendorList />} />
            <Route path='/admin/vendor/dashboard' element={<VendorDashboard />} />
            <Route path='/admin/vendor/reviews' element={<VendorReviews />} />
            <Route path='/admin/vendor/revenue' element={<VendorRevenue />} />
            <Route path='/admin/vendor/edit-profile' element={<VendorEditProfile />} />
            <Route path='/admin/vendor/products' element={<VendorProducts />} />
            <Route path='/admin/delivery-agent' element={<DeliveryAgent />} />
            <Route path='/admin/delivery-agent/:deliveryAgentId' element={<DeliveryAgentDetails />} />
            <Route path='/admin/delivery-agent/:deliveryAgentId/edit-profile' element={<DeliveryAgentProfileEdit />} />
            <Route path='/admin/delivery-agent/:deliveryAgentId/available-balance' element={<AvailableBalanceDetails />} />
            <Route path='/admin/sub-admin-list' element={<SubAdminList />} />
            <Route path='/admin/add-subadmin' element={<AddSubAdmin />} />
            <Route path='/admin/edit-subadmin' element={<EditSubAdmin />} />
            <Route path='/admin/admin-dashboard' element={<AdminDashBoard />} />
            <Route path='/admin/sales' element={<SalesReport />} />
            <Route path='/admin/update-admin-profile' element={<UpdateAdminProfile />} />
            <Route path='/admin/offers' element={<Offers />} />
            <Route path='/admin/offers/create-offer' element={<CreateOfferPage />} />
            <Route path='/admin/application-request-list' element={<ApplicationRequest />} />
            <Route path='/admin/application-request/add-restaurant' element={<AddRestaurant />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
