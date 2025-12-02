import AlertModal from "@/components/AlertModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { EditIcon, ImageOffIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AddCuisineModal from "./AddCuisineModal";

const Cuisine = ({ item, getCuisines }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteCuisine = () => {
    fetchData(`/admin/cuisine/delete/${item.value}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      setIsAlertModalOpen(false);
      getCuisines();
    }
  }, [res]);

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between gap-3">
            <h3 className="text-xl font-medium">{item.label}</h3>
            <div className="flex gap-1 items-center relative -top-3 -right-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                className="size-8"
              >
                <EditIcon className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsAlertModalOpen(true)}
                className="size-8"
              >
                <TrashIcon className="text-destructive size-4 cursor-pointer" />
              </Button>
            </div>
          </div>
          <p className="text-base font-medium text-muted-foreground">
            {item.customCuisineId}
          </p>
          <p className="text-base capitalize font-medium text-muted-foreground">
            Priority Type: {item.priorityType}
          </p>
          {item.priorityType === "global" && (
            <p className="text-base capitalize font-medium text-muted-foreground">
              Priority: {item.globalPriority}
            </p>
          )}
          {item.priorityType === "citywise" && (
            <div className="flex flex-col gap-1 mb-5">
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <p className="text-base capitalize font-medium text-muted-foreground">
                  City
                </p>
                <p className="text-base capitalize font-medium text-muted-foreground">
                  Priority
                </p>
              </div>
              <div className="flex flex-col gap-1 max-h-[110px] overflow-y-auto">
                {item?.cityPriority?.map((city, index) => (
                  <div key={index} className="grid grid-cols-[1fr_auto] gap-3">
                    <p className="text-base capitalize font-medium text-muted-foreground">
                      {city?.cityId?.city}
                    </p>
                    <p className="text-base capitalize font-medium text-muted-foreground">
                      {city?.priority}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-muted-foreground">{item.description}</p>
          {item.image ? (
            <img
              className="aspect-square object-cover mt-5 rounded-md"
              src={item.image}
              alt={item.label}
            />
          ) : (
            <div className="flex justify-center items-center aspect-square rounded-md bg-muted-foreground/10 mt-5">
              <ImageOffIcon />
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <AddCuisineModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          getCuisines={getCuisines}
          cuisine={item}
        />
      )}

      {isAlertModalOpen && (
        <AlertModal
          header="Remove Cuisine"
          description="Are you sure you want to remove cuisine?"
          disabled={isLoading}
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          onConfirm={deleteCuisine}
        />
      )}
    </>
  );
};

export default Cuisine;
