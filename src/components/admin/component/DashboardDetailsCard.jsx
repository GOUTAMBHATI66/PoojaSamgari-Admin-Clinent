import React from "react";
import { RiBarChartGroupedFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { BsStack } from "react-icons/bs";

const DashboardDetailsCard = ({ title, value, style }) => {
  return (
    <div
      className={`bg-[#E2D0CA]  lg:col-span-1  ${
        style ? "col-span-2" : null
      }  shadow rounded-lg px-2 min-[370px]:px-4  py-8`}
    >
      <p className=" md:text-sm lg:text-base font-medium text-black/70 mb-3">
        {title}
      </p>

      <div className="flex items-center justify-between ">
        <h2 className=" text-4xl font-bold">
          {" "}
          {style ? <span>&#8377;</span> : null} {value}
        </h2>
        {style ? <RiBarChartGroupedFill size={40} /> : null}
        {title === "Pending Orders" ? <BsStack size={40} /> : null}
        {title === "All Products" ? <FaGift size={40} /> : null}
      </div>
    </div>
  );
};

export default DashboardDetailsCard;
