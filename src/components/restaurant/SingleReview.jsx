import React from "react";
import ReactStars from "react-stars";
import img from "@/assets/Image-120.png";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";

const SingleReview = ({ review }) => {
  return (
    <div className="border-[1px] border-[#CFCFCF] rounded-lg p-6 flex flex-col justify-between gap-4">
      <div className="flex gap-2">
        <img
          src={review?.user?.image || img}
          alt=""
          className="w-10 h-10 rounded-[20px]"
        />
        <div>
          <h4 className="text-[#000000] text-base font-medium font-inter">
            {review?.user?.name}
          </h4>
          <ReactStars
            className="text-[#535353] text-sm font-normal font-inter"
            edit={false}
            value={review?.rating}
          />
        </div>
      </div>
      <p className="text-[#535353] text-sm font-normal font-inter leading-[24px]">
        {review?.description}
      </p>
      <p className="text-[#9B9B9B] text-sm font-normal font-inter">
        {review?.createdAt &&
          format(new Date(review?.createdAt), "dd MMMM yyyy")}
      </p>
    </div>
  );
};

SingleReview.Skeleton = function ReviewSkeleton() {
  return (
    <div className="border-[1px] border-[#CFCFCF] rounded-lg p-6 flex flex-col justify-between gap-4">
      {/* Avatar and Name */}
      <div className="flex gap-2 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Description */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[70%]" />

      {/* Date */}
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export default SingleReview;
