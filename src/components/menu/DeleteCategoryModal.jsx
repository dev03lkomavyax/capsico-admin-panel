import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ReactPagination from "../pagination/ReactPagination";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const DeleteCategoryModal = ({
  isOpenCategoryModel,
  setIsOpenCategoryModel,
  getDataFun,
}) => {
  const { res, isLoading, fetchData } = useDeleteApiReq();

  const params = useParams();

  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const {
    res: getRes,
    fetchData: getData,
    isLoading: isGetLoading,
  } = useGetApiReq();

  const getCategories = () => {
    const url = `/restaurant/get-categories?restaurantId=${params?.restaurantId}&page=${page}`;
    getData(url, {
      reportCrash: true,
      screenName: "CATEGORY_GET",
    });
  };

  useEffect(() => {
    getCategories();
  }, [page]);

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
      setTotalPage(getRes?.data?.pagination?.totalPages || 1);
    }
  }, [getRes]);

  const onSubmit = () => {
    if (!categoryId) {
      toast.error("Please select a category to delete");
      return;
    }

    fetchData(
      `/restaurant/delete-category/${categoryId}?restaurantId=${params?.restaurantId}`,
      {
        reportCrash: true,
        screenName: "CATEGORY_DELETE",
      }
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("delete category res", res);
      getDataFun();
      setIsOpenCategoryModel(false);
    }
  }, [res]);

  return (
    <Dialog open={isOpenCategoryModel} onOpenChange={setIsOpenCategoryModel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <div className="w-full py-3">
            <div className="w-full mt-5 space-y-2">
              <div className="flex justify-between items-center gap-5">
                <Label className="text-[#969696]">Select Category</Label>
                <ReactPagination totalPage={totalPage} setPage={setPage} />
              </div>
              <Select
                onValueChange={(value) => setCategoryId(value)}
                value={categoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
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

            <div className="grid grid-cols-2 gap-5 mt-10">
              <Button size="lg" variant="outline" className="w-full">
                Cancel
              </Button>
              <Button
                onClick={onSubmit}
                size="lg"
                variant="destructive"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Delete Category"}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryModal;
