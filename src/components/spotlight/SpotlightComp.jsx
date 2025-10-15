import React from 'react'
import { TableCell, TableRow } from '../ui/table';

const SpotlightComp = ({ spotlight }) => {
  return (
    <TableRow>
      {/* ======= Restaurant ======= */}
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {/* {spotlight.restaurantId?.images?.[0] && (
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/${
                spotlight.restaurantId.images[0]
              }`}
              alt={spotlight.restaurantId.name}
              className="w-8 h-8 rounded-md object-cover"
            />
          )} */}
          <span>{spotlight.restaurantId?.name || "N/A"}</span>
        </div>
      </TableCell>

      {/* ======= Spotlight Items ======= */}
      <TableCell className="max-w-[250px] truncate">
        {spotlight.spotlightFoodIds.map((item) => item.name).join(", ")}
      </TableCell>

      {/* ======= Priority ======= */}
      <TableCell>{spotlight.priority ?? "-"}</TableCell>

      {/* ======= Dates ======= */}
      <TableCell>
        {spotlight.startDate
          ? new Date(spotlight.startDate).toLocaleDateString()
          : "-"}
      </TableCell>
      <TableCell>
        {spotlight.endDate
          ? new Date(spotlight.endDate).toLocaleDateString()
          : "-"}
      </TableCell>

      {/* ======= Created On ======= */}
      <TableCell>
        {new Date(spotlight.createdAt).toLocaleDateString()}
      </TableCell>

      {/* ======= Status ======= */}
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            spotlight.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {spotlight.isActive ? "Active" : "Inactive"}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default SpotlightComp