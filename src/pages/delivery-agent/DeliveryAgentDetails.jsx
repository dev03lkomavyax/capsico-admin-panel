import pocket from "@/assets/3dicons.png";
import call from "@/assets/call.png";
import edit from "@/assets/edit.png";
import avatar from "@/assets/Image-198.png";
import location from "@/assets/location.png";
import sms from "@/assets/sms.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import SingleDelivery from "@/components/delivery-agent/SingleDelivery";
import ReactPagination from "@/components/pagination/ReactPagination";
import Spinner from "@/components/Spinner";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { viewDbImagePreview } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const DeliveryAgentDetails = () => {
  const navigate = useNavigate();

  const [deliveryPartnerDetailsData, setDeliveryPartnerDetailsData] =
    useState("");
  const [orders, setOrders] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const { deliveryAgentId } = useParams();
  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: res1,
    fetchData: fetchData1,
    isLoading: isLoading1,
  } = useGetApiReq();

  const getDeliveryPartnerDetails = () => {
    fetchData(`/admin/get-delivery-partner/${deliveryAgentId}`);
  };

  useEffect(() => {
    getDeliveryPartnerDetails();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("deliveryPartnerDetailsData", res?.data);
      setDeliveryPartnerDetailsData(res?.data?.data);
    }
  }, [res]);

  const getDeliveryHistory = () => {
    fetchData1(
      `/admin/get-delivery-history/${deliveryAgentId}?page=${page}&limit=${LIMIT}`
    );
  };

  useEffect(() => {
    getDeliveryHistory();
  }, [page]);

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("getDeliveryHistory res", res1?.data);
      setOrders(res1?.data?.orders);
      setTotalPage(res1?.data?.pagination?.totalPages || 0);
      setPage(res1?.data?.pagination?.page);
    }
  }, [res1]);

  return (
    <AdminWrapper>
      <section>
        <div className="flex justify-between h-14">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1"
          >
            <IoIosArrowBack className="text-2xl" />
            <span className="font-roboto text-lg font-medium">
              Delivery agent detail
            </span>
          </button>
        </div>
        <div className="grid grid-cols-[60%_38%] gap-[2%]">
          <div className="bg-white p-5 rounded-lg flex gap-10">
            <img
              className="w-52 h-52 rounded-lg"
              src={
                deliveryPartnerDetailsData?.personalInfo?.profileImage
                  ? viewDbImagePreview(
                      deliveryPartnerDetailsData?.personalInfo?.profileImage
                    )
                  : avatar
              }
              alt="avatar"
            />
            <div className="w-full">
              <div className="flex w-full justify-between items-center gap-3">
                <h1 className="font-inter text-3xl font-semibold text-[#202020]">
                  {deliveryPartnerDetailsData?.personalInfo?.name}
                </h1>
                <img
                  onClick={() =>
                    navigate("/admin/delivery-agent/123/edit-profile")
                  }
                  className="w-5 h-5 cursor-pointer"
                  src={edit}
                  alt="edit"
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <div className="flex items-center gap-2">
                  <img className="w-5 h-5" src={location} alt="location" />
                  <p className="font-inter text-[#696969] text-lg">
                    {deliveryPartnerDetailsData?.address?.city}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img className="w-5 h-5" src={sms} alt="sms" />
                  <p className="font-inter text-[#696969] text-lg">
                    {deliveryPartnerDetailsData?.personalInfo?.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img className="w-5 h-5" src={call} alt="call" />
                  <p className="font-inter text-[#696969] text-lg">
                    +91 {deliveryPartnerDetailsData?.personalInfo?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() =>
              navigate("/admin/delivery-agent/123/available-balance")
            }
            className="flex flex-col cursor-pointer justify-between rounded-lg bg-[#7FADFF]"
          >
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
          </div>
        </div>

        <div className="rounded-lg mt-7 p-5 bg-white">
          <h2 className="font-inter font-semibold">Delivery history</h2>
          <div className="flex flex-col mt-5">
            {orders?.map((order) => (
              <SingleDelivery key={order?._id} order={order} />
            ))}

            {orders.length === 0 && isLoading && <Spinner />}

            {orders.length === 0 && !isLoading && (
              <DataNotFound name="Orders" />
            )}
          </div>

          <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
      </section>
    </AdminWrapper>
  );
};

export default DeliveryAgentDetails;
