import React, { useEffect, useState } from "react";
import OfferDetails from "./OfferDetails";
import useGetApiReq from "@/hooks/useGetApiReq";
import ReactPagination from "../pagination/ReactPagination";
import { LIMIT } from "@/constants/constants";
import Spinner from "../Spinner";
import DataNotFound from "../DataNotFound";

const TrackOffer = () => {
  const [selected, setSelected] = useState("all");
  const [offerActiveTab, setOfferActiveTab] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getCoupons = () => {
    fetchData(`/admin/get-coupons?page=${page}&limit=${LIMIT}&status=${selected}`);
  };

  useEffect(() => {
    getCoupons();
  }, [page, selected]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("coupons res", res);
      setCoupons(res?.data?.coupons);
      setTotalPage(res?.data?.pagination?.totalPages);
      setPage(res?.data?.pagination?.page);
    }
  }, [res]);

  return (
    <div className="px-5 py-5">
      <div className="bg-white py-3 pb-0 w-auto inline-flex gap-2">
        <button
          onClick={() => setSelected("all")}
          className={`pb-2 px-3 border-b-4 class-base1 ${
            selected === "All"
              ? "border-[#1AA6F1] primary-color"
              : "border-transparent"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelected("active")}
          className={`pb-2 px-3 border-b-4 class-base1 ${
            selected === "active"
              ? "border-[#1AA6F1] primary-color"
              : "border-transparent"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setSelected("inactive")}
          className={`pb-2 px-3 border-b-4 class-base1 ${
            selected === "inactive"
              ? "border-[#1AA6F1] primary-color"
              : "border-transparent"
          }`}
        >
          Inactive
        </button>
        <button
          onClick={() => setSelected("Scheduled")}
          className={`pb-2 px-3 border-b-4 class-base1 ${
            selected === "scheduled"
              ? "border-[#1AA6F1] primary-color"
              : "border-transparent"
          }`}
        >
          Scheduled
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {coupons.map((coupon) => (
          <OfferDetails
            key={coupon._id}
            offerActiveTab={offerActiveTab}
            setOfferActiveTab={setOfferActiveTab}
            coupon={coupon}
          />
        ))}

        {isLoading && <Spinner />}
        {!isLoading && coupons.length === 0 && (
            <DataNotFound name="Coupons" />
        )}
      </div>

      <ReactPagination totalPage={totalPage} setPage={setPage} />
    </div>
  );
};

export default TrackOffer;
