// import { Button } from "@/components/ui/button";
// import { EditProfileSchema1 } from "@/schema/restaurantSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Autocomplete,
//   GoogleMap,
//   LoadScript,
//   Marker,
// } from "@react-google-maps/api";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";

// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { CiLocationOn } from "react-icons/ci";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import usePostApiReq from "@/hooks/usePostApiReq";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import VerifyPhoneOtpModal from "@/components/restaurant/VerifyPhoneOtpModal";

// const libraries = ["places", "marker"];

// const EditProfile1 = ({
//   setPage,
//   restaurant,
//   setRestaurant,
//   getRestaurant,
// }) => {
//   const navigate = useNavigate();

//   const form = useForm({
//     resolver: zodResolver(EditProfileSchema1),
//     defaultValues: {
//       restaurantName: "",
//       restaurantEmail: "",
//       addressLine: "",
//       city: "",
//       state: "",
//       pinCode: "",
//       latitude: "",
//       longitude: "",
//       phoneNumber: "",
//       phoneNumber2: "",
//       STDCode: "",
//       landlineNumber: "",
//       fullName: "",
//       email: "",
//       samePhoneNumber: false,
//       receiveUpdate: false,
//     },
//   });

//   const { register, control, watch, setValue, getValues, reset } = form;
//   const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
//   const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(true);
//   const [isPhoneNumber2Verified, setIsPhoneNumber2Verified] = useState(true);
//   const [isPhone1, setIsPhone1] = useState(false);

//   const samePhoneNumber = watch("samePhoneNumber");
//   const phoneNumber1 = watch("phoneNumber");
//   const phoneNumber2 = watch("phoneNumber2");

//   useEffect(() => {
//     samePhoneNumber ? setValue("phoneNumber2", getValues("phoneNumber")) : "";
//   }, [samePhoneNumber, setValue, getValues]);

//   useEffect(() => {
//     phoneNumber1 === phoneNumber2 ? "" : setValue("samePhoneNumber", false);
//   }, [phoneNumber2, setValue, getValues]);

//   useEffect(() => {
//     setIsPhoneNumberVerified(false);
//   }, [phoneNumber1]);

//   useEffect(() => {
//     setIsPhoneNumber2Verified(false);
//   }, [phoneNumber2]);

//   const { basicInfo, location, partnerDetails } = restaurant || {};

//   // useEffect(() => {
//   //   reset({
//   //     restaurantName: basicInfo?.name || "",
//   //     restaurantEmail: basicInfo?.email || "",
//   //     addressLine: location?.addressLine || "",
//   //     city: location?.city || "",
//   //     state: location?.state || "",
//   //     pinCode: location?.pinCode || "",
//   //     latitude: location?.coordinates[1] || "",
//   //     longitude: location?.coordinates[0] || "",
//   //     phoneNumber: basicInfo?.phone || "",
//   //     phoneNumber2: partnerDetails?.phone || "",
//   //     STDCode: "",
//   //     landlineNumber: "",
//   //     fullName: partnerDetails?.name || "",
//   //     email: partnerDetails?.email || "",
//   //     samePhoneNumber: false,
//   //     receiveUpdate: false,
//   //   });
//   // }, [restaurant]);

//   const containerStyle = {
//     width: "50%",
//     height: "300px",
//   };

//   const [center, setCenter] = useState({
//     lat: 19.8429547,
//     lng: 75.2333128,
//   });

//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current) {
//       const map = mapRef.current;

//       // Create an AdvancedMarkerElement instance
//       const marker = new google.maps.marker.AdvancedMarkerElement({
//         position: center,
//         map: map,
//         content: "<div style='color: red;'>Hello, World!</div>", // Custom content
//       });

//       // Add additional marker configuration if needed
//     }
//   }, [mapRef]);

//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [autocomplete, setAutocomplete] = useState(null);
//   const { pathname } = useLocation();

//   const handlePlaceSelect = () => {
//     if (autocomplete) {
//       const place = autocomplete.getPlace();
//       if (place.geometry && place.geometry.location) {
//         setValue("latitude", place.geometry.location.lat());
//         setValue("longitude", place.geometry.location.lng());

//         setCenter({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//         center.lat = place.geometry.location.lat();
//         center.lng = place.geometry.location.lng();

//         setMarkerPosition({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//         setValue("search", place.name);
//       }
//     }
//   };

//   const onMapClick = useCallback((e) => {
//     setValue("latitude", e.latLng.lat());
//     setValue("longitude", e.latLng.lng());
//     setMarkerPosition({
//       lat: e.latLng.lat(),
//       lng: e.latLng.lng(),
//     });
//   }, []);

//   console.log("markerPosition", markerPosition);

//   const detectLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setValue("latitude", position.coords.latitude);
//         setValue("longitude", position.coords.longitude);
//         const currentLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         setMarkerPosition(currentLocation);
//         // mapRef.current.panTo(currentLocation);
//       });
//     }
//   };

//   const { res, fetchData, isLoading } = usePostApiReq();
//   const {
//     res: verifyPhoneRes,
//     fetchData: fetchVerifyPhoneData,
//     isLoading: isVerifyPhoneLoading,
//   } = useGetApiReq();
//   const {
//     res: res1,
//     fetchData: fetchData1,
//     isLoading: isLoading1,
//   } = usePostApiReq();

//   const onSubmit = (data) => {
//     // setIsRegisterSuccessModalOpen(true);
//     console.log("data", data);
//     console.log("isPhoneNumberVerified", isPhoneNumberVerified);
//     console.log("isPhoneNumber2Verified", isPhoneNumber2Verified);
//     console.log("samePhoneNumber", samePhoneNumber);
//     // if (!restaurant) {
//     //   if (
//     //     !isPhoneNumberVerified ||
//     //     (!samePhoneNumber && !isPhoneNumber2Verified)
//     //   ) {
//     //     toast.error("Number not verified");
//     //     return;
//     //   }
//     // }

//     const apiData = {
//       restaurantName: data.restaurantName,
//       email: data.restaurantEmail,
//       password: "securepassword",
//       restaurantType: "Fine Dining",
//       coordinates: {
//         latitude: data.latitude,
//         longitude: data.longitude,
//       },
//       address: {
//         addressLine: data.addressLine,
//         city: data.city,
//         state: data.state,
//         pinCode: data.pinCode,
//       },
//       contactDetails: {
//         phoneNumber: data.phoneNumber,
//         stdCode: data.STDCode,
//         landlineNumber: data.landlineNumber,
//       },
//       ownerDetails: {
//         ownerName: data.fullName,
//         ownerPhoneNumber: getValues("phoneNumber2"),
//         ownerEmail: data.email,
//         idProof: "path_to_id_proof",
//         sameAsRestaurantPhone: data.samePhoneNumber,
//       },
//     };

//     if (restaurant) {
//       fetchData1("/admin/update-restaurant", {
//         ...apiData,
//         restaurantId: restaurant?._id || restaurant?.id,
//       });
//     } else {
//       fetchData("/admin/restaurant-signup", apiData);
//     }
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("register response", res);
//       setRestaurant(res?.data?.data?.restaurant);
//       toast.success(res?.data.message);
//       setPage(2);
//     }
//   }, [res]);

//   useEffect(() => {
//     if (res1?.status === 200 || res1?.status === 201) {
//       console.log("update restaurant response", res1);
//       getRestaurant();
//       setPage(2);
//     }
//   }, [res1]);

//   const handlePhoneNumberVerify = () => {
//     setIsPhone1(true);
//     fetchVerifyPhoneData(`/admin/get-otp?phone=${getValues("phoneNumber")}`);
//   };

//   const handlePhoneNumber2Verify = () => {
//     setIsPhone1(false);
//     fetchVerifyPhoneData(`/admin/get-otp?phone=${getValues("phoneNumber2")}`);
//   };

//   useEffect(() => {
//     if (verifyPhoneRes?.status === 200 || verifyPhoneRes?.status === 201) {
//       toast.success(verifyPhoneRes?.data.message);
//       setIsOtpModalOpen(true);
//     }
//   }, [verifyPhoneRes]);

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
//           <div>
//             <div className="flex justify-between gap-2 mb-8">
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="flex justify-start items-center"
//               >
//                 <MdKeyboardArrowLeft className="text-[#000000] text-2xl" />
//                 <h2 className="text-[#000000] text-xl font-medium font-roboto">
//                   {pathname.includes("/add-restaurant")
//                     ? "Add Restaurant"
//                     : "Edit Profile"}
//                 </h2>
//               </button>
//               <Button
//                 disabled={isLoading || isLoading1}
//                 size="lg"
//                 className="w-20 bg-[#1064FD]"
//                 type="submit"
//               >
//                 Save
//               </Button>
//             </div>
//             <div className="border border-[#C2CDD6] rounded-md px-8 py-6">
//               <h3 className="text-xl font-bold text-[#4A5E6D]">
//                 Restaurant Information
//               </h3>
//               <p className="text-lg font-normal text-[#92A5B5]">
//                 Restaurant name. address. contact no., owner details
//               </p>
//               <div className="mt-5">
//                 <FormField
//                   control={control}
//                   name="restaurantName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-[#344054] font-inter">
//                         Restaurant Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Adiyaman Hotel"
//                           className="placeholder:text-[#667085] placeholder:font-inter border-[#E4E6EE]"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="mt-5">
//                   <FormField
//                     control={control}
//                     name="restaurantEmail"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter">
//                           Restaurant Email
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Restaurant Email"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="mt-5">
//                   <FormField
//                     control={control}
//                     name="addressLine"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter">
//                           AddressLine
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="addressLine"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="mt-5 grid grid-cols-3 gap-5">
//                   <FormField
//                     control={control}
//                     name="city"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter">
//                           City
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="city"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={control}
//                     name="state"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter">
//                           State
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="state"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={control}
//                     name="pinCode"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter">
//                           PinCode
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="pinCode"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="mt-5">
//                   <p className="class-xl4 text-[#637D92]">
//                     Please accurately place the pin at your outlet’s location on
//                     the map.
//                   </p>
//                   <p className="class-lg3 text-[#A8A8A8] mt-2">
//                     This will assist your customers and Capsico riders in
//                     finding your store easily.
//                   </p>

//                   <div className="mt-5">
//                     <LoadScript
//                       googleMapsApiKey={
//                         import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//                       }
//                       libraries={libraries}
//                       loadingElement={<div>Loading...</div>}
//                       async
//                     >
//                       <div className="mb-2">
//                         <FormField
//                           control={control}
//                           name="search"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel className=" text-[#344054] font-inter"></FormLabel>
//                               <FormControl>
//                                 <Autocomplete
//                                   onLoad={(autocomplete) =>
//                                     setAutocomplete(autocomplete)
//                                   }
//                                   onPlaceChanged={handlePlaceSelect}
//                                 >
//                                   <div className="flex border rounded">
//                                     <Input
//                                       placeholder="Search for your store here & drop a pin on its location."
//                                       className="placeholder:text-[#667085] placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
//                                       {...field}
//                                     />
//                                     <button
//                                       onClick={detectLocation}
//                                       type="button"
//                                       className="text-[#1AA6F1] flex items-center gap-1 px-4 py-2"
//                                     >
//                                       <CiLocationOn size={20} />
//                                       <span className="font-bold">Detect</span>
//                                     </button>
//                                   </div>
//                                 </Autocomplete>
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                       <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={center}
//                         zoom={10}
//                         onClick={onMapClick}
//                         onLoad={(map) => (mapRef.current = map)}
//                       >
//                         {markerPosition && <Marker position={markerPosition} />}
//                       </GoogleMap>
//                     </LoadScript>
//                   </div>
//                   <p className="class-lg4 text-[#666666] mt-4">
//                     Or directly enter the co-ordinates
//                   </p>
//                 </div>

//                 <div className="mt-5 grid grid-cols-2 gap-5">
//                   <FormField
//                     control={control}
//                     name="latitude"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter"></FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Latitude"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="longitude"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter"></FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Longitude"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-6">
//               <h3 className="text-xl font-bold text-[#4A5E6D]">
//                 Contact number at Restaurant
//               </h3>
//               <p className="text-lg font-normal text-[#92A5B5]">
//                 Your customers can call this number for general inquiries.
//               </p>
//               <div className="mt-5">
//                 <FormField
//                   control={control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-[#344054] font-inter">
//                         Phone Number
//                       </FormLabel>
//                       <FormControl>
//                         <div className="grid grid-cols-3 gap-4">
//                           <div className="flex gap-0 border rounded w-full">
//                             <Select className="">
//                               <SelectTrigger className="w-[100px] border-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0">
//                                 <SelectValue placeholder="India" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="india">India</SelectItem>
//                               </SelectContent>
//                             </Select>
//                             <Input
//                               placeholder="+91 (98XXX XXXXX)"
//                               className="placeholder:text-[#667085] w-full placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
//                               {...field}
//                             />
//                           </div>
//                           <div>
//                             {watch("phoneNumber")?.length === 10 &&
//                             isPhoneNumberVerified ? (
//                               <Button
//                                 type="button"
//                                 disabled={watch("phoneNumber")?.length !== 10}
//                                 variant="capsico"
//                                 className="disabled:bg-[#E1E1E1] w-auto px-4"
//                               >
//                                 Verified
//                               </Button>
//                             ) : (
//                               <Button
//                                 type="button"
//                                 onClick={handlePhoneNumberVerify}
//                                 disabled={watch("phoneNumber")?.length !== 10}
//                                 variant="capsico"
//                                 className="disabled:bg-[#E1E1E1] w-auto px-4"
//                               >
//                                 Verify
//                               </Button>
//                             )}
//                           </div>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-6">
//               <h3 className="text-xl font-bold text-[#4A5E6D]">
//                 Restaurant Owner Details
//               </h3>
//               <p className="text-lg font-normal text-[#92A5B5]">
//                 These will be used to share communications related to revenue.
//               </p>

//               <FormField
//                 control={control}
//                 name="samePhoneNumber"
//                 render={({ field }) => (
//                   <FormItem className="flex gap-3 items-center">
//                     <FormLabel className=" text-[#344054] font-inter"></FormLabel>
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                         className="h-5 w-5"
//                       />
//                     </FormControl>
//                     <div className="space-y-1 leading-none">
//                       <FormLabel className="text-[#667085] class-lg1">
//                         Same as restaurant mobile number
//                       </FormLabel>
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="mt-5">
//                 <FormField
//                   control={control}
//                   name="phoneNumber2"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-[#344054] font-inter">
//                         Phone Number
//                       </FormLabel>
//                       <FormControl>
//                         <div className="grid grid-cols-3 gap-4">
//                           <div className="flex gap-0 border rounded w-full">
//                             <Select className="">
//                               <SelectTrigger className="w-[100px] border-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0">
//                                 <SelectValue placeholder="India" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="india">India</SelectItem>
//                               </SelectContent>
//                             </Select>
//                             <Input
//                               placeholder="+91 (98XXX XXXXX)"
//                               className="placeholder:text-[#667085] w-full placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
//                               {...field}
//                             />
//                           </div>
//                           <div>
//                             {!watch("samePhoneNumber") && (
//                               <>
//                                 {watch("phoneNumber2")?.length === 10 &&
//                                 isPhoneNumber2Verified ? (
//                                   <Button
//                                     type="button"
//                                     disabled={
//                                       watch("phoneNumber2")?.length !== 10
//                                     }
//                                     variant="capsico"
//                                     className="disabled:bg-[#E1E1E1] w-auto px-4"
//                                   >
//                                     Verified
//                                   </Button>
//                                 ) : (
//                                   <Button
//                                     type="button"
//                                     onClick={handlePhoneNumber2Verify}
//                                     disabled={
//                                       watch("phoneNumber2")?.length !== 10
//                                     }
//                                     variant="capsico"
//                                     className="disabled:bg-[#E1E1E1] w-auto px-4"
//                                   >
//                                     Verify
//                                   </Button>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="mt-5">
//                   <FormField
//                     control={control}
//                     name="receiveUpdate"
//                     render={({ field }) => (
//                       <FormItem className="flex gap-3 items-center">
//                         <FormLabel className=" text-[#344054] font-inter"></FormLabel>
//                         <FormControl>
//                           <Checkbox
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                             className="h-5 w-5"
//                           />
//                         </FormControl>
//                         <div className="space-y-1 leading-none">
//                           <FormLabel className="class-lg1 text-[#667085]">
//                             Yes, I am interested in receiving important updates
//                             and notifications from Capsico through WhatsApp.
//                           </FormLabel>
//                         </div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="mt-5 grid grid-cols-2 w-[66%] gap-5">
//                   <FormField
//                     control={control}
//                     name="fullName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter">
//                           Restaurant Owner Full name
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Adiyaman Kumar"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className=" text-[#344054] font-inter">
//                           Restaurant Owner email address
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="you@company.com"
//                             className="placeholder:text-[#667085] placeholder:font-inter"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>

//             {isOtpModalOpen && (
//               <VerifyPhoneOtpModal
//                 isOtpModalOpen={isOtpModalOpen}
//                 setIsOtpModalOpen={setIsOtpModalOpen}
//                 phone={
//                   isPhone1
//                     ? getValues("phoneNumber")
//                     : getValues("phoneNumber2")
//                 }
//                 resendOtp={handlePhoneNumberVerify}
//                 setIsPhoneNumberVerified={
//                   isPhone1
//                     ? setIsPhoneNumberVerified
//                     : setIsPhoneNumber2Verified
//                 }
//               />
//             )}
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EditProfile1;

import { Button } from "@/components/ui/button";
import { EditProfileSchema1 } from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiLocationOn } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import usePostApiReq from "@/hooks/usePostApiReq";
import useGetApiReq from "@/hooks/useGetApiReq";
import VerifyPhoneOtpModal from "@/components/restaurant/VerifyPhoneOtpModal";

const libraries = ["places", "marker"];

const EditProfile1 = ({
  setPage,
  restaurant,
  setRestaurant,
  getRestaurant,
}) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(EditProfileSchema1),
    defaultValues: {
      restaurantName: "",
      restaurantEmail: "",
      addressLine: "",
      city: "",
      state: "",
      pinCode: "",
      latitude: "",
      longitude: "",
      phoneNumber: "",
      phoneNumber2: "",
      STDCode: "",
      landlineNumber: "",
      fullName: "",
      email: "",
      deliveryTime: "",
      samePhoneNumber: false,
      receiveUpdate: false,
    },
  });

  const { register, control, watch, setValue, getValues, reset } = form;
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(true);
  const [isPhoneNumber2Verified, setIsPhoneNumber2Verified] = useState(true);
  const [isPhone1, setIsPhone1] = useState(false);

  const samePhoneNumber = watch("samePhoneNumber");
  const phoneNumber1 = watch("phoneNumber");
  const phoneNumber2 = watch("phoneNumber2");

  useEffect(() => {
    samePhoneNumber ? setValue("phoneNumber2", getValues("phoneNumber")) : "";
  }, [samePhoneNumber, setValue, getValues]);

  useEffect(() => {
    phoneNumber1 === phoneNumber2 ? "" : setValue("samePhoneNumber", false);
  }, [phoneNumber2, setValue, getValues]);

  useEffect(() => {
    setIsPhoneNumberVerified(false);
  }, [phoneNumber1]);

  useEffect(() => {
    setIsPhoneNumber2Verified(false);
  }, [phoneNumber2]);

  const { basicInfo, location, partnerDetails, deliveryTime } =
    restaurant || {};

  // FIXED: Uncommented and improved the reset function
  useEffect(() => {
    if (restaurant && Object.keys(restaurant).length > 0) {
      console.log("Populating form with restaurant data:", restaurant);

      reset({
        restaurantName: basicInfo?.name || "",
        restaurantEmail: basicInfo?.email || "",
        addressLine: location?.addressLine || "",
        city: location?.city || "",
        state: location?.state || "",
        pinCode: location?.pinCode || "",
        latitude: location?.coordinates?.[1] || location?.latitude || "",
        longitude: location?.coordinates?.[0] || location?.longitude || "",
        phoneNumber: basicInfo?.phone || "",
        phoneNumber2: partnerDetails?.phone || "",
        STDCode: "",
        landlineNumber: "",
        fullName: partnerDetails?.name || "",
        email: partnerDetails?.email || "",
        samePhoneNumber: false,
        receiveUpdate: false,
        deliveryTime: deliveryTime || "",
      });

      // Set map center and marker position if coordinates exist
      if (
        location?.coordinates ||
        (location?.latitude && location?.longitude)
      ) {
        const lat = location?.coordinates?.[1] || location?.latitude;
        const lng = location?.coordinates?.[0] || location?.longitude;

        if (lat && lng) {
          setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
          setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }
      }
    }
  }, [restaurant, reset]);

  const containerStyle = {
    width: "50%",
    height: "300px",
  };

  const [center, setCenter] = useState({
    lat: 19.8429547,
    lng: 75.2333128,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Create an AdvancedMarkerElement instance
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: map,
        content: "<div style='color: red;'>Hello, World!</div>", // Custom content
      });

      // Add additional marker configuration if needed
    }
  }, [mapRef]);

  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const { pathname } = useLocation();

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setValue("latitude", place.geometry.location.lat());
        setValue("longitude", place.geometry.location.lng());

        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        center.lat = place.geometry.location.lat();
        center.lng = place.geometry.location.lng();

        setMarkerPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setValue("search", place.name);
      }
    }
  };

  const onMapClick = useCallback(
    (e) => {
      setValue("latitude", e.latLng.lat());
      setValue("longitude", e.latLng.lng());
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    },
    [setValue]
  );

  console.log("markerPosition", markerPosition);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(currentLocation);
        setCenter(currentLocation);
      });
    }
  };

  const { res, fetchData, isLoading } = usePostApiReq();
  const {
    res: verifyPhoneRes,
    fetchData: fetchVerifyPhoneData,
    isLoading: isVerifyPhoneLoading,
  } = useGetApiReq();
  const {
    res: res1,
    fetchData: fetchData1,
    isLoading: isLoading1,
  } = usePostApiReq();

  const onSubmit = (data) => {
    console.log("data", data);
    console.log("isPhoneNumberVerified", isPhoneNumberVerified);
    console.log("isPhoneNumber2Verified", isPhoneNumber2Verified);
    console.log("samePhoneNumber", samePhoneNumber);

    const apiData = {
      restaurantName: data.restaurantName,
      email: data.restaurantEmail,
      password: "securepassword",
      restaurantType: "Fine Dining",
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      deliveryTime: data.deliveryTime,
      address: {
        addressLine: data.addressLine,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
      },
      contactDetails: {
        phoneNumber: data.phoneNumber,
        stdCode: data.STDCode,
        landlineNumber: data.landlineNumber,
      },
      ownerDetails: {
        ownerName: data.fullName,
        ownerPhoneNumber: getValues("phoneNumber2"),
        ownerEmail: data.email,
        idProof: "path_to_id_proof",
        sameAsRestaurantPhone: data.samePhoneNumber,
      },
    };

    if (restaurant) {
      fetchData1("/admin/update-restaurant", {
        ...apiData,
        restaurantId: restaurant?._id || restaurant?.id,
      });
    } else {
      fetchData("/admin/restaurant-signup", apiData);
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("register response", res);
      setRestaurant(res?.data?.data?.restaurant);
      toast.success(res?.data.message);
      setPage(2);
    }
  }, [res]);

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("update restaurant response", res1);
      toast.success("Restaurant updated successfully");
      getRestaurant();
      setPage(2);
    }
  }, [res1]);

  const handlePhoneNumberVerify = () => {
    setIsPhone1(true);
    fetchVerifyPhoneData(`/admin/get-otp?phone=${getValues("phoneNumber")}`);
  };

  const handlePhoneNumber2Verify = () => {
    setIsPhone1(false);
    fetchVerifyPhoneData(`/admin/get-otp?phone=${getValues("phoneNumber2")}`);
  };

  useEffect(() => {
    if (verifyPhoneRes?.status === 200 || verifyPhoneRes?.status === 201) {
      toast.success(verifyPhoneRes?.data.message);
      setIsOtpModalOpen(true);
    }
  }, [verifyPhoneRes]);

  // Debug logging
  useEffect(() => {
    console.log("Restaurant data received:", restaurant);
    console.log("Form values:", watch());
  }, [restaurant, watch]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
          <div>
            <div className="flex justify-between gap-2 mb-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex justify-start items-center"
              >
                <MdKeyboardArrowLeft className="text-[#000000] text-2xl" />
                <h2 className="text-[#000000] text-xl font-medium font-roboto">
                  {pathname.includes("/add-restaurant")
                    ? "Add Restaurant"
                    : "Edit Profile"}
                </h2>
              </button>
              <Button
                disabled={isLoading || isLoading1}
                size="lg"
                className="w-20 bg-[#1064FD]"
                type="submit"
              >
                {isLoading || isLoading1 ? "Saving..." : "Save"}
              </Button>
            </div>
            <div className="border border-[#C2CDD6] bg-white rounded-md px-8 py-6">
              <h3 className="text-xl font-bold text-[#4A5E6D]">
                Restaurant Information
              </h3>
              <p className="text-lg font-normal text-[#92A5B5]">
                Restaurant name. address. contact no., owner details
              </p>
              <div className="mt-5">
                <FormField
                  control={control}
                  name="restaurantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-[#344054] font-inter">
                        Restaurant Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adiyaman Hotel"
                          className="placeholder:text-[#667085] placeholder:font-inter border-[#E4E6EE]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-5">
                  <FormField
                    control={control}
                    name="restaurantEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter">
                          Restaurant Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Restaurant Email"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5">
                  <FormField
                    control={control}
                    name="addressLine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter">
                          AddressLine
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="addressLine"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-5">
                  <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="city"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter">
                          State
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="state"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter">
                          PinCode
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="pinCode"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-5">
                  <p className="class-xl4 text-[#637D92]">
                    Please accurately place the pin at your outlet's location on
                    the map.
                  </p>
                  <p className="class-lg3 text-[#A8A8A8] mt-2">
                    This will assist your customers and Capsico riders in
                    finding your store easily.
                  </p>

                  <div className="mt-5">
                    <LoadScript
                      googleMapsApiKey={
                        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                      }
                      libraries={libraries}
                      loadingElement={<div>Loading...</div>}
                      async
                    >
                      <div className="mb-2">
                        <FormField
                          control={control}
                          name="search"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                              <FormControl>
                                <Autocomplete
                                  onLoad={(autocomplete) =>
                                    setAutocomplete(autocomplete)
                                  }
                                  onPlaceChanged={handlePlaceSelect}
                                >
                                  <div className="flex border rounded">
                                    <Input
                                      placeholder="Search for your store here & drop a pin on its location."
                                      className="placeholder:text-[#667085] placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                      {...field}
                                    />
                                    <button
                                      onClick={detectLocation}
                                      type="button"
                                      className="text-[#1AA6F1] flex items-center gap-1 px-4 py-2"
                                    >
                                      <CiLocationOn size={20} />
                                      <span className="font-bold">Detect</span>
                                    </button>
                                  </div>
                                </Autocomplete>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onClick={onMapClick}
                        onLoad={(map) => (mapRef.current = map)}
                      >
                        {markerPosition && <Marker position={markerPosition} />}
                      </GoogleMap>
                    </LoadScript>
                  </div>
                  <p className="class-lg4 text-[#666666] mt-4">
                    Or directly enter the co-ordinates
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5">
                  <FormField
                    control={control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Latitude"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Longitude"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {/* <FormField
                    control={control}
                    name="deliveryTime"
                    render={({ field }) => (
                      <FormItem className="mt-5 w-1/2">
                        <FormLabel className="text-[#344054] font-inter">
                          Delivery Time
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select delivery time" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="10-20 min">10–20 min</SelectItem>
                            <SelectItem value="20-30 min">20–30 min</SelectItem>
                            <SelectItem value="30-40 min">30–40 min</SelectItem>
                            <SelectItem value="40-50 min">40–50 min</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={control}
                    name="deliveryTime"
                    render={({ field }) => (
                      <FormItem className="mt-5 w-1/2">
                        <FormLabel className="text-[#344054] font-inter">
                          Delivery Time (minutes)
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="e.g. 20-30 min"
                            className="placeholder:text-[#667085]"
                            {...field}
                          />
                        </FormControl>

                        <FormDescription className="text-xs text-muted-foreground">
                          Enter estimated delivery time range
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border border-[#C2CDD6] bg-white rounded-md px-8 py-6 mt-6">
              <h3 className="text-xl font-bold text-[#4A5E6D]">
                Contact number at Restaurant
              </h3>
              <p className="text-lg font-normal text-[#92A5B5]">
                Your customers can call this number for general inquiries.
              </p>
              <div className="mt-5">
                <FormField
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-[#344054] font-inter">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex gap-0 border rounded w-full">
                            <Select className="">
                              <SelectTrigger className="w-[100px] border-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0">
                                <SelectValue placeholder="India" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="india">India</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="+91 (98XXX XXXXX)"
                              className="placeholder:text-[#667085] w-full placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                          <div>
                            {/* {watch("phoneNumber")?.length === 10 &&
                            isPhoneNumberVerified ? (
                              <Button
                                type="button"
                                disabled={watch("phoneNumber")?.length !== 10}
                                variant="capsico"
                                className="disabled:bg-[#E1E1E1] w-auto px-4"
                              >
                                Verified
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                onClick={handlePhoneNumberVerify}
                                disabled={watch("phoneNumber")?.length !== 10}
                                variant="capsico"
                                className="disabled:bg-[#E1E1E1] w-auto px-4"
                              >
                                Verify
                              </Button>
                            )} */}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border border-[#C2CDD6] bg-white rounded-md px-8 py-6 mt-6">
              <h3 className="text-xl font-bold text-[#4A5E6D]">
                Restaurant Owner Details
              </h3>
              <p className="text-lg font-normal text-[#92A5B5]">
                These will be used to share communications related to revenue.
              </p>

              <FormField
                control={control}
                name="samePhoneNumber"
                render={({ field }) => (
                  <FormItem className="flex gap-3 items-center">
                    <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-[#667085] class-lg1">
                        Same as restaurant mobile number
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-5">
                <FormField
                  control={control}
                  name="phoneNumber2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-[#344054] font-inter">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex gap-0 border rounded w-full">
                            <Select className="">
                              <SelectTrigger className="w-[100px] border-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0">
                                <SelectValue placeholder="India" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="india">India</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="+91 (98XXX XXXXX)"
                              className="placeholder:text-[#667085] w-full placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                          <div>
                            {/* {!watch("samePhoneNumber") && (
                              <>
                                {watch("phoneNumber2")?.length === 10 &&
                                isPhoneNumber2Verified ? (
                                  <Button
                                    type="button"
                                    disabled={
                                      watch("phoneNumber2")?.length !== 10
                                    }
                                    variant="capsico"
                                    className="disabled:bg-[#E1E1E1] w-auto px-4"
                                  >
                                    Verified
                                  </Button>
                                ) : (
                                  <Button
                                    type="button"
                                    onClick={handlePhoneNumber2Verify}
                                    disabled={
                                      watch("phoneNumber2")?.length !== 10
                                    }
                                    variant="capsico"
                                    className="disabled:bg-[#E1E1E1] w-auto px-4"
                                  >
                                    Verify
                                  </Button>
                                )}
                              </>
                            )} */}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-5">
                  <FormField
                    control={control}
                    name="receiveUpdate"
                    render={({ field }) => (
                      <FormItem className="flex gap-3 items-center">
                        <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-5 w-5"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="class-lg1 text-[#667085]">
                            Yes, I am interested in receiving important updates
                            and notifications from Capsico through WhatsApp.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 w-[66%] gap-5">
                  <FormField
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter">
                          Restaurant Owner Full name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Adiyaman Kumar"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter">
                          Restaurant Owner email address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@company.com"
                            className="placeholder:text-[#667085] placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {isOtpModalOpen && (
              <VerifyPhoneOtpModal
                isOtpModalOpen={isOtpModalOpen}
                setIsOtpModalOpen={setIsOtpModalOpen}
                phone={
                  isPhone1
                    ? getValues("phoneNumber")
                    : getValues("phoneNumber2")
                }
                resendOtp={handlePhoneNumberVerify}
                setIsPhoneNumberVerified={
                  isPhone1
                    ? setIsPhoneNumberVerified
                    : setIsPhoneNumber2Verified
                }
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile1;
