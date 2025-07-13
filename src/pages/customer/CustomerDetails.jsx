import pocket from "@/assets/3dicons.png";
import call from "@/assets/call.png";
import edit from "@/assets/edit.png";
import avatar from "@/assets/Image-198.png";
import location from "@/assets/location.png";
import sms from "@/assets/sms.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import CustomerOrders from "@/components/customer/CustomerOrders";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import UpdateCustomer from "./UpdateCustomer";
import { Calendar, Gift } from "lucide-react";
import Addresses from "./Addresses";

const CustomerDetails = () => {
  const [customerDetailsData, setCustomerDetailsData] = useState("");
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [isUpdateCustomerModalOpen, setIsUpdateCustomerModalOpen] =
    useState(false);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getCustomerDetails = () => {
    fetchData(`/admin/get-customer/${customerId}`);
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getCustomerDetails", res?.data);
      setCustomerDetailsData(res?.data?.data);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div className="p-0">
        <div className="flex justify-between h-14">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1"
          >
            <IoIosArrowBack className="text-2xl" />
            <span className="font-roboto text-lg font-medium">
              Customer detail
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-lg grid grid-cols-1 md:grid-cols-[208px_1fr] gap-5">
            <img
              className="w-52 h-52 rounded-lg"
              src={
                customerDetailsData.image
                  ? `${import.meta.env.VITE_IMAGE_URL}/${
                      customerDetailsData.image
                    }`
                  : avatar
              }
              alt="avatar"
            />
            <div className="max-w-2xl w-full">
              <div className="flex w-full justify-between items-center gap-3">
                <h1 className="font-inter text-3xl font-semibold text-[#202020] capitalize">
                  {customerDetailsData?.name}
                </h1>
                <button onClick={() => setIsUpdateCustomerModalOpen(true)}>
                  <img
                    className="w-5 h-5 cursor-pointer"
                    src={edit}
                    alt="edit"
                  />
                </button>
              </div>
              <div className="flex flex-col gap-3 mt-5">
                {/* <div className="flex items-center gap-2">
                  <img className="w-5 h-5" src={location} alt="location" />
                  <p className="font-inter text-[#696969] text-lg">
                    {customerDetailsData?.addresses?.[0]
                      ? `${customerDetailsData?.addresses?.[0]?.addressLine}, ${customerDetailsData?.addresses?.[0]?.city}, ${customerDetailsData?.addresses?.[0]?.state}, ${customerDetailsData?.addresses?.[0]?.pinCode}`
                      : "N/A"}
                  </p>
                </div> */}
                <div className="flex items-center gap-2">
                  <img className="w-5 h-5" src={sms} alt="sms" />
                  <p className="font-inter text-[#696969] text-lg break-all">
                    {customerDetailsData?.email || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img className="w-5 h-5" src={call} alt="call" />
                  <p className="font-inter text-[#696969] text-lg">
                    +91 {customerDetailsData?.phone || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-[#7A7A7A] size-5" />
                  <p className="font-inter text-[#696969] text-lg">
                    {customerDetailsData?.dateOfBirth || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="text-[#7A7A7A] size-5" />
                  <p className="font-inter text-[#696969] text-lg">
                    {customerDetailsData?.anniversary || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col justify-between rounded-lg bg-[#7FADFF]">
            <div className="px-10 py-6 flex justify-between items-center">
              <div>
                <span className="font-inter font-medium text-white">
                  Available Balance
                </span>
                <h2 className="text-white font-inter font-bold text-4xl mt-2">
                  ₹ 2500
                </h2>
              </div>
              <img className="w-24" src={pocket} alt="pocket" />
            </div>
            <div className="py-4 px-6 bg-[#A8C7FF] rounded-b-lg flex justify-between items-end">
              <div>
                <p className="font-inter text-[#707070]">
                  Previous transaction
                </p>
                <p className="font-inter text-[#707070]">20 June,2024</p>
              </div>
              <p className="font-inter text-[#FF0000] font-semibold">Rs 200</p>
            </div>
          </div> */}
          <Addresses
            isLoading={isLoading}
            addresses={customerDetailsData?.addresses || []}
            getCustomerDetails={getCustomerDetails}
          />
        </div>

        <CustomerOrders />
      </div>
      {isUpdateCustomerModalOpen && (
        <UpdateCustomer
          isUpdateCustomerModalOpen={isUpdateCustomerModalOpen}
          setIsUpdateCustomerModalOpen={setIsUpdateCustomerModalOpen}
          customer={customerDetailsData}
          getCustomerDetails={getCustomerDetails}
        />
      )}
    </AdminWrapper>
  );
};

export default CustomerDetails;
