import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";
import Review from "@/components/reviews/Review";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";

const reviews = [
  {
    image: "https://picsum.photos/48",
    name: "James Kowalski",
    position: "Head Marketing",
    date: "24 June 2020",
    content:
      "We recently had dinner with friends at David CC and we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!",
    rating: 3.5,
    tags: [{ label: "Excelent", color: "pink" }],
  },
  {
    image: "https://picsum.photos/48",
    name: "Samuel Hawkins",
    position: "Head Marketing",
    date: "24 June 2020",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    rating: 4.8,
    tags: [
      { label: "Recomended", color: "pink" },
      { label: "Great", color: "orange" },
    ],
  },
  {
    image: "https://picsum.photos/48",
    name: "Samuel Hawkins",
    position: "Head Marketing",
    date: "24 June 2020",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    rating: 4.8,
    tags: [
      { label: "Recomended", color: "pink" },
      { label: "Great", color: "orange" },
    ],
  },
];

function Reviews() {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(reviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [ratingSort, setRatingSort] = useState("latest");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllReviews = () => {
    fetchData(
      `/admin/get-reviews?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${dateFilter}&sortBy=${ratingSort}&ratingType=restaurant`
    );
  };

  useEffect(() => {
    getAllReviews();
  }, [searchQuery, page, dateFilter, ratingSort]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("reviews res", res);
      setReviewData(res?.data?.reviews);
      setTotalPage(res?.data?.pagination?.totalPages);
      setPage(res?.data?.pagination?.page);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full h-full min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-start items-center"
        >
          <MdKeyboardArrowLeft className="text-[#000000] text-4xl cursor-pointer" />
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Reviews
          </h2>
        </button>
        <div className="flex justify-between items-center w-full my-5">
          <div className="flex justify-start items-center -ml-4">
            <BsSearch className="relative left-8 text-[#1D1929]" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto"
            />
          </div>
          <div className="flex justify-between items-center">
            <Select
              value={dateFilter}
              onValueChange={(value) => setDateFilter(value)}
            >
              <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                <SelectValue placeholder="Today" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="bg-[#FFFFFF] w-full px-9 rounded-lg">
          <div className="flex justify-between items-start pt-5 w-full">
            <div>
              <h3 className="text-[#2E2E2E] text-2xl font-semibold font-inter">
                Others review
              </h3>
              <p className="text-[#5A5A5A] text-base font-normal font-inter">
                Here is customer review about restaurants
              </p>
            </div>
            <Select
              value={ratingSort}
              onValueChange={(value) => setRatingSort(value)}
            >
              <SelectTrigger className="flex justify-between bg-[#f6f6fb] items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                <SelectValue placeholder="Today" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-6 mt-5">
            {reviewData.map((review) => (
              <Review key={review?._id} review={review} />
            ))}
          </div>

          {isLoading && <Spinner />}
          {reviewData.length === 0 && !isLoading && (
            <DataNotFound name="Reviews" />
          )}
        </div>

        <ReactPagination totalPage={totalPage} setPage={setPage} />
      </section>
    </AdminWrapper>
  );
}

export default Reviews;
