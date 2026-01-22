import { format } from "date-fns";
import {
  Clock,
  CalendarClock,
  Package,
  Store,
  UserCheck,
  UserX,
  Truck,
  CheckCircle,
  BadgeCheck,
} from "lucide-react";

const TIMELINE_CONFIG = [
  {
    key: "scheduleAt",
    label: "Order Scheduled",
    icon: CalendarClock,
  },
  {
    key: "orderedAt",
    label: "Order Placed",
    icon: Package,
  },
  {
    key: "confirmedAt",
    label: "Accepted by Restaurant",
    icon: Store,
  },
  {
    key: "assignedAt",
    label: "Assigned to Delivery Partner",
    icon: UserCheck,
  },
  {
    key: "deliveryAcceptedAt",
    label: "Accepted by Delivery Partner",
    icon: UserCheck,
  },
  {
    key: "deliveryRejectedAt",
    label: "Rejected by Delivery Partner",
    icon: UserX,
    error: true,
  },
  {
    key: "readyAt",
    label: "Order Prepared",
    icon: CheckCircle,
  },
  {
    key: "pickedUpAt",
    label: "Picked Up",
    icon: Truck,
  },
  {
    key: "deliveredAt",
    label: "Delivered",
    icon: BadgeCheck,
    success: true,
  },
];


const TimelineItem = ({
  label,
  value,
  icon: Icon,
  isLast,
  error,
  success,
  muted,
}) => {
  const textColor = error
    ? "text-red-600"
    : success
      ? "text-green-600"
      : muted
        ? "text-muted-foreground"
        : "text-black";

  const dotColor = error
    ? "bg-red-500"
    : success
      ? "bg-green-500"
      : "bg-gray-400";

  return (
    <div className="relative flex gap-4">
      {/* LEFT TIMELINE */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <span
          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`}
        />

        {/* Line */}
        {!isLast && <span className="mt-1 h-full w-px bg-gray-200" />}
      </div>

      {/* CONTENT */}
      <div className="pb-4">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 text-black ${textColor}`} />
          <p className={`text-sm font-semibold text-black ${textColor}`}>
            {label}
          </p>
        </div>
        <p className="text-xs text-gray-500 ml-6">
          {format(new Date(value), "hh:mm:ss a")}
        </p>
      </div>
    </div>
  );
};

// const TimelineItem = ({
//   label,
//   value,
//   icon: Icon,
//   muted,
//   error,
//   success,
//   isLast,
// }) => {
//   const textColor = error
//     ? "text-red-600"
//     : success
//       ? "text-green-600"
//       : muted
//         ? "text-muted-foreground"
//         : "text-black";

//   const dotColor = error
//     ? "bg-red-500"
//     : success
//       ? "bg-green-500"
//       : "bg-gray-400";

//   return (
//     <div className="flex gap-3 relative">
//       {/* Line */}
//       {!isLast && (
//         <span className="absolute left-[9px] top-6 h-full w-px bg-gray-200" />
//       )}

//       {/* Dot */}
//       <span className={`mt-1 h-2.5 w-2.5 rounded-full ${dotColor}`} />

//       {/* Content */}
//       <div className="flex items-start gap-2">
//         <Icon className={`h-4 w-4 mt-0.5 ${textColor}`} />
//         <div>
//           <p className={`text-xs font-semibold ${textColor}`}>{label}</p>
//           <p className="text-[11px] text-gray-500">
//             {format(new Date(value), "hh:mm:ss a")}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

const OrderTimingTimeline = ({ timing = {} }) => {
  const visibleItems = TIMELINE_CONFIG.filter((item) => timing[item.key]);

  return (
    <div className="flex flex-col">
      {visibleItems.map((item, index) => (
        <TimelineItem
          key={item.key}
          label={item.label}
          value={timing[item.key]}
          icon={item.icon}
          isLast={index === visibleItems.length - 1}
          error={item.error}
          muted={item.muted}
          success={item.success}
        />
      ))}
    </div>
  );
};

export default OrderTimingTimeline;
