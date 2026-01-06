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
// import { Textarea } from "@/components/ui/textarea";
// import usePostApiReq from "@/hooks/usePostApiReq";
// import { categorySchema } from "@/schema/restaurantSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import usePatchApiReq from "@/hooks/usePatchApiReq";
// import Spinner from "../Spinner";

// const CategoryEditModel = ({
//   isOpenCategoryModel,
//   setIsOpenCategoryModel,
//   getCategories,
//   category,
// }) => {
//   const { res, isLoading, fetchData } = usePostApiReq();
//   const {
//     res: res1,
//     isLoading: isLoading1,
//     fetchData: fetchData1,
//   } = usePatchApiReq();

//   const form = useForm({
//     resolver: zodResolver(categorySchema),
//     defaultValues: {
//       category: category?.name || "",
//       description: category?.description || "",
//       isActive: category?.isActive || false,
//     },
//   });
//   const params = useParams();

//   const { register, control, watch, setValue, getValues, reset } = form;

//   const onSubmit = (data) => {
//     console.log("data", data);

//     if (category) {
//       fetchData1(
//         `/admin/update-category/${params?.restaurantId}?categoryId=${category?.id}`,
//         {
//           name: data.category,
//           description: data.description,
//           isActive: data.isActive,
//         }
//       );
//     } else {
//       fetchData(`/admin/post-add-category/${params?.restaurantId}`, {
//         name: data.category,
//         description: data.description,
//       });
//     }
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("Add category res", res);
//       toast.success(res?.data?.message);
//       getCategories();
//       reset();
//       setIsOpenCategoryModel(false);
//     }
//   }, [res]);

//   useEffect(() => {
//     if (res1?.status === 200 || res1?.status === 201) {
//       console.log("update category res", res1);
//       toast.success(res1?.data?.message);
//       getCategories();
//       reset();
//       setIsOpenCategoryModel(false);
//     }
//   }, [res1]);

//   return (
//     <Dialog open={isOpenCategoryModel} onOpenChange={setIsOpenCategoryModel}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{category ? "Edit" : "Add"} Category</DialogTitle>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="w-full py-3"
//             >
//               <div className="w-full mt-5">
//                 <FormField
//                   control={control}
//                   name="category"
//                   render={({ field }) => (
//                     <FormItem className="z-20">
//                       <FormLabel className="text-[#969696]">
//                         Category Name
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

//               {category && (
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
//                 type="submit"
//                 size="lg"
//                 variant="capsico"
//                 className="w-full mt-10"
//               >
//                 {isLoading || isLoading1 ? (
//                   <Spinner />
//                 ) : category ? (
//                   "Update Category"
//                 ) : (
//                   "Add Category"
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

// export default CategoryEditModel;
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
import { Textarea } from "@/components/ui/textarea";
import usePostApiReq from "@/hooks/usePostApiReq";
import { categorySchema } from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import Spinner from "../Spinner";
import usePutApiReq from "@/hooks/usePutApiReq";

const CategoryEditModel = ({
  isOpenCategoryModel,
  setIsOpenCategoryModel,
  getCategories,
  category,
}) => {
  const { res, isLoading, fetchData } = usePostApiReq();
  const {
    res: res1,
    isLoading: isLoading1,
    fetchData: fetchData1,
  } = usePutApiReq();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: category?.name || "",
      description: category?.description || "",
      isActive: category?.isActive || false,
    },
  });
  const params = useParams();

  const { register, control, watch, setValue, getValues, reset } = form;

  console.log("category", category);
  const onSubmit = (data) => {
    console.log("data", data);

    if (category) {
      // Updated to use /restaurant/ endpoint for consistency
      fetchData1(
        `/restaurant/restaurants/${params?.restaurantId}/update-category/${category?.id || category?._id}`,
        {
          name: data.category,
          description: data.description,
          isActive: data.isActive,
        }
      );
    } else {
      // Updated to use /restaurant/ endpoint (matches your API response)
      fetchData(
        `/restaurant/post-add-category/${params?.restaurantId}`,
        {
          name: data.category,
          description: data.description,
        },
        {
          reportCrash: true,
          screenName: "CATEGORY_CREATE",
        }
      );
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("Add category res", res);
      toast.success(res?.data?.message);
      getCategories();
      reset();
      setIsOpenCategoryModel(false);
    }
  }, [res]);

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("update category res", res1);
      toast.success(res1?.data?.message);
      getCategories();
      reset();
      setIsOpenCategoryModel(false);
    }
  }, [res1]);

  return (
    <Dialog open={isOpenCategoryModel} onOpenChange={setIsOpenCategoryModel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Edit" : "Add"} Category</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full py-3"
            >
              <div className="w-full mt-5">
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="z-20">
                      <FormLabel className="text-[#969696]">
                        Category Name
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

              {category && (
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
                type="submit"
                size="lg"
                variant="capsico"
                className="w-full mt-10"
              >
                {isLoading || isLoading1 ? (
                  <Spinner />
                ) : category ? (
                  "Update Category"
                ) : (
                  "Add Category"
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

export default CategoryEditModel;
