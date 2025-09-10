// // components/BannerComp.jsx
// import usePatchApiReq from "@/hooks/usePatchApiReq";
// import useDeleteApiReq from "@/hooks/useDeleteApiReq";
// import { Edit, Trash2, Eye } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AlertModal from "../AlertModal";
// import { Button } from "../ui/button";
// import { Switch } from "../ui/switch";
// import { TableCell, TableRow } from "../ui/table";

// const BannerComp = ({ banner, getBanners }) => {
//   const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const { res, fetchData } = usePatchApiReq();
//   const {
//     res: deleteRes,
//     fetchData: deleteBanner,
//     isLoading: isDeleteBannerLoading,
//   } = useDeleteApiReq();

//   console.log("banner", banner);

//   const {
//     _id,
//     title,
//     city,
//     bannerType,
//     radius,
//     description,
//     createdAt,
//     images = [],
//      startTime,
//     endTime,
//     // Assuming isActive field exists, if not, default to true
//     isActive = true,
//   } = banner || {};


//  const formatTime = (time) =>
//     time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';


//   const [isActiveState, setIsActiveState] = useState(isActive);

//   const handleRemove = () => {
//     setIsAlertDeleteModalOpen(true);
//   };

//   const handleUpdate = () => {
//     navigate(`/admin/content-management/edit/${_id}`, { state: { banner } });
//   };

//   const handleView = () => {
//     // Implement view functionality - could open modal or navigate to detail page
//     console.log("View banner:", banner);
//   };

//   const toggleStatus = () => {
//     setIsActiveState((prev) => !prev);
//     fetchData(`/banner/${_id}/status`, {
//       isActive: !isActiveState,
//     });
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("toggleStatus res", res);
//     }
//   }, [res]);

//   const deleteBannerFun = () => {
//     deleteBanner(`/banner/delete/${_id}`);
//   };

//   useEffect(() => {
//     if (deleteRes?.status === 200 || deleteRes?.status === 201) {
//       console.log("deleteRes res", deleteRes);
//       getBanners();
//     }
//   }, [deleteRes, getBanners]);

//   return (
//     <>
//       <TableRow>
//         <TableCell>{title}</TableCell>
//         <TableCell>{city}</TableCell>
//         <TableCell>
//           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//             bannerType === 'capsico' ? 'bg-blue-100 text-blue-800' :
//             bannerType === 'quickly' ? 'bg-green-100 text-green-800' :
//             bannerType === 'global' ? 'bg-purple-100 text-purple-800' :
//             'bg-gray-100 text-gray-800'
//           }`}>
//             {bannerType}
//           </span>
//         </TableCell>
//         <TableCell>{radius} km</TableCell>
//         <TableCell>
//           <div className="max-w-xs truncate" title={description}>
//             {description || 'No description'}
//           </div>
//         </TableCell>
//         <TableCell>{images.length} images</TableCell>
//         <TableCell>
//           {new Date(createdAt).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//           })}
//         </TableCell>



//                 <TableCell>{images.length} images</TableCell>
//         <TableCell>{formatTime(startTime)}</TableCell>
//         <TableCell>{formatTime(endTime)}</TableCell>
//         <TableCell>
//           {new Date(createdAt).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//           })}
//         </TableCell>
        
//         <TableCell>
//           <div className="space-y-2">
//             <p className="text-sm">{isActiveState ? "Active" : "Inactive"}</p>
//             <Switch
//               checked={isActiveState}
//               onCheckedChange={toggleStatus}
//               className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
//             />
//           </div>
//         </TableCell>
//         <TableCell>
//           <div className="flex gap-2 items-center">
//             <Button onClick={handleView} variant="outline" size="icon">
//               <Eye className="h-4 w-4 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
//             </Button>
//             <Button onClick={handleUpdate} variant="update" size="icon">
//               <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
//             </Button>
//             <Button onClick={handleRemove} variant="delete" size="icon">
//               <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
//             </Button>
//           </div>
//         </TableCell>



//       </TableRow>
//       {isAlertDeleteModalOpen && (
//         <AlertModal
//           isAlertModalOpen={isAlertDeleteModalOpen}
//           setIsAlertModalOpen={setIsAlertDeleteModalOpen}
//           header="Delete Banner"
//           description="Are you sure you want to delete this banner? This action cannot be undone."
//           disabled={isDeleteBannerLoading}
//           onConfirm={deleteBannerFun}
//         />
//       )}
//     </>
//   );
// };

// export default BannerComp;
// components/BannerComp.jsx
import usePatchApiReq from "@/hooks/usePatchApiReq";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { Edit, Trash2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { TableCell, TableRow } from "../ui/table";

const BannerComp = ({ banner, getBanners }) => {
  const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { res, fetchData } = usePatchApiReq();
  const {
    res: deleteRes,
    fetchData: deleteBanner,
    isLoading: isDeleteBannerLoading,
  } = useDeleteApiReq();

  const {
    _id,
    title,
    city,
    bannerType,
    radius,
    description,
    createdAt,
    images = [],
    startTime,
    endTime,
    isActive = true,
  } = banner || {};

  const formatTime = (time) =>
    time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';

  const [isActiveState, setIsActiveState] = useState(isActive);

  const handleRemove = () => {
    setIsAlertDeleteModalOpen(true);
  };

  const handleUpdate = () => {
    navigate(`/admin/content-management/edit/${_id}`, { state: { banner } });
  };

  const handleView = () => {
    console.log("View banner:", banner);
  };

  const toggleStatus = () => {
    setIsActiveState((prev) => !prev);
    fetchData(`/banner/${_id}/status`, {
      isActive: !isActiveState,
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("toggleStatus res", res);
    }
  }, [res]);

  const deleteBannerFun = () => {
    deleteBanner(`/banner/delete/${_id}`);
  };

  useEffect(() => {
    if (deleteRes?.status === 200 || deleteRes?.status === 201) {
      console.log("deleteRes res", deleteRes);
      getBanners();
    }
  }, [deleteRes, getBanners]);

  return (
    <>
      <TableRow>
        {/* Title */}
        <TableCell className="px-6 py-4 font-medium">
          {title || 'Untitled'}
        </TableCell>
        
        {/* City */}
        <TableCell className="px-6 py-4">
          {city || 'N/A'}
        </TableCell>
        
        {/* Banner Type */}
        <TableCell className="px-6 py-4">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            bannerType === 'capsico' ? 'bg-blue-100 text-blue-800' :
            bannerType === 'quickly' ? 'bg-green-100 text-green-800' :
            bannerType === 'global' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {bannerType}
          </span>
        </TableCell>
        
        {/* Radius */}
        <TableCell className="px-6 py-4">
          {radius ? `${radius} km` : 'N/A'}
        </TableCell>
        
        {/* Description */}
        <TableCell className="px-6 py-4">
          <div className="max-w-xs truncate" title={description}>
            {description || 'No description'}
          </div>
        </TableCell>
        
        {/* Images */}
        <TableCell className="px-6 py-4">
          <span className="text-sm text-gray-600">
            {images.length} image{images.length !== 1 ? 's' : ''}
          </span>
        </TableCell>
        
        {/* Date */}
        <TableCell className="px-6 py-4">
          {createdAt ? new Date(createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'N/A'}
        </TableCell>
        
        {/* Start Time */}
        <TableCell className="px-6 py-4">
          {formatTime(startTime)}
        </TableCell>
        
        {/* End Time */}
        <TableCell className="px-6 py-4">
          {formatTime(endTime)}
        </TableCell>
        
        {/* Status */}
        <TableCell className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isActiveState ? 'text-green-600' : 'text-orange-600'}`}>
              {isActiveState ? "Active" : "Inactive"}
            </span>
            <Switch
              checked={isActiveState}
              onCheckedChange={toggleStatus}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
            />
          </div>
        </TableCell>
        
        {/* Actions */}
        <TableCell className="px-6 py-4">
          <div className="flex gap-2 items-center">
            <Button onClick={handleView} variant="outline" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4 text-blue-600" />
            </Button>
            <Button onClick={handleUpdate} variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4 text-purple-600" />
            </Button>
            <Button onClick={handleRemove} variant="outline" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      
      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertDeleteModalOpen}
          setIsAlertModalOpen={setIsAlertDeleteModalOpen}
          header="Delete Banner"
          description="Are you sure you want to delete this banner? This action cannot be undone."
          disabled={isDeleteBannerLoading}
          onConfirm={deleteBannerFun}
        />
      )}
    </>
  );
};

export default BannerComp;
