import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const Content = () => {
    const options = [
      {
        label: "Terms and Policy",
        href: "/admin/termsandPolicy/termsandPolicy",
        time: "Last Update 28 mins ago",
      },
    ];

  return (
    <AdminWrapper>
      <div>
        <h2 className="text-[#000000] text-xl font-medium font-roboto">
          Content Management
        </h2>

        <div className="grid grid-cols-1 gap-4 shadow-md bg-white p-5 rounded-sm mt-5">
          {options.map(({ label, href, time }, i) => (
            <Button
              key={i}
              asChild
              className="bg-[#F6F6F6] hover:bg-[#e5e5e5] active:scale-y-100 active:scale-x-100 active:scale-100 active:bg-[#F6F6F6] transition-colors flex justify-between h-16 text-[#555555] p-5 rounded-xl"
            >
              <Link to={href}>
                <h2 className="text-xl font-inter font-semibold">{label}</h2>
                <p className="font-inter">{time}</p>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </AdminWrapper>
  );
};

export default Content;
