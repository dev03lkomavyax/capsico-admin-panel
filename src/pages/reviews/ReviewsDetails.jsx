import img from "@/assets/Image-120.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import ReviewDetailsSkeleton from "./ReviewDetailsSkeleton";
import { format } from "date-fns";

const ReviewsDetails = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();

  const [review, setReview] = useState(null);
  const { res, fetchData, isLoading } = useGetApiReq();

  useEffect(() => {
    fetchData(`/admin/get-review/${reviewId}`);
  }, [reviewId]);

  useEffect(() => {
    if (res?.status === 200) {
      setReview(res?.data?.data);
    }
  }, [res]);

  const {
    user,
    restaurant,
    overallRating,
    detailedReview,
    createdAt,
    dishRatings = [],
    images = [],
    subRatings = {},
    deliveryChampionRating,
  } = review || {};

  return (
    <AdminWrapper>
      <section>
        {/* Header */}
        <div className="flex items-center h-14">
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
            {/* User */}
            <div className="flex gap-3 items-center">
              <img
                src={user?.image || img}
                className="w-12 h-12 rounded-full"
                alt="user"
              />
              <div>
                <h1 className="font-inter font-medium">{user?.name}</h1>
                <ReactStars
                  count={5}
                  value={overallRating || 0}
                  size={26}
                  edit={false}
                  color1="#d3d6e4"
                  color2="#E0B936"
                />
              </div>
            </div>

            {/* Review text */}
            {detailedReview && (
              <p className="font-inter text-[#535353] mt-3">{detailedReview}</p>
            )}

            {/* Date */}
            <p className="font-inter text-[#9B9B9B] mt-2">
              {createdAt && format(new Date(createdAt), "MMMM dd, yyyy")}
            </p>

            {/* Images */}
            {images.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {images.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt="review"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Sub Ratings */}
            {Object.values(subRatings).some(Boolean) && (
              <div className="mt-6">
                <h3 className="font-inter font-medium mb-3">
                  Category Ratings
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(subRatings).map(
                    ([label, value]) =>
                      value && (
                        <div
                          key={label}
                          className="flex justify-between border p-2 rounded-md"
                        >
                          <span className="text-sm">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Restaurant */}
            <div className="my-6 py-6 border-t border-b border-[#CECECE]">
              <h3 className="text-sm font-inter">Restaurant Details</h3>
              <h2 className="font-inter text-xl capitalize font-medium mt-2">
                {restaurant?.name}
              </h2>
              {restaurant?.address && (
                <p className="font-inter text-[#565656]">
                  {restaurant.address.addressLine}, {restaurant.address.city},{" "}
                  {restaurant.address.state} - {restaurant.address.pinCode}
                </p>
              )}
            </div>

            {/* Dish Ratings */}
            {dishRatings.length > 0 && (
              <div>
                <h3 className="font-inter font-medium mb-3">Dish Ratings</h3>

                <div className="flex flex-col gap-4">
                  {dishRatings.map((dish) => (
                    <div key={dish.dishId} className="border p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-inter font-medium">
                          {dish.dishName}
                        </h4>
                        <ReactStars
                          count={5}
                          value={dish.rating || 0}
                          size={22}
                          edit={false}
                          color1="#d3d6e4"
                          color2="#E0B936"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Champion */}
            {deliveryChampionRating && (
              <div className="mt-6">
                <h3 className="font-inter font-medium mb-2">
                  Delivery Partner Rating
                </h3>
                <ReactStars
                  count={5}
                  value={deliveryChampionRating}
                  size={22}
                  edit={false}
                  color1="#d3d6e4"
                  color2="#16a34a"
                />
              </div>
            )}
          </div>
        )}
      </section>
    </AdminWrapper>
  );
};

export default ReviewsDetails;
