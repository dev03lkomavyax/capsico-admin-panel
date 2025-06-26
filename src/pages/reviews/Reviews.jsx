import AdminWrapper from "@/components/admin-wrapper/AdminWrapper"
import DataNotFound from "@/components/DataNotFound"
import ReactPagination from "@/components/pagination/ReactPagination"
import NegativeReviewsChart from "@/components/reviews/NegativeReviewsChart"
import PositiveReviewsChart from "@/components/reviews/PositiveReviewsChart"
import Review from "@/components/reviews/Review"
import Spinner from "@/components/Spinner"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { LIMIT } from "@/constants/constants"
import useGetApiReq from "@/hooks/useGetApiReq"
import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { IoIosArrowBack } from 'react-icons/io'

const Reviews = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState("all");
    const [dateFilter, setDateFilter] = useState("today");
    const [ratingSort, setRatingSort] = useState("latest");
    const [reviews, setReviews] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    const { res, fetchData, isLoading } = useGetApiReq();
    
      const getAllReviews = () => {
        fetchData(
          `/admin/get-reviews?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${dateFilter}&sortBy=${ratingSort}&ratingType=${status}`
        );
      };
    
      useEffect(() => {
        getAllReviews();
      }, [searchQuery, page, dateFilter,ratingSort,status]);
    
      useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
          console.log("reviews res", res);
          setReviews(res?.data?.reviews);
          setTotalPage(res?.data?.pagination?.totalPages);
          setPage(res?.data?.pagination?.page);
        }
      }, [res]);

    return (
      <AdminWrapper>
        <section>
          <div className="flex gap-2 items-center">
            <h1 className="text-xl font-medium font-roboto">Reviews</h1>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-5">
            <PositiveReviewsChart />
            <NegativeReviewsChart />
          </div>

          <div className="flex justify-between items-center mt-10">
            <div className="flex justify-start items-center relative">
              <BsSearch className="absolute left-5 text-[#1D1929]" />
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto"
              />
            </div>
            <div className="flex items-center gap-5">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                  <SelectValue placeholder="Select Review Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="deliveryAgent">Delivery Agent</SelectItem>
                  <SelectItem value="food">food</SelectItem>
                </SelectContent>
              </Select>
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

          <div className="bg-white py-4 px-8 mt-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl text-[#2E2E2E] font-roboto font-medium">
                  Others review
                </h2>
                <p className="font-inter text-sm text-[#5A5A5A]">
                  Here is customer reviews
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
              {reviews.map((review) => (
                <Review key={review?._id} review={review} />
              ))}
            </div>

            {isLoading && <Spinner />}
            {reviews.length === 0 && !isLoading && (
              <DataNotFound name="Reviews" />
            )}
          </div>

          <ReactPagination totalPage={totalPage} setPage={setPage} />
        </section>
      </AdminWrapper>
    );
}

export default Reviews