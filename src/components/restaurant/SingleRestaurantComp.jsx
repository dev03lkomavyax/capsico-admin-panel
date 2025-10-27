



// export default SingleRestaurantComp

import { Checkbox } from '@/components/ui/checkbox'
import { TableCell, TableRow } from '@/components/ui/table'
import useDeleteApiReq from '@/hooks/useDeleteApiReq'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../AlertModal'
import StatusToggleButton from '@/components/ui/statusButton'
import { Eye, Edit, Trash2 } from "lucide-react"
import { axiosInstance } from '@/utils/axiosInstance'

const SingleRestaurantComp = ({ data, getAllRestaurant }) => {
  const navigate = useNavigate()
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  // Live status state from API
  const [statusLoading, setStatusLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [timingDetail, setTimingDetail] = useState(null)

  // ✅ Fixed live status fetch (initial + every 60s)
  useEffect(() => {
    let mounted = true

    async function fetchStatus() {
      try {
        setStatusLoading(true)

        const url = `/restaurant/live-status/${data?.id}?t=${Date.now()}`
        const res = await axiosInstance.get(url, {
          credentials: 'include',
          headers: { Accept: 'application/json' }
        })

        // axios handles JSON parsing already
        const current = res?.data?.data || null
        console.log(`res:${data.name}`, res);
        console.log(`current:${data.name}`, current);
        

        if (mounted) {
          setIsOpen(!!current?.isOpen)
          setTimingDetail(current || null) // contains opensAt / closesAt
        }
      } catch (err) {
        console.error('Error fetching timings:', err)
        if (mounted) {
          setIsOpen(false)
          setTimingDetail(null)
        }
      } finally {
        if (mounted) setStatusLoading(false)
      }
    }

    if (data?.id) {
      fetchStatus()
      const id = setInterval(fetchStatus, 60000)
      return () => { mounted = false; clearInterval(id) }
    }
    return () => { mounted = false }
  }, [data?.id])

  // Delete logic
  const { res, fetchData, isLoading } = useDeleteApiReq()
  const deleteRestaurant = () => {
    fetchData(`/admin/delete-restaurant?restaurantId=${data?.id}`)
  }
  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      getAllRestaurant()
    }
  }, [res, getAllRestaurant])

  // Navigation handlers
  const handleView = () =>
    navigate(`/admin/restaurant/${data?.id}/dashboard`, { state: { mode: 'view' } })
  const handleEdit = () =>
    navigate(`/admin/restaurant/${data?.id}/dashboard`, { state: { mode: 'edit' } })
  const handleRemove = () => setIsAlertModalOpen(true)

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
        </TableCell>

        <TableCell className="text-[#1D1929] text-xs whitespace-nowrap font-normal font-sans">
          {data?.customRestaurantId || "N/A"}
        </TableCell>

        <TableCell className="text-[#1D1929] text-xs font-bold font-sans w-60">
          {data?.name}
        </TableCell>

        <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
          {data?.createdAt
            ? format(
                typeof data?.createdAt === "number"
                  ? new Date(data?.createdAt)
                  : new Date(data?.createdAt),
                "MMMM yyyy"
              )
            : "N/A"}
        </TableCell>

        <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">
          {`${data?.location?.address || ""}${
            data?.location?.city ? `, ${data?.location?.city}` : ""
          }${data?.location?.state ? `, ${data?.location?.state}` : ""}${
            data?.location?.pinCode ? `, ${data?.location?.pinCode}` : ""
          }`}
        </TableCell>


        {/* <TableCell className="text-[#000000] text-xs font-semibold font-inter">
          {data?.sales?.total ? `₹${data?.sales?.total}` : "N/A"}
        </TableCell>

        <TableCell className="text-[#1D1929] text-xs font-semibold font-inter">
          {data?.sales?.last ? `₹${data?.sales?.last}` : "N/A"}
        </TableCell> */}


        {/* EMAIL - Replaces Total Sale */}
{/* EMAIL - Try both ownerDetails and partnerDetails */}
          {/* RESTAURANT EMAIL */}
<TableCell className="text-[#1D1929] text-xs font-normal font-roboto">
  {data?.email || "N/A"}
</TableCell>

{/* RESTAURANT PHONE NUMBER */}
{/* RESTAURANT PHONE NUMBER - Try multiple paths */}
<TableCell className="text-[#1D1929] text-xs font-normal font-roboto">
  {data?.contactDetails?.phoneNumber || 
   data?.phone || 
   data?.phoneNumber ||
   data?.basicInfo?.phone ||
   data?.contact?.phoneNumber ||
   "N/A"}
</TableCell>




        <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
          <span
            className={`${data?.status === "PENDING" && "text-[#FFC107]"} ${
              data?.status === "APPROVED" && "text-[#28A745]"} ${
              data?.status === "REJECTED" && "text-[#DC3545]"} ${
              data?.status === "SUSPENDED" && "text-[#6C757D]"}`}
          >
            {data?.status}
          </span>
        </TableCell>

        {/* API-Driven Open/Close Toggle */}
        <TableCell className="font-sans">
          <StatusToggleButton
            active={isOpen}
            loading={statusLoading}
            disabled
            activeLabel="Open"
            inactiveLabel="Closed"
            className="mb-1"
          />
          <div className="text-[10px] text-gray-500 mt-0.5">
            {timingDetail && (isOpen
              ? (timingDetail.closesAt ? `Closes at: ${timingDetail.closesAt}` : '')
              : (timingDetail.opensAt ? `Opens at: ${timingDetail.opensAt}` : '')
            )}
          </div>
        </TableCell>

        {/* Actions */}
        <TableCell className="font-sans">
          <div className="flex gap-2 items-center">
            <button
              onClick={handleView}
              title="View Details"
              className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100"
            >
              <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700" />
            </button>
            <button
              onClick={handleEdit}
              title="Edit"
              className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100"
            >
              <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
            </button>
            <button
              onClick={handleRemove}
              title="Delete"
              className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100"
            >
              <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700" />
            </button>
          </div>
        </TableCell>
      </TableRow>

      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Restaurant"
          description="Are you sure you want to delete this restaurant? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteRestaurant}
        />
      )}
    </>
  )
}

export default SingleRestaurantComp


























// import { Checkbox } from '@/components/ui/checkbox'
// import { TableCell, TableRow } from '@/components/ui/table'
// import useDeleteApiReq from '@/hooks/useDeleteApiReq'
// import { format } from 'date-fns'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AlertModal from '../AlertModal'
// import StatusToggleButton from '@/components/ui/statusButton' // << IMPORTANT: Ensure this is created!
// import { Eye, Edit, Trash2 } from "lucide-react";

// const SingleRestaurantComp = ({ data, getAllRestaurant }) => {
//   const navigate = useNavigate();
//   const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

//   // Real-time status state
//   const [statusLoading, setStatusLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [timingDetail, setTimingDetail] = useState(null);

//   // Fetch real-time restaurant open/close status on mount
//   useEffect(() => {
//     let ignore = false;
//     const fetchStatus = async () => {
//       setStatusLoading(true);
//       try {
//         const res = await fetch(
//           `/api/v1/restaurant/Restaurant-timings?restaurantId=${data.id}`
//         );
//         const json = await res.json();
//         if (!ignore) {
//           setIsOpen(json?.data?.currentStatus?.isOpen || false);
//           setTimingDetail(json?.data?.currentStatus || null);
//         }
//       } catch (err) {
//         setIsOpen(false);
//         setTimingDetail(null);
//       }
//       setStatusLoading(false);
//     };
//     if (data && data.id) fetchStatus();
//     return () => { ignore = true; };
//   }, [data.id]);

//   // Handler for view (use navigate, or open modal as you prefer!)
//   const handleView = () => {
//     navigate(`/admin/restaurant/${data?.id}/dashboard`, { state: { mode: 'view' } });
//   };

//   // Handler for edit (edit mode)
//   const handleEdit = () => {
//     navigate(`/admin/restaurant/${data?.id}/dashboard`, { state: { mode: 'edit' } });
//   };

//   const handleRemove = () => {
//     setIsAlertModalOpen(true);
//   }

//   const { res, fetchData, isLoading } = useDeleteApiReq();

//   const deleteRestaurant = () => {
//     fetchData(`/admin/delete-restaurant?restaurantId=${data?.id}`);
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       getAllRestaurant();
//     }
//   }, [res]);

//   return (
//     <>
//       <TableRow>
//         <TableCell className="w-10">
//           <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
//         </TableCell>
//         <TableCell className="text-[#1D1929] text-xs whitespace-nowrap font-normal font-sans">
//           {data?.customRestaurantId || "N/A"}
//         </TableCell>
//         <TableCell className="text-[#1D1929] text-xs font-bold font-sans w-60">
//           {data?.name}
//         </TableCell>
//         <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
//           {data?.createdAt
//             ? format(
//                 typeof data?.createdAt === "number"
//                   ? new Date(data?.createdAt)
//                   : new Date(data?.createdAt),
//                 "MMMM yyyy"
//               )
//             : "N/A"}
//         </TableCell>
//         <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">
//           {`${data?.location?.address || ""}${data?.location?.city ? `, ${data?.location?.city}` : ""}${data?.location?.state ? `, ${data?.location?.state}` : ""}${data?.location?.pinCode ? `, ${data?.location?.pinCode}` : ""}`}
//         </TableCell>
//         <TableCell className="text-[#000000] text-xs font-semibold font-inter">
//           {data?.sales?.total ? `₹${data?.sales?.total}` : "N/A"}
//         </TableCell>
//         <TableCell className="text-[#1D1929] text-xs font-semibold font-inter">
//           {data?.sales?.last ? `₹${data?.sales?.last}` : "N/A"}
//         </TableCell>
//         <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
//           <span
//             className={`${data?.status === "PENDING" && "text-[#FFC107]"} ${
//               data?.status === "APPROVED" && "text-[#28A745]"
//             } ${data?.status === "REJECTED" && "text-[#DC3545]"} ${
//               data?.status === "SUSPENDED" && "text-[#6C757D]"
//             }`}
//           >
//             {data?.status}
//           </span>
//         </TableCell>

//         {/* Real-time status toggle */}
//         <TableCell className="font-sans">
//           <StatusToggleButton
//             active={isOpen}
//             loading={statusLoading}
//             // onClick={} // If you want admin control, implement a handler here and add backend logic
//             disabled
//             activeLabel="Open"
//             inactiveLabel="Closed"
//           />
//           <div className="text-[10px] text-gray-500 mt-0.5">
//             {timingDetail && (isOpen
//               ? timingDetail.nextClosingTime && `Closes at: ${timingDetail.nextClosingTime}`
//               : timingDetail.nextOpeningTime && `Opens at: ${timingDetail.nextOpeningTime}`)}
//           </div>
//         </TableCell>

//         {/* Actions: Icon Buttons for View, Edit, Delete */}
//         <TableCell className="font-sans">
//           <div className="flex gap-2 items-center">
//             {/* View */}
//             <button
//               onClick={handleView}
//               className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//               title="View Details"
//             >
//               <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
//               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//             </button>

//             {/* Edit */}
//             <button
//               onClick={handleEdit}
//               className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//               title="Edit"
//             >
//               <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
//               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//             </button>

//             {/* Delete */}
//             <button
//               onClick={handleRemove}
//               className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//               title="Delete"
//             >
//               <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
//               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//             </button>
//           </div>
//         </TableCell>
//       </TableRow>

//       {isAlertModalOpen && (
//         <AlertModal
//           isAlertModalOpen={isAlertModalOpen}
//           setIsAlertModalOpen={setIsAlertModalOpen}
//           header="Delete Restaurant"
//           description="Are you sure you want to delete this restaurant? This action cannot be undone."
//           disabled={isLoading}
//           onConfirm={deleteRestaurant}
//         />
//       )}
//     </>
//   );
// };

// export default SingleRestaurantComp;