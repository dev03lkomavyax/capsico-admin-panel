import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EditProfile1 from "./EditProfile1";
import EditProfile2 from "./EditProfile2";
import EditProfile3 from "./EditProfile3";
import EditProfile4 from "./EditProfile4";
import EditProfile5 from "./EditProfile5";
import EditProfile6 from "./EditProfile6";

const RestaurantEditProfile = () => {
  const { res, fetchData, isLoading } = useGetApiReq();

  const [restaurant, setRestaurant] = useState("");
  const [page, setPage] = useState(1);
  const { state } = useLocation();

  const getRestaurant = useCallback(() => {
    fetchData(`/admin/get-restaurant/${state?.restaurantId}`);
  }, [state?.restaurantId]);

  useEffect(() => {
    state?.restaurantId && getRestaurant();
  }, [state?.restaurantId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("restaurant details res", res);
      setRestaurant(res?.data?.data);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <section className="py-0 px-0">
        <div className="mb-10">
          {page === 1 && (
            <EditProfile1
              setRestaurant={setRestaurant}
              restaurant={restaurant}
              setPage={setPage}
              getRestaurant={getRestaurant}
            />
          )}
          {page === 2 && (
            <EditProfile2
              restaurant={restaurant}
              setPage={setPage}
              getRestaurant={getRestaurant}
            />
          )}
          {page === 3 && (
            <EditProfile3 restaurant={restaurant} setPage={setPage} />
          )}
          {page === 4 && (
            <EditProfile4 restaurant={restaurant} setPage={setPage} />
          )}
          {page === 5 && (
            <EditProfile5 restaurant={restaurant} setPage={setPage} />
          )}
          {page === 6 && <EditProfile6 restaurant={restaurant} />}
        </div>
      </section>
    </AdminWrapper>
  );
};

export default RestaurantEditProfile;
