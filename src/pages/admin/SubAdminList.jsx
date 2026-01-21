
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";
import Spinner from "@/components/Spinner";
import Subadmin from "@/components/Subadmin";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubAdminList = () => {
  const { res, fetchData, isLoading } = useGetApiReq();
  const [subAdminList, setSubAdminList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Fetch admin list
  const getAllSubadmins = () => {
    fetchData(`/admin/get-all-subadmin?page=${page}&limit=${LIMIT}`);
  };

  useEffect(() => {
    getAllSubadmins();
  }, [page]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("subadims res", res);
      setSubAdminList(res?.data?.data?.subAdmins);
      setTotalPage(res?.data?.pagination?.totalPages);
      setPage(res?.data?.pagination?.page);
    }
  }, [res]);

  // **REMOVED**: All automatic refresh handlers that were causing status resets

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Sub Admin List
          </h2>
          <button
            onClick={() => navigate("/admin/sub-admin/add-subadmin")}
            className="h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD] flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add sub Admin
          </button>
        </div>
        <div className="bg-[#FFFFFF] rounded-lg mb-6">
          <Table className="bg-[#FFFFFF]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
                </TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[100px]">Full Name</TableHead>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead className="w-[200px]">Email Address</TableHead>
                <TableHead className="w-[100px]">Mobile Number</TableHead>
                <TableHead className="w-[100px]">City</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subAdminList.length > 0 ? (
                subAdminList.map((subadmin) => (
                  <Subadmin
                    key={subadmin._id}
                    subadmin={subadmin}
                    getAllSubadmins={getAllSubadmins}
                  />
                ))
              ) : (
                !isLoading && (
                  <TableRow>
                    <td colSpan={9}><DataNotFound name="Sub Admins" /></td>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          {isLoading && <Spinner />}
        </div>
        <ReactPagination totalPage={totalPage} setPage={setPage} />
      </section>
    </AdminWrapper>
  );
};

export default SubAdminList;


















// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import DataNotFound from "@/components/DataNotFound";
// import ReactPagination from "@/components/pagination/ReactPagination";
// import Spinner from "@/components/Spinner";
// import Subadmin from "@/components/Subadmin";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//     Table,
//     TableBody,
//     TableHead,
//     TableHeader,
//     TableRow
// } from "@/components/ui/table";
// import { LIMIT } from "@/constants/constants";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SubAdminList = () => {
//     const { res, fetchData, isLoading } = useGetApiReq();
//     const [subAdminList, setSubAdminList] = useState([]);
//     const [totalPage, setTotalPage] = useState(1);
//     const [page, setPage] = useState(1);
//     const navigate = useNavigate();

//     const getAllSubadmins = () => {
//         fetchData(`/admin/get-all-subadmin?page=${page}&limit=${LIMIT}`);
//     };

//     useEffect(() => {
//         getAllSubadmins();
//     }, [page]);

//     useEffect(() => {
//         if (res?.status === 200 || res?.status === 201) {
//             console.log("subadims res", res);
//             setSubAdminList(res?.data?.data?.subAdmins);
//             setTotalPage(res?.data?.pagination?.totalPages);
//             setPage(res?.data?.pagination?.page);
//         }
//     }, [res]);

//     return (
//         <AdminWrapper>
//             <section className="px-0 py-0 w-full min-h-screen">
//                 <div className="flex justify-between items-center mb-8">
//                     <div className="flex justify-start items-center">
//                         {/* <MdKeyboardArrowLeft
//                             onClick={() => navigate(-1)}
//                             className="text-[#000000] text-4xl cursor-pointer"
//                         /> */}
//                         <h2 className="text-[#000000] text-xl font-medium font-roboto">
//                             Sub Admin List
//                         </h2>
//                     </div>
//                     <div className="flex justify-start items-center gap-4">
//                         <button
//                             onClick={() => navigate("/admin/sub-admin/add-subadmin")}
//                             className="h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD] flex items-center gap-2"
//                         >
//                             <span className="text-xl">+</span> Add sub Admin
//                         </button>
//                     </div>
//                 </div>
//                 <div className="bg-[#FFFFFF] rounded-lg mb-6">
//                     <Table className="bg-[#FFFFFF]">
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead className="w-10">
//                                     {
//                                         <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
//                                     }
//                                 </TableHead>
//                                 <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                     ID
//                                 </TableHead>
//                                 <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                     Full Name
//                                 </TableHead>
//                                 <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                     Position
//                                 </TableHead>
//                                 <TableHead className="w-[200px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                     Email Address
//                                 </TableHead>
//                                 <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                     Mobile Number
//                                 </TableHead>
//                                  <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                  CityName
//                                 </TableHead>

//                                     <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                   Status
//                                 </TableHead>

//                                 <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
//                                     Action
//                                 </TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {subAdminList.length > 0 &&
//                                 subAdminList.map((subadmin) => (
//                                     <Subadmin
//                                         key={subadmin._id}
//                                         getAllSubadmins={getAllSubadmins}
//                                         subadmin={subadmin}
//                                     />
//                                 ))}
//                         </TableBody>
//                     </Table>

//                     {isLoading && <Spinner />}
//                     {subAdminList.length === 0 && !isLoading && (
//                         <DataNotFound name="Sub Admins" />
//                     )}
//                 </div>

//                 <ReactPagination totalPage={totalPage} setPage={setPage} />
//             </section>
//         </AdminWrapper>
//     );
// };

// export default SubAdminList;
