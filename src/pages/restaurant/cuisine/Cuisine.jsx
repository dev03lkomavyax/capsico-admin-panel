import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import AddCuisineModal from "./AddCuisineModal";
import { EditIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/AlertModal";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";

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
          <p className="text-sm text-muted-foreground">
            {item.customCuisineId}
          </p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
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
