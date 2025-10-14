import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import CreateSpotlightModal from "@/components/spotlight/CreateSpotlightModal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Spotlight = () => {
  const navigate = useNavigate();
  const [isCreateSpotlightModalOpen, setIsCreateSpotlightModalOpen] =
    useState(false);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center gap-5">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Spotlight
          </h2>
          <div className="flex gap-3 items-center">
            <Button
              onClick={() => setIsCreateSpotlightModalOpen(true)}
              className="px-4"
              variant="capsico"
            >
              <PlusIcon />
              Add Spotlight
            </Button>
          </div>
        </div>
        {isCreateSpotlightModalOpen && (
          <CreateSpotlightModal
            open={isCreateSpotlightModalOpen}
            setOpen={setIsCreateSpotlightModalOpen}
            getSpotlights={() => {}}
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default Spotlight;
