/* eslint-disable react/prop-types */
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import { Button } from "./ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

const Subadmin = ({ subadmin, getAllSubadmins }) => {
  const navigate = useNavigate();
  const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(subadmin?.isActive || false);

  const { res, fetchData, isLoading } = useDeleteApiReq();
  const {
    res: toggleRes,
    fetchData: toggleStatusAPI,
    isLoading: isToggling,
  } = usePatchApiReq();

  const deleteSubadmin = () => {
    fetchData(`/admin/delete-subadmin?subAdminId=${subadmin._id}`);
  };

  const handleToggle = async () => {
    const newStatus = !toggleStatus;
    setToggleStatus(newStatus);
    
    try {
      await toggleStatusAPI(`/admin/toggle-status/${subadmin._id}`);
      // Refresh the list after successful toggle
      getAllSubadmins();
    } catch (error) {
      // Revert status on error
      setToggleStatus(!newStatus);
      console.error('Toggle failed:', error);
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("subadims res", res);
      getAllSubadmins();
    }
  }, [res]);

  useEffect(() => {
    if (toggleRes?.status === 200 || toggleRes?.status === 201) {
      console.log("toggle status res", toggleRes);
      // Refresh the list after successful toggle
      getAllSubadmins();
    }
  }, [toggleRes]);

  const handleView = () => {
    navigate("/admin/sub-admin/edit-subadmin", {
      state: { 
        subadminId: subadmin._id,
        mode: 'view' // This makes the form read-only
      },
    });
  };

  const handleEdit = () => {
    navigate("/admin/sub-admin/edit-subadmin", {
      state: { 
        subadminId: subadmin._id,
        mode: 'edit' // This makes the form editable
      },
    });
  };

  const handleRemove = () => {
    setIsAlertDeleteModalOpen(true);
  };

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
        </TableCell>
        <TableCell className="text-[#252525] text-sm whitespace-nowrap font-medium font-roboto">
          {subadmin?.customAdminId || "N/A"}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.name}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.position}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.email}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.phone}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.cityName || subadmin.city || "N/A"}
        </TableCell>
        
        {/* NEW: Status Toggle Column */}
        <TableCell>
          <div className="flex items-center gap-2">
            {/* Professional Toggle Switch */}
            <button
              onClick={handleToggle}
              disabled={isToggling}
              className={`group relative inline-flex h-7 w-12 items-center rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                toggleStatus 
                  ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-500 focus:ring-green-500 shadow-lg shadow-green-200/50' 
                  : 'bg-gradient-to-r from-orange-400 to-orange-500 border-orange-500 focus:ring-orange-500 shadow-lg shadow-orange-200/50'
              } ${isToggling ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl transform hover:scale-105 active:scale-95'}`}
              title={toggleStatus ? 'Deactivate' : 'Activate'}
            >
              {/* Toggle Circle */}
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
                  toggleStatus ? 'translate-x-6' : 'translate-x-0.5'
                } ${isToggling ? '' : 'group-hover:shadow-xl'}`}
              >
                {/* Inner highlight for professional look */}
                <span className={`absolute inset-0.5 rounded-full ${
                  toggleStatus ? 'bg-green-100' : 'bg-orange-100'
                } opacity-50`}></span>
              </span>
              
              {/* Ripple effect on hover */}
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                toggleStatus ? 'bg-green-300' : 'bg-orange-300'
              }`}></div>
            </button>
            
            {/* Status Text */}
            <span className={`text-xs font-medium transition-colors duration-300 ${
              toggleStatus ? 'text-green-600' : 'text-orange-600'
            }`}>
              {toggleStatus ? 'Active' : 'Inactive'}
            </span>
          </div>
        </TableCell>

        <TableCell>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              {/* View Details Button - Green Theme */}
              <button 
                onClick={handleView}
                className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                title="View Details"
              >
                <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </button>
              
              {/* Edit Button - Purple Theme */}
              <button 
                onClick={handleEdit}
                className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                title="Edit"
              >
                <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </button>
              
              {/* Delete Button - Red Theme */}
              <button 
                onClick={handleRemove}
                className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </TableCell>
      </TableRow>

      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertDeleteModalOpen}
          setIsAlertModalOpen={setIsAlertDeleteModalOpen}
          header="Delete Subadmin"
          description="Are you sure you want to delete this subadmin? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteSubadmin}
        />
      )}
    </>
  );
};

export default Subadmin;




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
