import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddCuisineModal from "./AddCuisineModal";
import Cuisine from "./Cuisine";
import DataNotFound from "@/components/DataNotFound";

const Cuisines = () => {
  const { res, fetchData, isLoading } = useGetApiReq();
  const [cuisines, setCuisines] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const getCuisines = () => {
    fetchData("/admin/get-cuisines");
  };

  useEffect(() => {
    getCuisines();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get res", res);

      const modifiedCuisines = res?.data?.data?.cuisines?.map((cuisine) => ({
        label: cuisine?.name,
        image: cuisine?.image,
        value: cuisine?._id,
        description: cuisine?.description,
        customCuisineId: cuisine?.customCuisineId || cuisine?._id,
        priorityType: cuisine?.priorityType,
        globalPriority: cuisine?.globalPriority,
        cityPriority: cuisine?.cityPriority,
      }));
      setCuisines(modifiedCuisines);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center gap-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex justify-start items-center"
          >
            <MdKeyboardArrowLeft className="text-[#000000] text-2xl" />
            <h2 className="text-[#000000] text-xl font-medium font-roboto">
              Cuisines (Food Type)
            </h2>
          </button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="w-auto px-4"
            variant="capsico"
          >
            Add Cuisine
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-5 mt-5">
          {cuisines.map((item) => (
            <Cuisine key={item.value} item={item} getCuisines={getCuisines} />
          ))}
        </div>
        {isLoading && (
          <div className="mt-5 w-full">
            <Spinner />
          </div>
        )}

        {!isLoading && cuisines.length === 0 && (
          <DataNotFound name="Cuisines" />
        )}

        {isAddModalOpen && (
          <AddCuisineModal
            open={isAddModalOpen}
            setOpen={setIsAddModalOpen}
            getCuisines={getCuisines}
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default Cuisines;
