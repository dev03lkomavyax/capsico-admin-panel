//mansi code
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import ChangePassword from "@/components/admin/ChangePassword";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { permissions } from "@/constants/permissions";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { EditSubAdminSchema } from "@/schema/AddSubAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const EditSubAdmin = () => {
  const form = useForm({
    resolver: zodResolver(EditSubAdminSchema),
    defaultValues: {
      position: "",
      name: "",
      phoneNumber: "",
      email: "",
      permissions: {
        dashboard: "none",
        subAdmin: "none",
        customer: "none",
        restaurant: "none",
        vendor: "none",
        deliveryAgent: "none",
        order: "none",
        review: "none",
        offer: "none",
        applicationRequest: "none",
      },
    },
  });

  const { control, reset, handleSubmit, setValue } = form;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  // NEW: Toggle state
  const [toggleStatus, setToggleStatus] = useState(false);
  
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // ADD MODE DETECTION
  const mode = state?.mode || 'edit';
  const isViewMode = mode === 'view';
  
  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: updateAdminRes,
    fetchData: uploadAdminData,
    isLoading: isAdminLoading,
  } = usePatchApiReq();

  // NEW: Toggle API hook
  const {
    res: toggleRes,
    fetchData: toggleStatusAPI,
    isLoading: isToggling,
  } = usePatchApiReq();

  const getSubadminDetails = () => {
    fetchData(`/admin/get-subadmin-details/${state?.subadminId}`);
  };

  useEffect(() => {
    getSubadminDetails();
  }, [state?.subadminId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("subadmin details res", res);
      const { subAdmin } = res?.data?.data || {};
      subAdmin?.email && setValue("email", subAdmin.email);
      subAdmin?.position && setValue("position", subAdmin.position);
      subAdmin?.name && setValue("name", subAdmin.name);
      subAdmin?.phone && setValue("phoneNumber", subAdmin.phone);
      subAdmin?.permissions && setValue("permissions", subAdmin.permissions);
      // NEW: Set toggle status
      setToggleStatus(subAdmin?.isActive || false);
    }
  }, [res]);

  // NEW: Toggle handler function
  // const handleToggle = async () => {
  //   const newStatus = !toggleStatus;
  //   setToggleStatus(newStatus);
    
  //   try {
  //     await toggleStatusAPI(`/admin/toggle-status/${state?.subadminId}`);
  //     // Refresh the details after successful toggle
  //     getSubadminDetails();
  //   } catch (error) {
  //     // Revert status on error
  //     setToggleStatus(!newStatus);
  //     console.error('Toggle failed:', error);
  //   }
  // };

  // NEW: Effect to handle toggle response
  useEffect(() => {
    if (toggleRes?.status === 200 || toggleRes?.status === 201) {
      console.log("toggle status res", toggleRes);
      // Refresh subadmin details after successful toggle
      getSubadminDetails();
    }
  }, [toggleRes]);

  const onSubmit = (data) => {
    console.log("data", data);

    uploadAdminData(`/admin/update-subadmin/${state?.subadminId}`, {
      name: data.name,
      email: data.email,
      position: data.position,
      phone: data.phoneNumber,
      permissions: data.permissions,
    });
  };

  useEffect(() => {
    if (updateAdminRes?.status === 200 || updateAdminRes?.status === 201) {
      console.log("subadmin update res", updateAdminRes);
      getSubadminDetails();
    }
  }, [updateAdminRes]);

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full">
        <div className="bg-[#FFFFFF] px-8 py-6">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" w-full bg-[#FFFFFF]"
            >
              <div className="flex gap-1 items-center mb-4">
                <MdKeyboardArrowLeft
                  onClick={() => navigate(-1)}
                  className="text-[#1064FD] text-3xl cursor-pointer"
                />
                <h2 className="text-[#1064FD] text-2xl text-left font-bold font-nunito">
                  {isViewMode ? 'View sub admin' : 'Edit sub admin'}
                </h2>
                
                {/* NEW: Toggle switch in header */}
                <div className="ml-auto flex items-center gap-3">
                  <span className={`text-sm font-medium ${toggleStatus ? 'text-green-600' : 'text-gray-500'}`}>
                    {toggleStatus ? 'Active' : 'Inactive'}
                  </span>
                  {/* <button
                    type="button"
                    onClick={handleToggle}
                    disabled={isToggling}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      toggleStatus ? 'bg-green-600' : 'bg-gray-200'
                    } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        toggleStatus ? 'translate-x-6' : 'translate-x-1'
                      }`} */}
                    {/* /> */}
                  {/* </button> */}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <FormField
                  control={control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-nunito opacity-80`}
                      >
                        Position
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isViewMode}
                        >
                          <SelectTrigger className={`flex justify-between ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg`}>
                            <SelectValue placeholder="Select Position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="analyst">Analyst</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-nunito opacity-80`}
                      >
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          className={`placeholder:text-[#A6A6A6] ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} rounded-lg mt-4`}
                          disabled={isViewMode}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-nunito opacity-80`}
                      >
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10- digit number"
                          className={`placeholder:text-[#A6A6A6] ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} rounded-lg mt-4`}
                          disabled={isViewMode}
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
                      <FormLabel
                        className={`text-[#111928] font-semibold font-nunito opacity-80`}
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email address"
                          className={`placeholder:text-[#A6A6A6] ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} rounded-lg mt-4`}
                          disabled={isViewMode}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Label className="text-sm font-medium inline-block mt-5">
                Permissions
              </Label>

              <div className="grid grid-cols-6 gap-3 mt-1">
                {permissions.map((permission) => (
                  <FormField
                    key={permission.value}
                    control={control}
                    name={`permissions.${permission.value}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium capitalize">
                          {permission.label}
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isViewMode}
                          >
                            <FormControl
                              className={`${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} border-[#D1D5DB] rounded-lg`}
                            >
                              <SelectTrigger className="w-full text-[#6B7280] text-sm font-normal font-inter">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                                <SelectItem value="read&write">
                                  Read and Write
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Only show change password button in edit mode */}
              {!isViewMode && (
                <button
                  type="button"
                  onClick={() => setIsChangePassword(true)}
                  className="text-[#397FFE] text-base font-semibold font-inter mt-3 cursor-pointer"
                >
                  Change password
                </button>
              )}

              {/* Only show save button in edit mode */}
              {!isViewMode && (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="h-11 w-[190px] mt-5 bg-[#1064FD] hover:bg-[#1064FD] text-base"
                  >
                    Save Changes
                  </Button>
                </div>
              )}

              {/* Show edit button in view mode */}
              {isViewMode && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => navigate("/admin/sub-admin/edit-subadmin", {
                      state: { subadminId: state?.subadminId, mode: 'edit' }
                    })}
                    className="h-11 w-[190px] mt-5 bg-[#1064FD] hover:bg-[#1064FD] text-base"
                  >
                    Edit Sub Admin
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
        {isChangePassword && (
          <ChangePassword
            isChangePassword={isChangePassword}
            setIsChangePassword={setIsChangePassword}
            subadminId={state?.subadminId}
          />
        )}
      </section>
    </AdminWrapper>
  );
};

export default EditSubAdmin;
















//mansi code

// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import ChangePassword from "@/components/admin/ChangePassword";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { permissions } from "@/constants/permissions";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import usePatchApiReq from "@/hooks/usePatchApiReq";
// import { EditSubAdminSchema } from "@/schema/AddSubAdminSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { useLocation, useNavigate } from "react-router-dom";

// const EditSubAdmin = () => {
//   const form = useForm({
//     resolver: zodResolver(EditSubAdminSchema),
//     defaultValues: {
//       position: "",
//       name: "",
//       phoneNumber: "",
//       email: "",
//       permissions: {
//         dashboard: "none",
//         subAdmin: "none",
//         customer: "none",
//         restaurant: "none",
//         vendor: "none",
//         deliveryAgent: "none",
//         order: "none",
//         review: "none",
//         offer: "none",
//         applicationRequest: "none",
//       },
//     },
//   });

//   const { control, reset, handleSubmit, setValue } = form;
//   const [isShowPassword, setIsShowPassword] = useState(false);
//   const [isChangePassword, setIsChangePassword] = useState(false);
  
//   const { state } = useLocation();
//   const navigate = useNavigate();
  
//   // ADD MODE DETECTION
//   const mode = state?.mode || 'edit';
//   const isViewMode = mode === 'view';
  
//   const { res, fetchData, isLoading } = useGetApiReq();
//   const {
//     res: updateAdminRes,
//     fetchData: uploadAdminData,
//     isLoading: isAdminLoading,
//   } = usePatchApiReq();

//   const getSubadminDetails = () => {
//     fetchData(`/admin/get-subadmin-details/${state?.subadminId}`);
//   };

//   useEffect(() => {
//     getSubadminDetails();
//   }, [state?.subadminId]);

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("subadmin details res", res);
//       const { subAdmin } = res?.data?.data || {};
//       subAdmin?.email && setValue("email", subAdmin.email);
//       subAdmin?.position && setValue("position", subAdmin.position);
//       subAdmin?.name && setValue("name", subAdmin.name);
//       subAdmin?.phone && setValue("phoneNumber", subAdmin.phone);
//       subAdmin?.permissions && setValue("permissions", subAdmin.permissions);
//     }
//   }, [res]);

//   const onSubmit = (data) => {
//     console.log("data", data);

//     uploadAdminData(`/admin/update-subadmin/${state?.subadminId}`, {
//       name: data.name,
//       email: data.email,
//       position: data.position,
//       phone: data.phoneNumber,
//       permissions: data.permissions,
//     });
//   };

//   useEffect(() => {
//     if (updateAdminRes?.status === 200 || updateAdminRes?.status === 201) {
//       console.log("subadmin update res", updateAdminRes);
//       getSubadminDetails();
//     }
//   }, [updateAdminRes]);

//   return (
//     <AdminWrapper>
//       <section className="px-0 py-0 w-full">
//         <div className="bg-[#FFFFFF] px-8 py-6">
//           <Form {...form}>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className=" w-full bg-[#FFFFFF]"
//             >
//               <div className="flex gap-1 items-center mb-4">
//                 <MdKeyboardArrowLeft
//                   onClick={() => navigate(-1)}
//                   className="text-[#1064FD] text-3xl cursor-pointer"
//                 />
//                 <h2 className="text-[#1064FD] text-2xl text-left font-bold font-nunito">
//                   {isViewMode ? 'View sub admin' : 'Edit sub admin'}
//                 </h2>
//               </div>

//               <div className="grid grid-cols-3 gap-6">
//                 <FormField
//                   control={control}
//                   name="position"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Position
//                       </FormLabel>
//                       <FormControl>
//                         <Select
//                           value={field.value}
//                           onValueChange={field.onChange}
//                           disabled={isViewMode}
//                         >
//                           <SelectTrigger className={`flex justify-between ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg`}>
//                             <SelectValue placeholder="Select Position" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="manager">Manager</SelectItem>
//                             <SelectItem value="support">Support</SelectItem>
//                             <SelectItem value="analyst">Analyst</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Full Name"
//                           className={`placeholder:text-[#A6A6A6] ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} rounded-lg mt-4`}
//                           disabled={isViewMode}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Phone number
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="10- digit number"
//                           className={`placeholder:text-[#A6A6A6] ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} rounded-lg mt-4`}
//                           disabled={isViewMode}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Email
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="Email address"
//                           className={`placeholder:text-[#A6A6A6] ${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} rounded-lg mt-4`}
//                           disabled={isViewMode}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <Label className="text-sm font-medium inline-block mt-5">
//                 Permissions
//               </Label>

//               <div className="grid grid-cols-6 gap-3 mt-1">
//                 {permissions.map((permission) => (
//                   <FormField
//                     key={permission.value}
//                     control={control}
//                     name={`permissions.${permission.value}`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-sm font-medium capitalize">
//                           {permission.label}
//                         </FormLabel>
//                         <FormControl>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value}
//                             disabled={isViewMode}
//                           >
//                             <FormControl
//                               className={`${isViewMode ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#F9FAFB]'} border-[#D1D5DB] rounded-lg`}
//                             >
//                               <SelectTrigger className="w-full text-[#6B7280] text-sm font-normal font-inter">
//                                 <SelectValue />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectGroup>
//                                 <SelectItem value="none">None</SelectItem>
//                                 <SelectItem value="read">Read</SelectItem>
//                                 <SelectItem value="read&write">
//                                   Read and Write
//                                 </SelectItem>
//                               </SelectGroup>
//                             </SelectContent>
//                           </Select>
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 ))}
//               </div>

//               {/* Only show change password button in edit mode */}
//               {!isViewMode && (
//                 <button
//                   type="button"
//                   onClick={() => setIsChangePassword(true)}
//                   className="text-[#397FFE] text-base font-semibold font-inter mt-3 cursor-pointer"
//                 >
//                   Change password
//                 </button>
//               )}

//               {/* Only show save button in edit mode */}
//               {!isViewMode && (
//                 <div className="flex justify-end">
//                   <Button
//                     type="submit"
//                     className="h-11 w-[190px] mt-5 bg-[#1064FD] hover:bg-[#1064FD] text-base"
//                   >
//                     Save Changes
//                   </Button>
//                 </div>
//               )}

//               {/* Show edit button in view mode */}
//               {isViewMode && (
//                 <div className="flex justify-end">
//                   <Button
//                     type="button"
//                     onClick={() => navigate("/admin/sub-admin/edit-subadmin", {
//                       state: { subadminId: state?.subadminId, mode: 'edit' }
//                     })}
//                     className="h-11 w-[190px] mt-5 bg-[#1064FD] hover:bg-[#1064FD] text-base"
//                   >
//                     Edit Sub Admin
//                   </Button>
//                 </div>
//               )}
//             </form>
//           </Form>
//         </div>
//         {isChangePassword && (
//           <ChangePassword
//             isChangePassword={isChangePassword}
//             setIsChangePassword={setIsChangePassword}
//             subadminId={state?.subadminId}
//           />
//         )}
//       </section>
//     </AdminWrapper>
//   );
// };

// export default EditSubAdmin;



























//vivek code

// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import ChangePassword from "@/components/admin/ChangePassword";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { permissions } from "@/constants/permissions";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import usePatchApiReq from "@/hooks/usePatchApiReq";
// import { EditSubAdminSchema } from "@/schema/AddSubAdminSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { useLocation, useNavigate } from "react-router-dom";

// const EditSubAdmin = () => {
//   const form = useForm({
//     resolver: zodResolver(EditSubAdminSchema),
//     defaultValues: {
//       position: "",
//       name: "",
//       phoneNumber: "",
//       email: "",
//       permissions: {
//         dashboard: "none",
//         subAdmin: "none",
//         customer: "none",
//         restaurant: "none",
//         vendor: "none",
//         deliveryAgent: "none",
//         order: "none",
//         review: "none",
//         offer: "none",
//         applicationRequest: "none",
//       },
//     },
//   });

//   const { control, reset, handleSubmit, setValue } = form;
//   const [isShowPassword, setIsShowPassword] = useState(false);
//   const [isChangePassword, setIsChangePassword] = useState(false);
  
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { res, fetchData, isLoading } = useGetApiReq();
//   const {
//     res: updateAdminRes,
//     fetchData: uploadAdminData,
//     isLoading: isAdminLoading,
//   } = usePatchApiReq();

//   const getSubadminDetails = () => {
//     fetchData(`/admin/get-subadmin-details/${state?.subadminId}`);
//   };
//  const mode=state.mode
//   useEffect(() => {
//     getSubadminDetails();
//   }, [state?.subadminId]);

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("subadmin details res", res);
//       const { subAdmin } = res?.data?.data || {};
//       subAdmin?.email && setValue("email", subAdmin.email);
//       subAdmin?.position && setValue("position", subAdmin.position);
//       subAdmin?.name && setValue("name", subAdmin.name);
//       subAdmin?.phone && setValue("phoneNumber", subAdmin.phone);
//       subAdmin?.permissions && setValue("permissions", subAdmin.permissions);
//     }
//   }, [res]);

//   const onSubmit = (data) => {
//     console.log("data", data);

//     uploadAdminData(`/admin/update-subadmin/${state?.subadminId}`, {
//       name: data.name,
//       email: data.email,
//       position: data.position,
//       phone: data.phoneNumber,
//       permissions: data.permissions,
//     });
//   };

//   useEffect(() => {
//     if (updateAdminRes?.status === 200 || updateAdminRes?.status === 201) {
//       console.log("subadmin update res", updateAdminRes);
//       getSubadminDetails();
//     }
//   }, [updateAdminRes]);

//   return (
//     <AdminWrapper>
//       <section className="px-0 py-0 w-full">
//         <div className="bg-[#FFFFFF] px-8 py-6">
//           <Form {...form}>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className=" w-full bg-[#FFFFFF]"
//             >
//               <div className="flex gap-1 items-center mb-4">
//                 <MdKeyboardArrowLeft
//                   onClick={() => navigate(-1)}
//                   className="text-[#1064FD] text-3xl cursor-pointer"
//                 />
//                 <h2 className="text-[#1064FD] text-2xl text-left font-bold font-nunito">
//                   Edit sub admin
//                 </h2>
//               </div>

//               <div className="grid grid-cols-3 gap-6">
//                 <FormField
//                   control={control}
//                   name="position"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Position
//                       </FormLabel>
//                       <FormControl>
//                         <Select
//                           value={field.value}
//                           onValueChange={field.onChange}
//                         >
//                           <SelectTrigger className="flex justify-between bg-[#F9FAFB] items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
//                             <SelectValue placeholder="Select Position" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="manager">Manager</SelectItem>
//                             <SelectItem value="support">Support</SelectItem>
//                             <SelectItem value="analyst">Analyst</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Full Name"
//                           className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg mt-4`}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Phone number
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="10- digit number"
//                           className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg mt-4`}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={`text-[#111928] font-semibold font-nunito opacity-80`}
//                       >
//                         Email
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="Email address"
//                           className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg mt-4`}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <Label className="text-sm font-medium inline-block mt-5">
//                 Permissions
//               </Label>

//               <div className="grid grid-cols-6 gap-3 mt-1">
//                 {permissions.map((permission) => (
//                   <FormField
//                     key={permission.value}
//                     control={control}
//                     name={`permissions.${permission.value}`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-sm font-medium capitalize">
//                           {permission.label}
//                         </FormLabel>
//                         <FormControl>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value}
//                           >
//                             <FormControl
//                               className={`bg-[#F9FAFB] border-[#D1D5DB] rounded-lg`}
//                             >
//                               <SelectTrigger className="w-full text-[#6B7280] text-sm font-normal font-inter">
//                                 <SelectValue />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectGroup>
//                                 <SelectItem value="none">None</SelectItem>
//                                 <SelectItem value="read">Read</SelectItem>
//                                 <SelectItem value="read&write">
//                                   Read and Write
//                                 </SelectItem>
//                               </SelectGroup>
//                             </SelectContent>
//                           </Select>
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 ))}
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setIsChangePassword(true)}
//                 className="text-[#397FFE] text-base font-semibold font-inter mt-3 cursor-pointer"
//               >
//                 Change password
//               </button>

//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="h-11 w-[190px] mt-5 bg-[#1064FD] hover:bg-[#1064FD] text-base"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//         {isChangePassword && (
//           <ChangePassword
//             isChangePassword={isChangePassword}
//             setIsChangePassword={setIsChangePassword}
//             subadminId={state?.subadminId}
//           />
//         )}
//       </section>
//     </AdminWrapper>
//   );
// };

// export default EditSubAdmin;
