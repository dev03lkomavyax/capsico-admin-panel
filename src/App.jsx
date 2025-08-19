import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Fallback from "./components/Fallback";
import BackdropLoader from "./components/loader/BackdropLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import useGetApiReq from "./hooks/useGetApiReq";
import usePostApiReq from "./hooks/usePostApiReq";
import { readCookie } from "./utils/readCookie";
import RecentOrders from "./pages/restaurant/RecentOrders";
import Cookies from "js-cookie";
import { initFirebaseNotifications } from "./utils/firebaseNotifications";


const NotFound = lazy(() => import("./pages/NotFound"));
const DeliveryCharges = lazy(() => import("./pages/delivery-charges/DeliveryCharges"));
const AddDeliveryChargeForm = lazy(() =>
  import("./pages/delivery-charges/AddDeliveryChargeForm")
);
const Order = lazy(() => import("./pages/order/Order"));
const OrderDetails = lazy(() => import("./pages/order/OrderDetails"));
const Login = lazy(() => import("./pages/Login"));
const Reviews = lazy(() => import("./pages/reviews/Reviews"));
const StatusList = lazy(() => import("./components/order/StatusList"));
const NewOrder = lazy(() => import("./pages/order/NewOrder"));
// const Restaurant = lazy(()=> import('./pages/restaurant/Restaurant'))
const RestaurantList = lazy(() => import("./pages/restaurant/RestaurantList"));
const RestaurantDashborad = lazy(() =>
  import("./pages/restaurant/RestaurantDashboard")
);
// const Dashborad = lazy(() => import('./pages/restaurant/Dashborad'));
const AddMenu = lazy(() => import('./pages/restaurant/menu/AddMenu'));
const Review = lazy(() => import('./pages/restaurant/Reviews'));
const Revenue = lazy(() => import('./pages/revenue/Revenue'));
const CustomerList = lazy(() => import('./pages/customer/CustomerList'));
const CustomerDetails = lazy(() => import('./pages/customer/CustomerDetails'))
const RestaurantEditProfile = lazy(() => import('./pages/restaurant/RestaurantEditProfile'))
const RestaurantMenu = lazy(() => import('./pages/restaurant/menu/RestaurantMenu'))
const VendorList = lazy(() => import('./pages/vendor/VendorList'))
const VendorDashboard = lazy(() => import('./pages/vendor/VendorDashboard'))
const VendorReviews = lazy(() => import('./pages/vendor/VendorReviews'))
const VendorRevenue = lazy(() => import('./pages/vendor/VendorRevenue'))
const VendorEditProfile = lazy(() => import('./pages/vendor/VendorEditProfile'))
const VendorProducts = lazy(() => import('./pages/vendor/VendorProducts'))
const DeliveryAgent = lazy(() => import('./pages/delivery-agent/DeliveryAgent'))
const DeliveryAgentDetails = lazy(() => import('./pages/delivery-agent/DeliveryAgentDetails'))
const DeliveryAgentProfileEdit = lazy(() => import('./pages/delivery-agent/DeliveryAgentProfileEdit'))
const AvailableBalanceDetails = lazy(() => import('./pages/delivery-agent/AvailableBalanceDetails'))
const ReviewsDetails = lazy(() => import('./pages/reviews/ReviewsDetails'))
const SubAdminList = lazy(() => import('./pages/admin/SubAdminList'))
const AddSubAdmin = lazy(() => import('./pages/admin/AddSubAdmin'))
const EditSubAdmin = lazy(() => import('./pages/admin/EditSubAdmin'))
const AdminDashBoard = lazy(() => import('./pages/admin/AdminDashBoard'))
const SalesReport = lazy(() => import('./pages/admin/SalesReport'))
const UpdateAdminProfile = lazy(() => import('./pages/admin/UpdateAdminProfile'))
const Offers = lazy(() => import('./pages/offers/Offers'))
const CreateOfferPage = lazy(() => import('./pages/offers/CreateOfferPage'))
const ApplicationRequest = lazy(() => import('./pages/application-request/ApplicationRequest'))
const AddRestaurant = lazy(() => import('./pages/application-request/AddRestaurant'))
const AvailableCitiesList= lazy(() => import('./pages/admin/AvailableCities/availableCities'));
const CityFormPage = lazy(() => import('./pages/admin/AvailableCities/availableCityForm'));

function App() {
  const { isLoading } = useSelector((state) => state.loading);
  const { res, fetchData } = useGetApiReq();
  const { res: refreshRes, fetchData: fetchRefreshData } = usePostApiReq();
  const { res: logoutRes, fetchData: fetchLogoutData } = usePostApiReq();
  const navigate = useNavigate();

  const getStatus = () => {
    fetchData("/admin/status");
  };

  const token = readCookie("userInfo");
  console.log("token", token);

  const refreshToken = () => {
    fetchRefreshData("/admin/refresh-token");
  };

  const logout = () => {
    fetchLogoutData("/admin/logout-all", {
      phone: token?.phone,
      role: "admin",
    });
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      Cookies.set("admin-status", `${res?.data?.isAuthenticated}`);
      console.log("status response", res);
      res?.data?.shouldLoggOut && logout();
      !res?.data?.isAuthenticated && refreshToken();
    }
  }, [res]);

  useEffect(() => {
    if (refreshRes?.status === 200 || refreshRes?.status === 201) {
      Cookies.set("admin-status", true);
    }
  }, [refreshRes]);

  useEffect(() => {
    if (logoutRes?.status === 200 || logoutRes?.status === 201) {
       Cookies.set("admin-status", "false");
       Cookies.remove("userInfo");
      navigate("/");
    }
  }, [logoutRes]);
  useEffect(() => {
  getStatus();
  if (token?.role === "admin") {
    initFirebaseNotifications();
  }
}, []);


  return (
    <>
      {isLoading && <BackdropLoader />}

      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route
              path="/admin/dashboard/reporting"
              element={<SalesReport />}
            />

            <Route path="/admin/order" element={<Order />} />
            <Route
              path="/admin/order/capsico/:status"
              element={<StatusList />}
            />
            <Route
              path="/admin/order/quickly/:status"
              element={<StatusList />}
            />
            <Route path="/admin/order/new-order" element={<NewOrder />} />
            <Route path="/admin/order/:orderId" element={<OrderDetails />} />

            <Route path="/admin/reviews" element={<Reviews />} />
            <Route
              path="/admin/reviews/:reviewId"
              element={<ReviewsDetails />}
            />

            <Route path="/admin/restaurant" element={<RestaurantList />} />
            <Route
              path="/admin/restaurant/:restaurantId/dashboard"
              element={<RestaurantDashborad />}
            />
            <Route
              path="/admin/restaurant/:restaurantId/dashboard/recent-orders"
              element={<RecentOrders />}
            />
            <Route
              path="/admin/restaurant/edit-profile"
              element={<RestaurantEditProfile />}
            />
            <Route
              path="/admin/restaurant/add-restaurant"
              element={<RestaurantEditProfile />}
            />
            <Route
              path="/admin/restaurant/:restaurantId/:categoryId/addmenu"
              element={<AddMenu />}
            />
            <Route path="/admin/restaurant/reviews" element={<Review />} />
            <Route path="/admin/restaurant/revenue" element={<Revenue />} />
            <Route
              path="/admin/restaurant/:restaurantId/menu"
              element={<RestaurantMenu />}
            />

            <Route path="/admin/customer" element={<CustomerList />} />
            <Route
              path="/admin/customer/:customerId"
              element={<CustomerDetails />}
            />

            <Route path="/admin/vendor" element={<VendorList />} />
            <Route
              path="/admin/vendor/dashboard"
              element={<VendorDashboard />}
            />
            <Route path="/admin/vendor/reviews" element={<VendorReviews />} />
            <Route path="/admin/vendor/revenue" element={<VendorRevenue />} />
            <Route
              path="/admin/vendor/edit-profile"
              element={<VendorEditProfile />}
            />
            <Route
              path="/admin/vendor/add-vendor"
              element={<VendorEditProfile />}
            />
            <Route path="/admin/vendor/products" element={<VendorProducts />} />

            <Route path="/admin/delivery-agent" element={<DeliveryAgent />} />
            <Route
              path="/admin/delivery-agent/:deliveryAgentId"
              element={<DeliveryAgentDetails />}
            />
            <Route
              path="/admin/delivery-agent/:deliveryAgentId/edit-profile"
              element={<DeliveryAgentProfileEdit />}
            />
            <Route
              path="/admin/delivery-agent/:deliveryAgentId/available-balance"
              element={<AvailableBalanceDetails />}
            />

            <Route path="/admin/sub-admin" element={<SubAdminList />} />
            <Route
              path="/admin/sub-admin/add-subadmin"
              element={<AddSubAdmin />}
            />
            <Route
              path="/admin/sub-admin/edit-subadmin"
              element={<EditSubAdmin />}
            />
            {/* <Route path='/admin/sub-admin/admin-dashboard' element={<AdminDashBoard />} /> */}
            {/* <Route path='/admin/sub-admin/sales' element={<SalesReport />} /> */}
            <Route
              path="/admin/sub-admin/update-admin-profile"
              element={<UpdateAdminProfile />}
            />

            <Route path="/admin/offers" element={<Offers />} />
            <Route
              path="/admin/offers/create-offer"
              element={<CreateOfferPage />}
            />

            <Route
              path="/admin/application-request"
              element={<ApplicationRequest />}
            />
            <Route
              path="/admin/application-request/add-restaurant"
              element={<AddRestaurant />}
            />
            <Route
              path="/admin/delivery-charges"
              element={<DeliveryCharges />}
            />
            <Route
              path="/admin/delivery-charges/add"
              element={<AddDeliveryChargeForm />}
            />
            <Route
              path="/admin/delivery-charges/update"
              element={<AddDeliveryChargeForm />}
            />
          </Route>
          <Route
            path="/admin/available-cities"
            element={<AvailableCitiesList />}
          />
          <Route
            path="/admin/available-cities/create"
            element={<CityFormPage />}
          />
          <Route
            path="/admin/available-cities/:id"
            element={<CityFormPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
