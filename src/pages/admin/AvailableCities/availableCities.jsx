// import React, { useEffect, useState } from "react";
// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import Spinner from "@/components/Spinner";
// import DataNotFound from "@/components/DataNotFound";
// import ReactPagination from "@/components/pagination/ReactPagination";
// import {
//   Table,
//   TableBody,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableCell
// } from "@/components/ui/Table";
// import { LIMIT } from "@/constants/constants";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import usePostApiReq from "@/hooks/useGetApiReq";
// import RowActions from "@/components/ui/actionsIcons";
// import StatusToggleButton from "@/components/ui/statusButton";

// // Modal Form for Adding City
// function AddCityModal({ open, onClose, onSuccess }) {
//   const { res, fetchData, isLoading } = usePostApiReq();
//   const [fields, setFields] = useState({
//     city: "",
//     latitude: "",
//     longitude: "",
//     radius: "",
//     description: ""
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (open) {
//       setFields({ city: "", latitude: "", longitude: "", radius: "", description: "" });
//       setError("");
//     }
//   }, [open]);

//   useEffect(() => {
//     if ((res?.status === 200 || res?.status === 201) && open) {
//       onSuccess();
//       onClose();
//     } else if (res && res.status !== 200 && res.status !== 201) {
//       setError(res?.data?.message || "Failed to create city!");
//     }
//     // eslint-disable-next-line
//   }, [res]);

//   function handleChange(e) {
//     setFields({ ...fields, [e.target.name]: e.target.value });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!fields.city || !fields.latitude || !fields.longitude || !fields.radius || !fields.description) {
//       setError("All fields are required.");
//       return;
//     }
//     fetchData("/availableCities/create", {
//       city: fields.city,
//       latitude: parseFloat(fields.latitude),
//       longitude: parseFloat(fields.longitude),
//       radius: parseFloat(fields.radius),
//       description: fields.description
//     });
//   }

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="w-full max-w-md bg-white rounded shadow">
//         <div className="bg-teal-500 text-white text-lg font-semibold p-4 flex justify-between">
//           <span>Add New City</span>
//           <button className="text-2xl leading-none" onClick={onClose}>&times;</button>
//         </div>
//         <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium">City *</label>
//             <input name="city" value={fields.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Latitude *</label>
//             <input name="latitude" type="number" step="any" value={fields.latitude} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Longitude *</label>
//             <input name="longitude" type="number" step="any" value={fields.longitude} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Radius *</label>
//             <input name="radius" type="number" step="any" value={fields.radius} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Description *</label>
//             <textarea name="description" value={fields.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" required></textarea>
//           </div>
//           <button type="submit" className="bg-teal-500 text-white rounded px-4 py-2 mt-2 hover:bg-teal-600 disabled:opacity-75" disabled={isLoading}>
//             {isLoading ? <Spinner size={16}/> : "Submit"}
//           </button>
//           {error && <div className="text-red-500 text-sm">{error}</div>}
//         </form>
//       </div>
//     </div>
//   );
// }

// const AvailableCitiesList = () => {
//   const { res, fetchData, isLoading } = useGetApiReq();
//   const [cityList, setCityList] = useState([]);
//   const [totalPage, setTotalPage] = useState(1);
//   const [page, setPage] = useState(1);
//   const [openAddModal, setOpenAddModal] = useState(false);

//   // Fetch cities list
//   const getAllCities = () => {
//     fetchData(`/availableCities/getAllCities?page=${page}&limit=${LIMIT}`);
//   };

//   useEffect(() => {
//     getAllCities();
//     // eslint-disable-next-line
//   }, [page]);

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       // Support possible response shapes
//       const _cities = res?.data?.data?.cities || res?.data?.data || [];
//       setCityList(_cities);
//       setTotalPage(res?.data?.pagination?.totalPages || 1);
//       setPage(res?.data?.pagination?.page || 1);
//     }
//   }, [res]);

//   // Placeholder handlers for action buttons and status toggle
//   function handleView(city) {
//     // Implement view functionality
//     alert(`Viewing city: ${city.city}`);
//   }
//   function handleEdit(city) {
//     // Implement edit functionality
//     alert(`Editing city: ${city.city}`);
//   }
//   function handleDelete(city) {
//     // Implement delete functionality; confirm and then call API if you want
//     if(window.confirm(`Delete city "${city.city}"?`)) {
//       // Call delete API here
//       alert("Deleted (mock)");
//     }
//   }
//   function handleStatusToggle(city) {
//     // Implement status toggle API here
//     alert(
//       `Status for "${city.city}" would be toggled. Current: ${city.status ? "Active" : "Inactive"}`
//     );
//   }

//   return (
//     <AdminWrapper>
//       <section className="px-0 py-0 w-full min-h-screen">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-[#000000] text-xl font-medium font-roboto">
//             Available Cities
//           </h2>
//           <button
//             onClick={() => setOpenAddModal(true)}
//             className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
//           >
//             <span className="text-xl">+</span> Add City
//           </button>
//         </div>
//         <div className="bg-[#FFFFFF] rounded-lg mb-6">
//           <Table className="bg-[#FFFFFF]">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>#</TableHead>
//                 <TableHead>City</TableHead>
//                 <TableHead>Latitude</TableHead>
//                 <TableHead>Longitude</TableHead>
//                 <TableHead>Radius</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {cityList.length > 0 &&
//                 cityList.map((city, idx) => (
//                   <TableRow key={city._id || city.id || idx}>
//                     <TableCell>{(page - 1) * LIMIT + idx + 1}</TableCell>
//                     <TableCell>{city.city || "-"}</TableCell>
//                     <TableCell>{city.latitude ?? "-"}</TableCell>
//                     <TableCell>{city.longitude ?? "-"}</TableCell>
//                     <TableCell>{city.radius ?? "-"}</TableCell>
//                     <TableCell>{city.description ?? "-"}</TableCell>
//                     <TableCell>
//                       {city.date ? new Date(city.date).toLocaleString() : "-"}
//                     </TableCell>
//                     <TableCell>
//                       <StatusToggleButton
//                         active={city.status === true || city.status === 1}
//                         loading={false}
//                         onClick={() => handleStatusToggle(city)}
//                         activeLabel="Active"
//                         inactiveLabel="Inactive"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <RowActions
//                         onView={() => handleView(city)}
//                         onEdit={() => handleEdit(city)}
//                         onDelete={() => handleDelete(city)}
//                         permissions={{ view: true, edit: true, delete: true }}
//                         isDeleting={false}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           {isLoading && <Spinner />}
//           {cityList.length === 0 && !isLoading && (
//             <DataNotFound name="Available Cities" />
//           )}
//         </div>
//         <ReactPagination totalPage={totalPage} setPage={setPage} />

//         {/* Modal for City Creation */}
//         <AddCityModal
//           open={openAddModal}
//           onClose={() => setOpenAddModal(false)}
//           onSuccess={getAllCities}
//         />
//       </section>
//     </AdminWrapper>
//   );
// };

// export default AvailableCitiesList;

// // import React, { useEffect, useState } from "react";
// // import AdminWrapper from "@/components/admin-wrapper/AdminWrapper"; // Adjust path as needed
// // import Spinner from "@/components/Spinner";
// // import DataNotFound from "@/components/DataNotFound";
// // import ReactPagination from "@/components/pagination/ReactPagination";
// // import {
// //   Table,
// //   TableBody,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// //   TableCell
// // } from "@/components/ui/Table";
// // import { LIMIT } from "@/constants/constants";
// // // import useGetApiReq from "@/hooks/useGetApiReq";
// // import useGetApiReq from "@/hooks/useGetApiReq"; 
// // import usePostApiReq from "@/hooks/useGetApiReq"; 
// // // Toggle UI for status (replace with your switch if you have)
// // const StatusSwitch = ({ checked }) => (
// //   <span
// //     className={
// //       "inline-block w-10 h-6 rounded-full " +
// //       (checked ? "bg-teal-500" : "bg-gray-300")
// //     }
// //   >
// //     <span
// //       className={
// //         "block w-5 h-5 bg-white rounded-full shadow transform transition " +
// //         (checked ? "translate-x-5" : "translate-x-0")
// //       }
// //     ></span>
// //   </span>
// // );

// // // Modal Form for Adding City
// // function AddCityModal({ open, onClose, onSuccess }) {
// //   const { res, fetchData, isLoading } = usePostApiReq();
// //   const [fields, setFields] = useState({
// //     city: "",
// //     latitude: "",
// //     longitude: "",
// //     radius: "",
// //     description: ""
// //   });
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     if (open) {
// //       setFields({ city: "", latitude: "", longitude: "", radius: "", description: "" });
// //       setError("");
// //     }
// //   }, [open]);

// //   useEffect(() => {
// //     if ((res?.status === 200 || res?.status === 201) && open) {
// //       onSuccess();
// //       onClose();
// //     } else if (res && res.status !== 200 && res.status !== 201) {
// //       setError(res?.data?.message || "Failed to create city!");
// //     }
// //     // eslint-disable-next-line
// //   }, [res]);

// //   function handleChange(e) {
// //     setFields({ ...fields, [e.target.name]: e.target.value });
// //   }

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     if (!fields.city || !fields.latitude || !fields.longitude || !fields.radius || !fields.description) {
// //       setError("All fields are required.");
// //       return;
// //     }
// //     fetchData("/availableCities/create", {
// //       city: fields.city,
// //       latitude: parseFloat(fields.latitude),
// //       longitude: parseFloat(fields.longitude),
// //       radius: parseFloat(fields.radius),
// //       description: fields.description
// //     });
// //   }

// //   if (!open) return null;
// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //       <div className="w-full max-w-md bg-white rounded shadow">
// //         <div className="bg-teal-500 text-white text-lg font-semibold p-4 flex justify-between">
// //           <span>Add New City</span>
// //           <button className="text-2xl leading-none" onClick={onClose}>&times;</button>
// //         </div>
// //         <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
// //           <div>
// //             <label className="block text-sm font-medium">City *</label>
// //             <input name="city" value={fields.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium">Latitude *</label>
// //             <input name="latitude" type="number" step="any" value={fields.latitude} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium">Longitude *</label>
// //             <input name="longitude" type="number" step="any" value={fields.longitude} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium">Radius *</label>
// //             <input name="radius" type="number" step="any" value={fields.radius} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium">Description *</label>
// //             <textarea name="description" value={fields.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" required></textarea>
// //           </div>
// //           <button type="submit" className="bg-teal-500 text-white rounded px-4 py-2 mt-2 hover:bg-teal-600 disabled:opacity-75" disabled={isLoading}>
// //             {isLoading ? <Spinner size={16}/> : "Submit"}
// //           </button>
// //           {error && <div className="text-red-500 text-sm">{error}</div>}
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // const AvailableCitiesList = () => {
// //   const { res, fetchData, isLoading } = useGetApiReq();
// //   const [cityList, setCityList] = useState([]);
// //   const [totalPage, setTotalPage] = useState(1);
// //   const [page, setPage] = useState(1);
// //   const [openAddModal, setOpenAddModal] = useState(false);

// //   // Fetch cities list
 
// //    const getAllCities = () => {
// //   fetchData(`/availableCities/getAllCities?page=${page}&limit=${LIMIT}`);
// // };



// //   useEffect(() => {
// //     getAllCities();
// //     // eslint-disable-next-line
// //   }, [page]);

// //   useEffect(() => {
// //     if (res?.status === 200 || res?.status === 201) {
// //       // Support possible response shapes
// //       const _cities = res?.data?.data?.cities || res?.data?.data || [];
// //       setCityList(_cities);
// //       setTotalPage(res?.data?.pagination?.totalPages || 1);
// //       setPage(res?.data?.pagination?.page || 1);
// //     }
// //   }, [res]);

// //   return (
// //     <AdminWrapper>
// //       <section className="px-0 py-0 w-full min-h-screen">
// //         <div className="flex justify-between items-center mb-8">
// //           <h2 className="text-[#000000] text-xl font-medium font-roboto">
// //             Available Cities
// //           </h2>
// //           <button
// //             onClick={() => setOpenAddModal(true)}
// //             className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
// //           >
// //             <span className="text-xl">+</span> Add City
// //           </button>
// //         </div>
// //         <div className="bg-[#FFFFFF] rounded-lg mb-6">
// //           <Table className="bg-[#FFFFFF]">
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>#</TableHead>
// //                 <TableHead>City</TableHead>
// //                 <TableHead>Latitude</TableHead>
// //                 <TableHead>Longitude</TableHead>
// //                 <TableHead>Radius</TableHead>
// //                 <TableHead>Description</TableHead>
// //                 <TableHead>Date</TableHead>
// //                 <TableHead>Status</TableHead>
// //                 <TableHead>Action</TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             <TableBody>
// //               {cityList.length > 0 &&
// //                 cityList.map((city, idx) => (
// //                   <TableRow key={city._id || city.id || idx}>
// //                     <TableCell>{(page - 1) * LIMIT + idx + 1}</TableCell>
// //                     <TableCell>{city.city || "-"}</TableCell>
// //                     <TableCell>{city.latitude ?? "-"}</TableCell>
// //                     <TableCell>{city.longitude ?? "-"}</TableCell>
// //                     <TableCell>{city.radius ?? "-"}</TableCell>
// //                     <TableCell>{city.description ?? "-"}</TableCell>
// //                     <TableCell>{city.date ? new Date(city.date).toLocaleString() : "-"}</TableCell>
// //                     <TableCell>
// //                       <StatusSwitch checked={city.status === true || city.status === 1} />
// //                     </TableCell>
// //                     <TableCell>
// //                       <button
// //                         className="bg-cyan-600 hover:bg-cyan-700 text-white px-2 py-1 rounded mr-2"
// //                         title="Edit"
// //                       >
// //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
// //                           viewBox="0 0 24 24">
// //                           <path d="M15.232 5.232l3.536 3.536M9 13.5l7.671-7.671a2.121 2.121 0 013 3L12 19.5 9 20.25l.75-3z" />
// //                         </svg>
// //                       </button>
// //                       <button
// //                         className="bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded"
// //                         title="Delete"
// //                       >
// //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
// //                           viewBox="0 0 24 24">
// //                           <path d="M6 18L18 6M6 6l12 12" />
// //                         </svg>
// //                       </button>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //             </TableBody>
// //           </Table>
// //           {isLoading && <Spinner />}
// //           {cityList.length === 0 && !isLoading && (
// //             <DataNotFound name="Available Cities" />
// //           )}
// //         </div>
// //         <ReactPagination totalPage={totalPage} setPage={setPage} />

// //         {/* Modal for City Creation */}
// //         <AddCityModal open={openAddModal} onClose={() => setOpenAddModal(false)} onSuccess={getAllCities} />
// //       </section>
// //     </AdminWrapper>
// //   );
// // };

// // export default AvailableCitiesList;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Spinner from "@/components/Spinner";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/Table";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import RowActions from "@/components/ui/actionsIcons";
import StatusToggleButton from "@/components/ui/statusButton";

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  const pad = n => n.toString().padStart(2, '0');
  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate())
  ].join('-') + ' ' + [
    pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds())
  ].join(':');
}

const AvailableCitiesList = () => {
  const { res, fetchData, isLoading } = useGetApiReq();
  const [cityList, setCityList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const getAllCities = () => {
    fetchData(`/availableCities/getAllCities?page=${page}&limit=${LIMIT}`);
  };

  useEffect(() => {
    getAllCities();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      const _cities = res?.data?.data?.cities || res?.data?.data || [];
      setCityList(_cities);
      setTotalPage(res?.data?.pagination?.totalPages || 1);
      setPage(res?.data?.pagination?.page || 1);
    }
  }, [res]);

  function handleView(city) {
    navigate(`/admin/available-cities/${city._id}?mode=view`);
  }
  function handleEdit(city) {
    navigate(`/admin/available-cities/${city._id}?mode=edit`);
  }
  function handleDelete(city) {
    if (window.confirm(`Delete city "${city.city}"?`)) {
      alert("Deleted (mock)");
      // Implement DELETE API logic if needed
    }
  }
  function handleStatusToggle(city) {
    alert(
      `Status for "${city.city}" would be toggled. Current: ${city.status ? "Active" : "Inactive"}`
    );
    // Implement status toggle API call here if needed
  }

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Available Cities
          </h2>
          <button
            onClick={() => navigate("/admin/available-cities/create?mode=add")}
            className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add City
          </button>
        </div>
        <div className="bg-[#FFFFFF] rounded-lg mb-6">
          <Table className="bg-[#FFFFFF]">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Radius</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cityList.length > 0 &&
                cityList.map((city, idx) => (
                  <TableRow key={city._id || city.id || idx}>
                    <TableCell>{(page - 1) * LIMIT + idx + 1}</TableCell>
                    <TableCell>{city.city || "-"}</TableCell>
                    <TableCell>{city.latitude ?? "-"}</TableCell>
                    <TableCell>{city.longitude ?? "-"}</TableCell>
                    <TableCell>{city.radius ?? "-"}</TableCell>
                    <TableCell>{city.description ?? "-"}</TableCell>
                    <TableCell>
                      {city.createdAt ? formatDate(city.createdAt) : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusToggleButton
                        active={city.status === true || city.status === 1}
                        loading={false}
                        onClick={() => handleStatusToggle(city)}
                        activeLabel="Active"
                        inactiveLabel="Inactive"
                      />
                    </TableCell>
                    <TableCell>
                      <RowActions
                        onView={() => handleView(city)}
                        onEdit={() => handleEdit(city)}
                        onDelete={() => handleDelete(city)}
                        permissions={{ view: true, edit: true, delete: true }}
                        isDeleting={false}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {isLoading && <Spinner />}
          {cityList.length === 0 && !isLoading && (
            <DataNotFound name="Available Cities" />
          )}
        </div>
        <ReactPagination totalPage={totalPage} setPage={setPage} />
      </section>
    </AdminWrapper>
  );
};

export default AvailableCitiesList;



