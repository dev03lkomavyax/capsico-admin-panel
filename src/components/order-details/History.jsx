import React from "react";
import Timeline from "./Timeline";
import { format } from "date-fns";

const History = ({ status, timing, history }) => {
  return (
    <div>
      {history?.map((item, i) => (
        <>
          {i !== 0 && (
            <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
          )}
          <Timeline
            key={i}
            title={item?.status?.split("_").join(" ")}
            time={
              item?.timestamp &&
              format(new Date(item?.timestamp), "MMM dd, yyyy hh:mm a")
            }
            status={item?.status}
            className={
              item?.status !== "cancelled" && item?.status !== "rejected"
                ? "bg-[#57A748]"
                : "bg-[#F05542]"
            }
          />
        </>
      ))}
      {/* {status === "cancelled" && (
        <>
          <Timeline
            title="Order cancelled"
            // time={timing}
            status={status}
            className="bg-[#F05542]"
          />
          <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
          <Timeline
            title="Order received"
            // time={timing}
            status={status}
            className="bg-[#57A748]"
          />
        </>
      )} */}
    </div>
  );
};

export default History;
