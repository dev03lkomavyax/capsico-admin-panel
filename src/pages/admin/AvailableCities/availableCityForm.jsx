

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import Spinner from "@/components/Spinner";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import { axiosInstance } from "@/utils/axiosInstance";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const CityFormPage = () => {
//   const { id } = useParams();
//   const query = useQuery();
//   const mode = query.get("mode");
//   const isView = mode === "view";
//   const isEdit = mode === "edit";
//   const isAdd = mode === "add" || (!id && !mode);
//   const navigate = useNavigate();

//   const {
//     res: getRes,
//     fetchData: fetchCity,
//     isLoading: getLoading,
//   } = useGetApiReq();

//   const [fields, setFields] = useState({
//     city: "",
//     latitude: "",
//     longitude: "",
//     radius: "",
//     description: "",
//     status: true,
//     status: true,
//   });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   const stableFetchCity = useCallback(fetchCity, []);

//   // Fetch city data when in edit or view mode
//   useEffect(() => {
//     if ((isEdit || isView) && id) {
//       stableFetchCity(`/availableCities/getCityById/${id}`);
//     }
//   }, [id, isEdit, isView, stableFetchCity]);

//   useEffect(() => {
//     if (getRes) {
//       if (getRes.status === 200 && getRes.data) {
//         const cityData = getRes.data.data || getRes.data;
//         setFields({
//           city: cityData.city ?? "",
//           latitude: cityData.latitude?.toString() ?? "",
//           longitude: cityData.longitude?.toString() ?? "",
//           radius: cityData.radius?.toString() ?? "",
//           description: cityData.description ?? "",
//           status: cityData.status !== undefined ? cityData.status : true,
//         });
//         setDataLoaded(true);
//       } else {
//         const errorMessage = getRes.data?.message || "Failed to fetch city data";
//         setError(errorMessage);
//         toast.error(errorMessage);
//         setDataLoaded(true);
//       }
//     }
//   }, [getRes]);

//   useEffect(() => {
//     if (isAdd) {
//       setFields({
//         city: "",
//         latitude: "",
//         longitude: "",
//         radius: "",
//         description: "",
//         status: true,
//         status: true,
//       });
//       setDataLoaded(true);
//       setError("");
//     }
//   }, [isAdd]);

//   function handleChange(e) {
//     if (isView) return;
//     const { name, value, type, checked } = e.target;
//     setFields(fields => ({
//       ...fields,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (error) setError("");
//   }

//   async function handleSubmit(e) {
//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (
//       !fields.city ||
//       !fields.latitude ||
//       !fields.longitude ||
//       !fields.radius ||
//       !fields.description
//     ) {
//     if (
//       !fields.city ||
//       !fields.latitude ||
//       !fields.longitude ||
//       !fields.radius ||
//       !fields.description
//     ) {
//       setError("All fields are required.");
//       return;
//     }
//     setIsSubmitting(true);
//     setError("");
//     try {
//       const payload = {
//         city: fields.city,
//         latitude: parseFloat(fields.latitude),
//         longitude: parseFloat(fields.longitude),
//         radius: parseFloat(fields.radius),
//         description: fields.description,
//         status: fields.status,
//       };
//       if (isEdit && id) {
//         await axiosInstance.put(
//           `/availableCities/updateCity/${id}`,
//           payload,
//           { withCredentials: true }
//         );
//         toast.success("City updated successfully!");
//         navigate("/admin/available-cities");
//       } else if (isAdd) {
//         await axiosInstance.post(
//           "/availableCities/create",
//           payload,
//           { withCredentials: true }
//         );
//         toast.success("City created successfully!");
//         navigate("/admin/available-cities");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to save city. Please try again.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   // Show loading spinner while fetching data
//   if ((isEdit || isView) && getLoading && !dataLoaded) {
//     return (
//       <AdminWrapper>
//         <div className="w-full flex items-center justify-center min-h-screen">
//           <Spinner />
//         </div>
//       </AdminWrapper>
//     );
//   }

//   // Show error if fetch failed
//   if (error && !isSubmitting) {
//     return (
//       <AdminWrapper>
//         <div className="w-full flex items-center justify-center min-h-screen">
//           <div className="text-red-600 text-center">{error}</div>
//         </div>
//       </AdminWrapper>
//     );
//   }

//   return (
//     <AdminWrapper>
//       <section className="px-0 py-0 w-full min-h-screen">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-[#000000] text-xl font-medium font-roboto">
//             {isAdd ? "Add City" : isEdit ? "Edit City" : "View City"}
//           </h2>
//           <button
//             className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
//             onClick={() => navigate("/admin/available-cities")}
//           >
//             Back
//           </button>
//         </div>
//         <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium">City *</label>
//               <input
//                 name="city"
//                 value={fields.city}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Latitude *</label>
//               <input
//                 name="latitude"
//                 type="number"
//                 step="any"
//                 value={fields.latitude}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Longitude *</label>
//               <input
//                 name="longitude"
//                 type="number"
//                 step="any"
//                 value={fields.longitude}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Radius *</label>
//               <input
//                 name="radius"
//                 type="number"
//                 step="any"
//                 value={fields.radius}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Description *</label>
//               <textarea
//                 name="description"
//                 value={fields.description}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <label>Status:</label>
//               <input
//                 name="status"
//                 type="checkbox"
//                 checked={fields.status}
//                 disabled={isView}
//                 onChange={handleChange}
//               />
//               <span>{fields.status ? "Active" : "Inactive"}</span>
//             </div>
//             {/* Show only in not-view mode */}
//             <div className="flex gap-2 mt-4">
//               {!isView && (
//                 <button
//                   type="submit"
//                   className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600 disabled:opacity-75 flex items-center gap-2"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Spinner size={16} />
//                       {isEdit ? "Updating..." : "Creating..."}
//                     </>
//                   ) : isEdit ? (
//                     "Update"
//                   ) : (
//                     "Create"
//                   )}
//                 </button>
//               )}
//             </div>
//             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           </form>
//         </div>
//       </section>
//     </AdminWrapper>
//   );
// };
  
// export default CityFormPage;

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import Spinner from "@/components/Spinner";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import { axiosInstance } from "@/utils/axiosInstance";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const CityFormPage = () => {
//   const { id } = useParams();
//   const query = useQuery();
//   const mode = query.get("mode");
//   const isView = mode === "view";
//   const isEdit = mode === "edit";
//   const isAdd = mode === "add" || (!id && !mode);
//   const navigate = useNavigate();

//   const {
//     res: getRes,
//     fetchData: fetchCity,
//     isLoading: getLoading,
//   } = useGetApiReq();

//   const [fields, setFields] = useState({
//     city: "",
//     latitude: "",
//     longitude: "",
//     radius: "",
//     description: "",
//     status: true,
//   });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   const stableFetchCity = useCallback(fetchCity, []);

//   // Fetch city data when in edit or view mode
//   useEffect(() => {
//     if ((isEdit || isView) && id) {
//       stableFetchCity(`/availableCities/getCityById/${id}`);
//     }
//   }, [id, isEdit, isView, stableFetchCity]);

//   useEffect(() => {
//     if (getRes) {
//       if (getRes.status === 200 && getRes.data) {
//         const cityData = getRes.data.data || getRes.data;
//         setFields({
//           city: cityData.city ?? "",
//           latitude: cityData.latitude?.toString() ?? "",
//           longitude: cityData.longitude?.toString() ?? "",
//           radius: cityData.radius?.toString() ?? "",
//           description: cityData.description ?? "",
//           status: cityData.status !== undefined ? cityData.status : true,
//         });
//         setDataLoaded(true);
//       } else {
//         const errorMessage = getRes.data?.message || "Failed to fetch city data";
//         setError(errorMessage);
//         toast.error(errorMessage);
//         setDataLoaded(true);
//       }
//     }
//   }, [getRes]);

//   useEffect(() => {
//     if (isAdd) {
//       setFields({
//         city: "",
//         latitude: "",
//         longitude: "",
//         radius: "",
//         description: "",
//         status: true,
//       });
//       setDataLoaded(true);
//       setError("");
//     }
//   }, [isAdd]);

//   function handleChange(e) {
//     if (isView) return;
//     const { name, value, type, checked } = e.target;
//     setFields(fields => ({
//       ...fields,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (error) setError("");
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (
//       !fields.city ||
//       !fields.latitude ||
//       !fields.longitude ||
//       !fields.radius ||
//       !fields.description
//     ) {
//       setError("All fields are required.");
//       return;
//     }
//     setIsSubmitting(true);
//     setError("");
//     try {
//       const payload = {
//         city: fields.city,
//         latitude: parseFloat(fields.latitude),
//         longitude: parseFloat(fields.longitude),
//         radius: parseFloat(fields.radius),
//         description: fields.description,
//         status: fields.status,
//       };
//       if (isEdit && id) {
//         await axiosInstance.put(
//           `/availableCities/updateCity/${id}`,
//           payload,
//           { withCredentials: true }
//         );
//         toast.success("City updated successfully!");
//         navigate("/admin/available-cities");
//       } else if (isAdd) {
//         await axiosInstance.post(
//           "/availableCities/create",
//           payload,
//           { withCredentials: true }
//         );
//         toast.success("City created successfully!");
//         navigate("/admin/available-cities");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to save city. Please try again.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   // Show loading spinner while fetching data
//   if ((isEdit || isView) && getLoading && !dataLoaded) {
//     return (
//       <AdminWrapper>
//         <div className="w-full flex items-center justify-center min-h-screen">
//           <Spinner />
//         </div>
//       </AdminWrapper>
//     );
//   }

//   // Show error if fetch failed
//   if (error && !isSubmitting) {
//     return (
//       <AdminWrapper>
//         <div className="w-full flex items-center justify-center min-h-screen">
//           <div className="text-red-600 text-center">{error}</div>
//         </div>
//       </AdminWrapper>
//     );
//   }

//   return (
//     <AdminWrapper>
//       <section className="px-0 py-0 w-full min-h-screen">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-[#000000] text-xl font-medium font-roboto">
//             {isAdd ? "Add City" : isEdit ? "Edit City" : "View City"}
//           </h2>
//           <div>
//             <button
//               className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
//               onClick={() => navigate("/admin/available-cities")}
//             >
//               Back
//             </button>
//             {/* Optionally, show Edit button in view mode */}
//             {/* {isView && (
//               <button
//                 className="h-10 border-[1px] ml-3 border-[#b76dda] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#b76dda] flex items-center gap-2"
//                 onClick={() => navigate(`/admin/available-cities/${id}?mode=edit`)}
//               >
//                 Edit
//               </button>
//             )} */}
//           </div>
//         </div>
//         <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium">City *</label>
//               <input
//                 name="city"
//                 value={fields.city}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Latitude *</label>
//               <input
//                 name="latitude"
//                 type="number"
//                 step="any"
//                 value={fields.latitude}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Longitude *</label>
//               <input
//                 name="longitude"
//                 type="number"
//                 step="any"
//                 value={fields.longitude}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Radius *</label>
//               <input
//                 name="radius"
//                 type="number"
//                 step="any"
//                 value={fields.radius}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Description *</label>
//               <textarea
//                 name="description"
//                 value={fields.description}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <label>Status:</label>
//               <input
//                 name="status"
//                 type="checkbox"
//                 checked={fields.status}
//                 disabled={isView}
//                 onChange={handleChange}
//               />
//               <span>{fields.status ? "Active" : "Inactive"}</span>
//             </div>
//             {/* Show only in not-view mode */}
//             <div className="flex gap-2 mt-4">
//               {!isView && (
//                 <button
//                   type="submit"
//                   className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600 disabled:opacity-75 flex items-center gap-2"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Spinner size={16} />
//                       {isEdit ? "Updating..." : "Creating..."}
//                     </>
//                   ) : isEdit ? (
//                     "Update"
//                   ) : (
//                     "Create"
//                   )}
//                 </button>
//               )}
//             </div>
//             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           </form>
//         </div>
//       </section>
//     </AdminWrapper>
//   );
// };

// export default CityFormPage;























// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import Spinner from "@/components/Spinner";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import usePostApiReq from "@/hooks/usePostApiReq"; 
// import { axiosInstance } from "@/utils/axiosInstance";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const CityFormPage = () => {
//   const { id } = useParams();
//   const query = useQuery();
//   const mode = query.get("mode");
//   const isView = mode === "view";
//   const isEdit = mode === "edit";
//   const isAdd = mode === "add" || (!id && !mode);
//   const navigate = useNavigate();

//   const {
//     res: getRes,
//     fetchData: fetchCity,
//     isLoading: getLoading,
//   } = useGetApiReq();

//   const {
//     res: postRes,
//     fetchData: saveCity,
//     isLoading: postLoading,
//   } = usePostApiReq();

//   const [fields, setFields] = useState({
//     city: "",
//     latitude: "",
//     longitude: "",
//     radius: "",
//     description: "",
//     status: true,
//   });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   // To fix possible re-fetch on each render
//   const stableFetchCity = useCallback(fetchCity, []);

//   // Fetch city data when editing or viewing
//   useEffect(() => {
//     if ((isEdit || isView) && id) {
//       stableFetchCity(`/availableCities/getCityById/${id}`);
//     }
//   }, [id, isEdit, isView, stableFetchCity]);

//   // Process API response
//   useEffect(() => {
//     if (getRes) {
//       if (getRes.status === 200 && getRes.data) {
//         const cityData = getRes.data.data || getRes.data;
//         setFields({
//           city: cityData.city ?? "",
//           latitude: cityData.latitude?.toString() ?? "",
//           longitude: cityData.longitude?.toString() ?? "",
//           radius: cityData.radius?.toString() ?? "",
//           description: cityData.description ?? "",
//           status: cityData.status !== undefined ? cityData.status : true,
//         });
//         setDataLoaded(true);
//       } else {
//         const errorMessage = getRes.data?.message || "Failed to fetch city data";
//         setError(errorMessage);
//         toast.error(errorMessage);
//         setDataLoaded(true);
//       }
//     }
//   }, [getRes]);

//   // Reset form for add mode
//   useEffect(() => {
//     if (isAdd) {
//       setFields({
//         city: "",
//         latitude: "",
//         longitude: "",
//         radius: "",
//         description: "",
//         status: true,
//       });
//       setDataLoaded(true);
//       setError("");
//     }
//   }, [isAdd]);

//   function handleChange(e) {
//     if (isView) return;
//     const { name, value, type, checked } = e.target;
//     setFields(fields => ({
//       ...fields,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (error) setError("");
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (
//       !fields.city ||
//       !fields.latitude ||
//       !fields.longitude ||
//       !fields.radius ||
//       !fields.description
//     ) {
//       setError("All fields are required.");
//       return;
//     }
//     setIsSubmitting(true);
//     setError("");
//     try {
//       const payload = {
//         city: fields.city,
//         latitude: parseFloat(fields.latitude),
//         longitude: parseFloat(fields.longitude),
//         radius: parseFloat(fields.radius),
//         description: fields.description,
//         status: fields.status,
//       };
//       if (isEdit && id) {
//         await axiosInstance.post(
//           `/availableCities/updateCity/${id}`,
//           payload,
//           { withCredentials: true }
//         );
//         toast.success("City updated successfully!");
//         navigate("/admin/available-cities");
//       } else if (isAdd) {
//         await axiosInstance.post(
//           "/availableCities/create",
//           payload,
//           { withCredentials: true }
//         );
//         toast.success("City created successfully!");
//         navigate("/admin/available-cities");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to save city. Please try again.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   // Show loading spinner while fetching data
//   if ((isEdit || isView) && getLoading && !dataLoaded) {
//     return (
//       <AdminWrapper>
//         <div className="w-full flex items-center justify-center min-h-screen">
//           <Spinner />
//         </div>
//       </AdminWrapper>
//     );
//   }

//   // Show error if fetch failed
//   if (error && !isSubmitting) {
//     return (
//       <AdminWrapper>
//         <div className="w-full flex items-center justify-center min-h-screen">
//           <div className="text-red-600 text-center">{error}</div>
//         </div>
//       </AdminWrapper>
//     );
//   }

//   return (
//     <AdminWrapper>
//       <section className="px-0 py-0 w-full min-h-screen">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-[#000000] text-xl font-medium font-roboto">
//             {isAdd ? "Add City" : isEdit ? "Edit City" : "View City"}
//           </h2>
//           <button
//             className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
//             onClick={() => navigate("/admin/available-cities")}
//           >
//             Back
//           </button>
//         </div>
//         <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium">City *</label>
//               <input
//                 name="city"
//                 value={fields.city}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Latitude *</label>
//               <input
//                 name="latitude"
//                 type="number"
//                 step="any"
//                 value={fields.latitude}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Longitude *</label>
//               <input
//                 name="longitude"
//                 type="number"
//                 step="any"
//                 value={fields.longitude}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Radius *</label>
//               <input
//                 name="radius"
//                 type="number"
//                 step="any"
//                 value={fields.radius}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Description *</label>
//               <textarea
//                 name="description"
//                 value={fields.description}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
//                 required
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <label>Status:</label>
//               <input
//                 name="status"
//                 type="checkbox"
//                 checked={fields.status}
//                 disabled={isView}
//                 onChange={handleChange}
//               />
//               <span>{fields.status ? "Active" : "Inactive"}</span>
//             </div>
//             {/* Only Update/Create button, no Delete */}
//             <div className="flex gap-2 mt-4">
//               {!isView && (
//                 <button
//                   type="submit"
//                   className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600 disabled:opacity-75 flex items-center gap-2"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Spinner size={16} />
//                       {isEdit ? "Updating..." : "Creating..."}
//                     </>
//                   ) : isEdit ? (
//                     "Update"
//                   ) : (
//                     "Create"
//                   )}
//                 </button>
//               )}
//             </div>
//             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           </form>
//         </div>
//       </section>
//     </AdminWrapper>
//   );
// };

// export default CityFormPage;



import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Spinner from "@/components/Spinner";
import useGetApiReq from "@/hooks/useGetApiReq";
import { axiosInstance } from "@/utils/axiosInstance";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const defaultFields = {
  city: "",
  latitude: "",
  longitude: "",
  radius: "",
  description: "",
  status: true,
};

const CityFormPage = () => {
  const { id } = useParams();
  const query = useQuery();
  const mode = query.get("mode");
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add" || (!id && !mode);
  const navigate = useNavigate();

  const {
    res: getRes,
    fetchData: fetchCity,
    isLoading: getLoading,
  } = useGetApiReq();

  const [fields, setFields] = useState(defaultFields);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const stableFetchCity = useCallback(fetchCity, []);

  // Fetch city data when in edit or view mode
  useEffect(() => {
    if ((isEdit || isView) && id) {
      stableFetchCity(`/availableCities/getCityById/${id}`);
    }
  }, [id, isEdit, isView, stableFetchCity]);

  useEffect(() => {
    if (getRes) {
      if (getRes.status === 200 && getRes.data) {
        const cityData = getRes.data.data || getRes.data;
        setFields({
          city: cityData.city ?? "",
          latitude: cityData.latitude !== undefined ? String(cityData.latitude) : "",
          longitude: cityData.longitude !== undefined ? String(cityData.longitude) : "",
          radius: cityData.radius !== undefined ? String(cityData.radius) : "",
          description: cityData.description ?? "",
          status: cityData.status !== undefined ? cityData.status : true,
        });
        setDataLoaded(true);
        setError("");
      } else {
        const errorMessage = getRes.data?.message || "Failed to fetch city data";
        setError(errorMessage);
        toast.error(errorMessage);
        setDataLoaded(true);
      }
    }
  }, [getRes]);

  useEffect(() => {
    if (isAdd) {
      setFields(defaultFields);
      setDataLoaded(true);
      setError("");
    }
  }, [isAdd]);

  function handleChange(e) {
    if (isView) return;
    const { name, value, type, checked } = e.target;
    setFields(fields => ({
      ...fields,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !fields.city ||
      fields.latitude === "" ||
      fields.longitude === "" ||
      fields.radius === "" ||
      !fields.description
    ) {
      setError("All fields are required.");
      return;
    }
    // Validate latitude, longitude and radius
    const latitude = parseFloat(fields.latitude);
    const longitude = parseFloat(fields.longitude);
    const radius = parseFloat(fields.radius);
    if (isNaN(latitude) || isNaN(longitude) || isNaN(radius)) {
      setError("Latitude, Longitude and Radius must be valid numbers.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      const payload = {
        city: fields.city,
        latitude,
        longitude,
        radius,
        description: fields.description,
        status: fields.status,
      };
      if (isEdit && id) {
        await axiosInstance.put(
          `/availableCities/updateCity/${id}`,
          payload,
          { withCredentials: true }
        );
        toast.success("City updated successfully!");
        navigate("/admin/available-cities");
      } else if (isAdd) {
        await axiosInstance.post(
          "/availableCities/create",
          payload,
          { withCredentials: true }
        );
        toast.success("City created successfully!");
        navigate("/admin/available-cities");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to save city. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading spinner while fetching data
  if ((isEdit || isView) && getLoading && !dataLoaded) {
    return (
      <AdminWrapper>
        <div className="w-full flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      </AdminWrapper>
    );
  }

  // Show error if fetch failed
  if (error && !isSubmitting && !dataLoaded) {
    return (
      <AdminWrapper>
        <div className="w-full flex items-center justify-center min-h-screen">
          <div className="text-red-600 text-center">{error}</div>
        </div>
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            {isAdd ? "Add City" : isEdit ? "Edit City" : "View City"}
          </h2>
          <button
            className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
            onClick={() => navigate("/admin/available-cities")}
          >
            Back
          </button>
        </div>
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">City *</label>
              <input
                name="city"
                value={fields.city}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Latitude *</label>
              <input
                name="latitude"
                type="number"
                step="any"
                value={fields.latitude}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Longitude *</label>
              <input
                name="longitude"
                type="number"
                step="any"
                value={fields.longitude}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Radius *</label>
              <input
                name="radius"
                type="number"
                step="any"
                value={fields.radius}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description *</label>
              <textarea
                name="description"
                value={fields.description}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Status:</label>
              <input
                name="status"
                type="checkbox"
                checked={fields.status}
                disabled={isView}
                onChange={handleChange}
              />
              <span>{fields.status ? "Active" : "Inactive"}</span>
            </div>
            {/* Show only in not-view mode */}
            <div className="flex gap-2 mt-4">
              {!isView && (
                <button
                  type="submit"
                  className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600 disabled:opacity-75 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size={16} />
                      {isEdit ? "Updating..." : "Creating..."}
                    </>
                  ) : isEdit ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              )}
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
        </div>
      </section>
    </AdminWrapper>
  );
};

export default CityFormPage;
