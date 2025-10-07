// /* eslint-disable react/prop-types */
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
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
// import { Textarea } from "@/components/ui/textarea";
// import usePatchApiReq from "@/hooks/usePatchApiReq";
// import usePostApiReq from "@/hooks/usePostApiReq";
// import { subCategorySchema } from "@/schema/restaurantSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import Spinner from "../Spinner";

// const SubCategoryEditModel = ({
//   isOpenSubCategoryModel,
//   setIsOpenSubCategoryModel,
//   id,
//   getCategories,
//   subCategory,
// }) => {
//   const { res, isLoading, fetchData } = usePostApiReq();
//   const {
//     res: res1,
//     isLoading: isLoading1,
//     fetchData: fetchData1,
//   } = usePatchApiReq();

//   const form = useForm({
//     resolver: zodResolver(subCategorySchema),
//     defaultValues: {
//       subCategory: subCategory?.name || "",
//       description: subCategory?.description || "",
//       isActive: subCategory?.isActive || false,
//     },
//   });

//   const params = useParams();
//   const { register, control, watch, setValue, reset, getValues } = form;
//   console.log("getvalues", getValues());
  

//   const onSubmit = (data) => {
//     console.log("data", data);

//     if (subCategory) {
//       fetchData1(
//         `/admin/update-subcategory/${params?.restaurantId}?subCategoryId=${subCategory?.id}`,
//         {
//           name: data.subCategory,
//           description: data.description,
//           isActive: data.isActive,
//         }
//       );
//     } else {
//       fetchData(`/admin/post-add-subcategory/${params?.restaurantId}`, {
//         name: data.subCategory,
//         description: data.description,
//         categoryId: id,
//       });
//     }
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("Add sub-category res", res);
//       toast.success(res?.data?.message);
//       getCategories();
//       setIsOpenSubCategoryModel(false);
//       reset();
//     }
//   }, [res]);

//   useEffect(() => {
//     if (res1?.status === 200 || res1?.status === 201) {
//       console.log("Add sub-category res", res1);
//       toast.success(res1?.data?.message);
//       getCategories();
//       setIsOpenSubCategoryModel(false);
//       reset();
//     }
//   }, [res1]);

//   return (
//     <Dialog
//       open={isOpenSubCategoryModel}
//       onOpenChange={setIsOpenSubCategoryModel}
//     >
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{subCategory ? "Edit" : "Add"} Sub Category</DialogTitle>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="w-full py-3"
//             >
//               <div className="w-full mt-5">
//                 <FormField
//                   control={control}
//                   name="subCategory"
//                   render={({ field }) => (
//                     <FormItem className="z-20">
//                       <FormLabel className="text-[#969696]">
//                         Sub Category Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input type="text" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="w-full mt-5">
//                 <FormField
//                   control={control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem className="z-20">
//                       <FormLabel className="text-[#969696]">
//                         Description
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea className="resize-none" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               {subCategory && (
//                 <div className="w-full mt-5">
//                   <FormField
//                     control={control}
//                     name="isActive"
//                     render={({ field }) => (
//                       <FormItem className="z-20">
//                         <FormLabel className="text-[#969696]">
//                           isActive
//                         </FormLabel>
//                         <Select
//                           onValueChange={(val) =>
//                             field.onChange(val === "true")
//                           }
//                           value={String(field.value)}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select Project" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="true">Yes</SelectItem>
//                             <SelectItem value="false">No</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               )}
//               <Button
//                 disabled={isLoading || isLoading1}
//                 type="submit"
//                 size="lg"
//                 variant="capsico"
//                 className="w-full mt-10"
//               >
//                 {isLoading || isLoading1 ? (
//                   <Spinner />
//                 ) : subCategory ? (
//                   "Update Sub Category"
//                 ) : (
//                   "Add Sub Category"
//                 )}
//               </Button>
//             </form>
//           </Form>
//           <DialogDescription></DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SubCategoryEditModel;




/* eslint-disable react/prop-types */


/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { subCategorySchema } from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";

const SubCategoryEditModel = ({
  isOpenSubCategoryModel,
  setIsOpenSubCategoryModel,
  categoryId, // This is the parent category ID
  getCategories,
  subCategory,
}) => {
  const { res, isLoading, fetchData } = usePostApiReq();
  const {
    res: res1,
    isLoading: isLoading1,
    fetchData: fetchData1,
  } = usePatchApiReq();

  const form = useForm({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      subCategory: subCategory?.name || "",
      description: subCategory?.description || "",
      isActive: subCategory?.isActive || false,
    },
  });

  const params = useParams();
  const { control, reset } = form;

  const onSubmit = (data) => {
    console.log("data", data);

    if (subCategory) {
      // Use your existing update subcategory API: /update-subcategory
      fetchData1(`/restaurant/update-subcategory`, {
        subcategoryId: subCategory?.id,
        name: data.subCategory,
        description: data.description,
        isActive: data.isActive,
      });
    } else {
      // Use your existing add subcategory API: /post-add-subcategory/:id
      fetchData(`/restaurant/post-add-subcategory/${categoryId}`, {
        name: data.subCategory,
        description: data.description,
      });
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("Add sub-category res", res);
      toast.success(res?.data?.message || "Subcategory added successfully");
      getCategories();
      setIsOpenSubCategoryModel(false);
      reset();
    }
  }, [res]);

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("Update sub-category res", res1);
      toast.success(res1?.data?.message || "Subcategory updated successfully");
      getCategories();
      setIsOpenSubCategoryModel(false);
      reset();
    }
  }, [res1]);

  return (
    <Dialog
      open={isOpenSubCategoryModel}
      onOpenChange={setIsOpenSubCategoryModel}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{subCategory ? "Edit" : "Add"} Sub Category</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full py-3"
            >
              <div className="w-full mt-5">
                <FormField
                  control={control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem className="z-20">
                      <FormLabel className="text-[#969696]">
                        Sub Category Name
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full mt-5">
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="z-20">
                      <FormLabel className="text-[#969696]">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {subCategory && (
                <div className="w-full mt-5">
                  <FormField
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="z-20">
                        <FormLabel className="text-[#969696]">
                          isActive
                        </FormLabel>
                        <Select
                          onValueChange={(val) =>
                            field.onChange(val === "true")
                          }
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <Button
                disabled={isLoading || isLoading1}
                type="submit"
                size="lg"
                variant="capsico"
                className="w-full mt-10"
              >
                {isLoading || isLoading1 ? (
                  <Spinner />
                ) : subCategory ? (
                  "Update Sub Category"
                ) : (
                  "Add Sub Category"
                )}
              </Button>
            </form>
          </Form>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SubCategoryEditModel;
