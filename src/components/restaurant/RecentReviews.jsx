import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataNotFound from "../DataNotFound";
import SingleReview from "./SingleReview";
import Review from "../reviews/Review";
import { readCookie } from "@/utils/readCookie";

const RecentReviews = () => {
  const [reveiwData, setReveiwData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const userInfo = readCookie("userInfo");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllReviews = () => {
    fetchData(
      `/restaurant/reviews/${params?.restaurantId}?cityId=${userInfo?.city || ""}`,
    );
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("reviews res", res);
      setReveiwData(res?.data?.data?.reviews);
    }
  }, [res]);

  console.log("reveiwData", reveiwData);

  return (
    <div className="w-full border-[1px] border-[#E0E2E7] rounded-lg p-6 bg-[#FFFFFF] space-y-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-[#333843] text-lg font-medium font-inter">
          Recent Reviews
        </p>
        <button
          onClick={() =>
            navigate(`/admin/restaurant/${params?.restaurantId}/reviews`)
          }
          className="h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD]"
        >
          See More
        </button>
      </div>
      <div
        className="flex flex-col gap-6 max-h-96 overflow-y-auto [-ms-overflow-style: none
      ]"
      >
        {reveiwData.map((review) => (
          // <SingleReview key={review?._id} review={review} />
          <Review key={review?._id} review={review} />
        ))}

        {isLoading && <SingleReview.Skeleton />}
        {reveiwData.length === 0 && !isLoading && (
          <DataNotFound name="Reviews" />
        )}
      </div>
    </div>
  );
};

export default RecentReviews;
