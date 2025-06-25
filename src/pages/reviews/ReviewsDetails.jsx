import img from "@/assets/Image-120.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import OrderItem from "@/components/order-details/OrderItem";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import ReviewDetailsSkeleton from "./ReviewDetailsSkeleton";
import { format } from "date-fns";

const capsico = true;

const ReviewsDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [review, setReview] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getReview = () => {
    fetchData(`/admin/get-review/${params?.reviewId}`);
  };

  useEffect(() => {
    getReview();
  }, [params?.reviewId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("review res", res);
      setReview(res?.data?.review);
    }
  }, [res]);

  const { items, amounts } = review?.order || {};
  const { name, address } = review?.restaurant || {};

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
              Review Details
            </span>
          </button>
        </div>
        {isLoading ? (
          <ReviewDetailsSkeleton />
        ) : (
          <div className="w-full mt-3 bg-white p-5 rounded-lg">
            <div className="flex gap-1 items-center">
              <img
                src={review?.user?.image || img}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="font-inter font-medium">{review?.user?.name}</h1>
                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={28}
                  edit={false}
                  color1={"#d3d6e4"}
                  color2={"#E0B936"}
                  className="-mt-2"
                />
              </div>
            </div>

            <p className="font-inter text-[#535353] mt-2">
              {review?.description}
            </p>
            <p className="font-inter text-[#9B9B9B] mt-2">
              {review?.createdAt &&
                format(new Date(review?.createdAt), "MMMM dd, yyyy")}
            </p>

            <div className="my-6 py-6 border-t border-b border-[#CECECE] flex justify-between items-center">
              <div>
                <h3 className="text-sm font-inter">Restaurant Details</h3>
                <h2 className="font-inter text-xl capitalize font-medium mt-2">
                  {name}
                </h2>
                <p className="font-inter text-[#565656]">
                  {address?.addressLine}, {address?.city}, {address?.state},{" "}
                  {address?.pinCode}
                </p>
              </div>
              <button className="font-inter text-[#003CFF] font-semibold text-lg">
                View
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <h2 className="font-inter text-sm font-medium">Items</h2>
              <h2 className="font-inter text-sm font-medium text-center">
                Oty
              </h2>
              <h2 className="font-inter text-sm font-medium text-right">
                Price
              </h2>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <OrderItem items={items} />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
              <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                Total amount
              </h3>
              <div></div>
              <h3 className="font-roboto text-[#515151] font-medium text-right">
                ₹{amounts?.total}
              </h3>
            </div>
          </div>
        )}
      </section>
    </AdminWrapper>
  );
};

export default ReviewsDetails;
