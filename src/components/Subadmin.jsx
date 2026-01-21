

/* eslint-disable react/prop-types */
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import { Eye, Edit, Trash2 } from "lucide-react";

const Subadmin = ({ subadmin, getAllSubadmins }) => {
  const navigate = useNavigate();
  const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);

  // Status toggle logic
  const [status, setStatus] = useState(subadmin.status === "active");
  const { fetchData: toggleStatusAPI, isLoading: isToggleLoading } = usePatchApiReq();

  useEffect(() => {
    setStatus(subadmin.status === "active"); // always reflect latest from backend
  }, [subadmin.status]);

  const handleStatusToggle = async () => {
    const nextStatus = !status;
    setStatus(nextStatus); // Optimistic UI
    try {
      await toggleStatusAPI(`/admin/toggle-status/${subadmin._id}`, {
        status: nextStatus ? "active" : "inactive",
        subAdminId: subadmin._id,
      });
      getAllSubadmins(); // server is the source of truth
    } catch {
      setStatus(!nextStatus); // revert on error
    }
  };

  // Delete logic
  const { res: deleteRes, fetchData: deleteApi, isLoading: isDeleting } = useDeleteApiReq();
  const handleRemove = () => setIsAlertDeleteModalOpen(true);
  const deleteSubadmin = () => {
    deleteApi(`/admin/delete-subadmin?subAdminId=${subadmin._id}`);
  };
  useEffect(() => {
    if (deleteRes?.status === 200 || deleteRes?.status === 201) {
      setIsAlertDeleteModalOpen(false);
      getAllSubadmins();
    }
  }, [deleteRes, getAllSubadmins]);

  // View/Edit
  const handleView = () =>
    navigate("/admin/sub-admin/edit-subadmin", {
      state: {
        subadminId: subadmin._id,
        mode: "view",
      },
    });
  const handleEdit = () =>
    navigate("/admin/sub-admin/edit-subadmin", {
      state: {
        subadminId: subadmin._id,
        mode: "edit",
      },
    });

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
        </TableCell>
        <TableCell className="text-[#252525] text-sm whitespace-nowrap font-medium font-roboto">
          {subadmin?.customAdminId || subadmin.adminId || subadmin._id || "N/A"}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">{subadmin.name}</TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">{subadmin.position}</TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">{subadmin.email}</TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">{subadmin.phone}</TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin?.city?.city || "N/A"}
        </TableCell>
        {/* Live Status Toggle */}
        <TableCell>
          <div className="flex items-center gap-2">
            <button
              type="button"
              // Not disabled for physical clicking
              onClick={handleStatusToggle}
              className={
                `group relative inline-flex h-7 w-12 items-center rounded-full border-2 transition-all duration-300 ease-in-out ` +
                (status
                  ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-500 focus:ring-green-500 shadow-lg shadow-green-200/50'
                  : 'bg-gradient-to-r from-orange-400 to-orange-500 border-orange-500 focus:ring-orange-500 shadow-lg shadow-orange-200/50')
              }
              title={status ? 'Active' : 'Inactive'}
              disabled={isToggleLoading}
              style={{ opacity: isToggleLoading ? 0.7 : 1, cursor: isToggleLoading ? "not-allowed" : "pointer" }}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out
                  ${status ? 'translate-x-6' : 'translate-x-0.5'}`}
              >
                <span className={`absolute inset-0.5 rounded-full
                  ${status ? 'bg-green-100' : 'bg-orange-100'} opacity-50`}></span>
              </span>
              <div
                className={`absolute inset-0 rounded-full opacity-0
              ${status ? 'bg-green-300' : 'bg-orange-300'}`}>
              </div>
            </button>
            <span className={`text-xs font-medium transition-colors duration-300 
              ${status ? 'text-green-600' : 'text-orange-600'}`}>
              {isToggleLoading ? "Updating..." : status ? 'Active' : 'Inactive'}
            </span>
          </div>
        </TableCell>
        {/* Actions */}
        <TableCell>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleView}
              className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              title="View Details"
            >
              <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={handleEdit}
              className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              title="Edit"
            >
              <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={handleRemove}
              className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              title="Delete"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          </div>
        </TableCell>
      </TableRow>

      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertDeleteModalOpen}
          setIsAlertModalOpen={setIsAlertDeleteModalOpen}
          header="Delete Subadmin"
          description="Are you sure you want to delete this subadmin? This action cannot be undone."
          disabled={isDeleting}
          onConfirm={deleteSubadmin}
        />
      )}
    </>
  );
};

export default Subadmin;
















































// const Subadmin = ({ subadmin, getAllSubadmins }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);
  
//   // **FIX**: Only use server data on initial mount, then preserve local state
//   const [toggleStatus, setToggleStatus] = useState(subadmin?.status || false);
//   const hasInitializedRef = useRef(false);
//   const isMountedRef = useRef(true);

//   const { res, fetchData, isLoading } = useDeleteApiReq();
//   const {
//     res: toggleRes,
//     fetchData: toggleStatusAPI,
//     isLoading: isToggling,
//   } = usePatchApiReq();

//   // **CRITICAL FIX**: Only sync state on initial mount, not on every prop change
//   useEffect(() => {
//     if (!hasInitializedRef.current && subadmin?.status !== undefined) {
//       setToggleStatus(subadmin.status);
//       hasInitializedRef.current = true;
//       console.log(`Initialized ${subadmin.name} toggle status: ${subadmin.status}`);
//     }
//   }, [subadmin?.status, subadmin?.name]);

//   // **REMOVED**: Page visibility and focus event handlers that were causing auto-refresh

//   useEffect(() => {
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   const deleteSubadmin = () => {
//     fetchData(`/admin/delete-subadmin?subAdminId=${subadmin._id}`);
//   };

//   // **FIX**: Enhanced toggle that doesn't auto-refresh after success
//   const handleToggle = useCallback(async () => {
//     if (isToggling) return;
    
//     const newStatus = !toggleStatus;
//     const previousStatus = toggleStatus;
    
//     console.log(`Manually toggling ${subadmin.name}: ${previousStatus} -> ${newStatus}`);
    
//     // Optimistically update local state
//     setToggleStatus(newStatus);
    
//     try {
//       const response = await toggleStatusAPI(`/admin/toggle-status/${subadmin._id}`, {
//         status: newStatus,
//         subAdminId: subadmin._id
//       });

//       if (response?.status === 200 || response?.status === 201) {
//         console.log(`Successfully toggled ${subadmin.name} to ${newStatus}`);
//         // **REMOVED**: Automatic refresh that was overwriting the state
//       } else {
//         throw new Error('Toggle API returned non-success status');
//       }
      
//     } catch (error) {
//       if (isMountedRef.current) {
//         setToggleStatus(previousStatus);
//         console.error(`Toggle failed for ${subadmin.name}, reverting to ${previousStatus}`);
//       }
//     }
//   }, [toggleStatus, isToggling, toggleStatusAPI, subadmin._id, subadmin.name]);

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("subadmin deleted", res);
//       getAllSubadmins();
//     }
//   }, [res, getAllSubadmins]);

//   // **FIX**: Remove automatic refresh after toggle success
//   useEffect(() => {
//     if (toggleRes?.status === 200 || toggleRes?.status === 201) {
//       console.log("toggle status updated successfully", toggleRes);
//       // **REMOVED**: getAllSubadmins() call that was causing state reset
//     } else if (toggleRes && toggleRes.status >= 400) {
//       console.error('Toggle API error:', toggleRes);
//     }
//   }, [toggleRes]);

//   const handleView = () => {
//     navigate("/admin/sub-admin/edit-subadmin", {
//       state: { 
//         subadminId: subadmin._id,
//         mode: 'view'
//       },
//     });
//   };

//   const handleEdit = () => {
//     navigate("/admin/sub-admin/edit-subadmin", {
//       state: { 
//         subadminId: subadmin._id,
//         mode: 'edit'
//       },
//     });
//   };

//   const handleRemove = () => {
//     setIsAlertDeleteModalOpen(true);
//   };

//   return (
//     <>
//       <TableRow>
//         <TableCell className="w-10">
//           <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm whitespace-nowrap font-medium font-roboto">
//           {subadmin?.customAdminId || "N/A"}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.name}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.position}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.email}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.phone}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.cityName || subadmin.city || "N/A"}
//         </TableCell>
        
//         <TableCell>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleToggle}
//               disabled={isToggling}
//               className={`group relative inline-flex h-7 w-12 items-center rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//                 toggleStatus 
//                   ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-500 focus:ring-green-500 shadow-lg shadow-green-200/50' 
//                   : 'bg-gradient-to-r from-orange-400 to-orange-500 border-orange-500 focus:ring-orange-500 shadow-lg shadow-orange-200/50'
//               } ${isToggling ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl transform hover:scale-105 active:scale-95'}`}
//               title={toggleStatus ? 'Deactivate' : 'Activate'}
//             >
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
//                   toggleStatus ? 'translate-x-6' : 'translate-x-0.5'
//                 } ${isToggling ? '' : 'group-hover:shadow-xl'}`}
//               >
//                 <span className={`absolute inset-0.5 rounded-full ${
//                   toggleStatus ? 'bg-green-100' : 'bg-orange-100'
//                 } opacity-50`}></span>
//               </span>
              
//               <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
//                 toggleStatus ? 'bg-green-300' : 'bg-orange-300'
//               }`}></div>
//             </button>
            
//             <span className={`text-xs font-medium transition-colors duration-300 ${
//               toggleStatus ? 'text-green-600' : 'text-orange-600'
//             }`}>
//               {isToggling ? 'Updating...' : (toggleStatus ? 'Active' : 'Inactive')}
//             </span>
//           </div>
//         </TableCell>

//         <TableCell>
//           <div className="flex gap-2 items-center">
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={handleView}
//                 className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//                 title="View Details"
//               >
//                 <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
//                 <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </button>
              
//               <button 
//                 onClick={handleEdit}
//                 className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//                 title="Edit"
//               >
//                 <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
//                 <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </button>
              
//               <button 
//                 onClick={handleRemove}
//                 className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//                 title="Delete"
//               >
//                 <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
//                 <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </button>
//             </div>
//           </div>
//         </TableCell>
//       </TableRow>

//       {isAlertDeleteModalOpen && (
//         <AlertModal
//           isAlertModalOpen={isAlertDeleteModalOpen}
//           setIsAlertModalOpen={setIsAlertDeleteModalOpen}
//           header="Delete Subadmin"
//           description="Are you sure you want to delete this subadmin? This action cannot be undone."
//           disabled={isLoading}
//           onConfirm={deleteSubadmin}
//         />
//       )}
//     </>
//   );
// };

// export default Subadmin;




// /* eslint-disable react/prop-types */
// import { Checkbox } from "@/components/ui/checkbox";
// import { TableCell, TableRow } from "@/components/ui/table";
// import useDeleteApiReq from "@/hooks/useDeleteApiReq";
// import usePatchApiReq from "@/hooks/usePatchApiReq";
// import { useEffect, useState, useCallback, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AlertModal from "./AlertModal";
// import { Button } from "./ui/button";
// import { Eye, Edit, Trash2 } from "lucide-react";

// const Subadmin = ({ subadmin, getAllSubadmins }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);
  
//   // Use a ref to track the actual server state
//   const serverStatusRef = useRef(subadmin?.status || false);
//   const [toggleStatus, setToggleStatus] = useState(subadmin?.status || false);
  
//   // Track if component is mounted to prevent state updates on unmounted components
//   const isMountedRef = useRef(true);

//   const { res, fetchData, isLoading } = useDeleteApiReq();
//   const {
//     res: toggleRes,
//     fetchData: toggleStatusAPI,
//     isLoading: isToggling,
//   } = usePatchApiReq();

//   // **KEY FIX 1**: Sync state with server data when subadmin prop changes
//   useEffect(() => {
//     if (subadmin?.status !== undefined) {
//       serverStatusRef.current = subadmin.status;
//       setToggleStatus(subadmin.status);
//     }
//   }, [subadmin?.status, subadmin?._id]); // Include _id to handle different subadmins

//   // **KEY FIX 2**: Handle page visibility and focus events
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible') {
//         // Refresh data when user returns to the page
//         getAllSubadmins();
//       }
//     };

//     const handleFocus = () => {
//       // Refresh data when window regains focus
//       getAllSubadmins();
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('focus', handleFocus);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [getAllSubadmins]);

//   // **KEY FIX 3**: Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   const deleteSubadmin = () => {
//     fetchData(`/admin/delete-subadmin?subAdminId=${subadmin._id}`);
//   };

//   // **KEY FIX 4**: Enhanced toggle with proper error handling and state persistence
//   const handleToggle = useCallback(async () => {
//     if (isToggling) return; // Prevent multiple simultaneous calls
    
//     const newStatus = !toggleStatus;
//     const previousStatus = toggleStatus;
    
//     // Optimistically update local state
//     setToggleStatus(newStatus);
    
//     try {
//       // Make API call with proper payload structure
//       const response = await toggleStatusAPI(`/admin/toggle-status/${subadmin._id}`, {
//         status: newStatus,
//         subAdminId: subadmin._id
//       });

//       // Update server status ref only on successful response
//       if (response?.status === 200 || response?.status === 201) {
//         serverStatusRef.current = newStatus;
//       }
      
//     } catch (error) {
//       // Revert to previous state on error if component is still mounted
//       if (isMountedRef.current) {
//         setToggleStatus(previousStatus);
//         serverStatusRef.current = previousStatus;
//       }
//       console.error('Toggle failed:', error);
      
//       // Optional: Show user-friendly error message
//       // You can implement toast notifications here
//     }
//   }, [toggleStatus, isToggling, toggleStatusAPI, subadmin._id]);

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("subadmin deleted", res);
//       getAllSubadmins();
//     }
//   }, [res, getAllSubadmins]);

//   useEffect(() => {
//     if (toggleRes?.status === 200 || toggleRes?.status === 201) {
//       console.log("toggle status updated", toggleRes);
//       // Only refresh if the component is still mounted
//       if (isMountedRef.current) {
//         // Debounce the refresh to prevent excessive API calls
//         const timeoutId = setTimeout(() => {
//           getAllSubadmins();
//         }, 100);
        
//         return () => clearTimeout(timeoutId);
//       }
//     }
//   }, [toggleRes, getAllSubadmins]);

//   const handleView = () => {
//     navigate("/admin/sub-admin/edit-subadmin", {
//       state: { 
//         subadminId: subadmin._id,
//         mode: 'view'
//       },
//     });
//   };

//   const handleEdit = () => {
//     navigate("/admin/sub-admin/edit-subadmin", {
//       state: { 
//         subadminId: subadmin._id,
//         mode: 'edit'
//       },
//     });
//   };

//   const handleRemove = () => {
//     setIsAlertDeleteModalOpen(true);
//   };

//   return (
//     <>
//       <TableRow>
//         <TableCell className="w-10">
//           <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm whitespace-nowrap font-medium font-roboto">
//           {subadmin?.customAdminId || "N/A"}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.name}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.position}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.email}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.phone}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.cityName || subadmin.city || "N/A"}
//         </TableCell>
        
//         {/* Status Toggle Column with Visual Feedback */}
//         <TableCell>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleToggle}
//               disabled={isToggling}
//               className={`group relative inline-flex h-7 w-12 items-center rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//                 toggleStatus 
//                   ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-500 focus:ring-green-500 shadow-lg shadow-green-200/50' 
//                   : 'bg-gradient-to-r from-orange-400 to-orange-500 border-orange-500 focus:ring-orange-500 shadow-lg shadow-orange-200/50'
//               } ${isToggling ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl transform hover:scale-105 active:scale-95'}`}
//               title={toggleStatus ? 'Deactivate' : 'Activate'}
//             >
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
//                   toggleStatus ? 'translate-x-6' : 'translate-x-0.5'
//                 } ${isToggling ? '' : 'group-hover:shadow-xl'}`}
//               >
//                 <span className={`absolute inset-0.5 rounded-full ${
//                   toggleStatus ? 'bg-green-100' : 'bg-orange-100'
//                 } opacity-50`}></span>
//               </span>
              
//               <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
//                 toggleStatus ? 'bg-green-300' : 'bg-orange-300'
//               }`}></div>
//             </button>
            
//             <span className={`text-xs font-medium transition-colors duration-300 ${
//               toggleStatus ? 'text-green-600' : 'text-orange-600'
//             }`}>
//               {isToggling ? 'Updating...' : (toggleStatus ? 'Active' : 'Inactive')}
//             </span>
//           </div>
//         </TableCell>

//         <TableCell>
//           <div className="flex gap-2 items-center">
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={handleView}
//                 className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//                 title="View Details"
//               >
//                 <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
//                 <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </button>
              
//               <button 
//                 onClick={handleEdit}
//                 className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//                 title="Edit"
//               >
//                 <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
//                 <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </button>
              
//               <button 
//                 onClick={handleRemove}
//                 className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//                 title="Delete"
//               >
//                 <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
//                 <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </button>
//             </div>
//           </div>
//         </TableCell>
//       </TableRow>

//       {isAlertDeleteModalOpen && (
//         <AlertModal
//           isAlertModalOpen={isAlertDeleteModalOpen}
//           setIsAlertModalOpen={setIsAlertDeleteModalOpen}
//           header="Delete Subadmin"
//           description="Are you sure you want to delete this subadmin? This action cannot be undone."
//           disabled={isLoading}
//           onConfirm={deleteSubadmin}
//         />
//       )}
//     </>
//   );
// };

// export default Subadmin;





// /* eslint-disable react/prop-types */
// import { Checkbox } from "@/components/ui/checkbox";
// import { TableCell, TableRow } from "@/components/ui/table";
// import useDeleteApiReq from "@/hooks/useDeleteApiReq";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AlertModal from "./AlertModal";
// import { Button } from "./ui/button";
// import { Eye, Edit, Trash2 } from "lucide-react";

// const Subadmin = ({ subadmin, getAllSubadmins }) => {
//   const navigate = useNavigate();
//   const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);

//   const { res, fetchData, isLoading } = useDeleteApiReq();

//   const deleteSubadmin = () => {
//     fetchData(`/admin/delete-subadmin?subAdminId=${subadmin._id}`);
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("subadims res", res);
//       getAllSubadmins();
//     }
//   }, [res]);

//   // const handleEdit = () => {
//   //   navigate("/admin/sub-admin/edit-subadmin", {
//   //     state: { subadminId: subadmin._id },
//   //   });
//   // };
//   const handleView = () => {
//     navigate("/admin/sub-admin/edit-subadmin", {
//       state: { 
//         subadminId: subadmin._id,
//         mode: 'view' // This makes the form read-only
//       },
//     });
//   };

//   //  MODIFY THIS: Handler for EDIT button - editable mode
//   const handleEdit = () => {
//     navigate("/admin/sub-admin/edit-subadmin", {
//       state: { 
//         subadminId: subadmin._id,
//         mode: 'edit' // This makes the form editable
//       },
//     });
//   };
//   const handleRemove = () => {
//     setIsAlertDeleteModalOpen(true);
//   };

//   return (
//     <>
//       <TableRow>
//         <TableCell className="w-10">
//           <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm whitespace-nowrap font-medium font-roboto">
//           {subadmin?.customAdminId || "N/A"}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.name}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.position}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.email}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.phone}
//         </TableCell>
//         <TableCell className="text-[#252525] text-sm font-medium font-roboto">
//           {subadmin.cityName || subadmin.city || "N/A"}
//         </TableCell>
//         <TableCell>
//           <div className="flex gap-2 items-center">
//             {/* <Button onClick={handleEdit} size="xs" variant="capsico">
//               Edit
//             </Button>
//             <Button onClick={handleRemove} size="xs" variant="destructive">
//               Remove
//             </Button> */}

//  <div className="flex items-center gap-2">
//   {/* View Details Button - Green Theme */}
//   <button 
//     onClick={handleView}
//     className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//     title="View Details"
//   >
//     <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
//     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//   </button>
  
//   {/* Edit Button - Purple Theme */}
//   <button 
//     onClick={handleEdit}
//     className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//     title="Edit"
//   >
//     <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
//     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//   </button>
  
//   {/* Delete Button - Red Theme (unchanged) */}
//   <button 
//     onClick={handleRemove}
//     className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
//     title="Delete"
//   >
//     <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
//     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//   </button>
// </div>


//           </div>
//         </TableCell>
//       </TableRow>

//       {isAlertDeleteModalOpen && (
//         <AlertModal
//           isAlertModalOpen={isAlertDeleteModalOpen}
//           setIsAlertModalOpen={setIsAlertDeleteModalOpen}
//           header="Delete Subadmin"
//           description="Are you sure you want to delete this subadmin? This action cannot be undone."
//           disabled={isLoading}
//           onConfirm={deleteSubadmin}
//         />
//       )}
//     </>
//   );
// };

// export default Subadmin;
