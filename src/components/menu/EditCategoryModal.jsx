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
import usePostApiReq from "@/hooks/usePostApiReq";
import usePutApiReq from "@/hooks/usePutApiReq";
import { categorySchema } from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import useGetApiReq from "@/hooks/useGetApiReq";
import { Label } from "../ui/label";

const EditCategoryModal = ({
  isOpenCategoryModel,
  setIsOpenCategoryModel,
  category,
  getDataFun,
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
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  // const [category, setCategory] = useState("")

  useEffect(() => {
    if (categoryId) {
      const category = allCategories.find((cat) => cat.value === categoryId);
      console.log("selected category", category);
      reset({
        category: category?.label || "",
        description: category?.description || "",
        isActive: category?.isActive || false,
      });
    }
  }, [categoryId]);

  const {
    res: getRes,
    fetchData: getData,
    isLoading: isGetLoading,
  } = useGetApiReq();

  const getCategories = () => {
    const url = `/restaurant/get-categories?restaurantId=${
      params?.restaurantId
    }&page=${1}`;
    getData(url);
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Enhanced debug logging
  useEffect(() => {
    if (getRes?.status === 200 || getRes?.status === 201) {
      console.log("✅ Full response data:", getRes?.data);

      const categories = getRes?.data?.data?.categories || [];
      console.log("✅ Extracted categories:", categories);
      const modifiedCategories = categories?.map((item) => ({
        label: item?.name,
        value: item?.id,
        description: item?.description,
        isActive: item?.isActive,
      }));
      setAllCategories(modifiedCategories || []);
      // setTotalPage(getRes?.data?.pagination?.totalPages || 1);
    }
  }, [getRes]);

  const onSubmit = (data) => {
    console.log("data", data);

    fetchData1(
      `/restaurant/restaurants/${params?.restaurantId}/update-category/${categoryId}`,
      {
        name: data.category,
        description: data.description,
        isActive: data.isActive,
      }
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("Add category res", res);
      toast.success(res?.data?.message);
      getData();
      reset();
      setIsOpenCategoryModel(false);
    }
  }, [res]);

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("update category res", res1);
      toast.success(res1?.data?.message);
      getDataFun();
      reset();
      setIsOpenCategoryModel(false);
    }
  }, [res1]);

  return (
    <Dialog open={isOpenCategoryModel} onOpenChange={setIsOpenCategoryModel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full py-3"
            >
              <div className="w-full mt-5 space-y-2">
                <Label className="text-[#969696]">Select Category</Label>
                <Select
                  onValueChange={(value) => setCategoryId(value)}
                  value={categoryId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allCategories?.map((category) => (
                      <SelectItem key={category?.value} value={category?.value}>
                        {category?.label}
                      </SelectItem>
                    ))}

                    {allCategories.length === 0 && <p>No categories found</p>}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full mt-5">
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
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

              <div className="w-full mt-5">
                <FormField
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="z-20">
                      <FormLabel className="text-[#969696]">isActive</FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(val === "true")}
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

              <Button
                type="submit"
                size="lg"
                variant="capsico"
                className="w-full mt-10"
              >
                {isLoading || isLoading1 ? <Spinner /> : "Update Category"}
              </Button>
            </form>
          </Form>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
