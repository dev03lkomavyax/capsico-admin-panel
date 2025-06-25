import img from "@/assets/Image-120.png";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";

const Review = ({ review }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/admin/reviews/${review?._id}`)}
      className="grid grid-cols-[48px_1fr] gap-4 border-b pb-6 cursor-pointer"
    >
      <img
        src={review?.user?.image || img}
        className="w-12 h-12 rounded-full object-cover bg-red-300"
      />
      <div>
        <div className="w-full grid grid-cols-[1fr_200px] gap-5">
          <div className="grid grid-cols-[70%_28%] gap-[2%]">
            <div>
              <div className="">
                <h2 className="font-inter font-semibold text-[#7B8289]">
                  {review?.user?.name}
                </h2>
                <p className="font-inter text-xs font-semibold text-[#CBCDD0]">
                  {review?.createdAt &&
                    format(new Date(review?.createdAt), "dd MMMM yyyy")}
                </p>
              </div>
              <p className="font-inter mt-5 text-sm font-medium text-[#2B2B2B">
                {review?.description}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {/* <div className="bg-[#FEF0ED] text-xs font-inter font-semibold text-[#FEAC9A] h-7 w-auto rounded-full px-4 flex items-center">
                Excelent
              </div> */}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-inter text-2xl font-semibold text-[#747B83]">
              {review?.rating}
            </h3>
            <ReactStars
              count={5}
              value={review?.rating || 0}
              size={28}
              edit={false}
              color1={"#d3d6e4"}
              color2={"#2e4cdf"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
