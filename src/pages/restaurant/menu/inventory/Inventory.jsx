import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InventorySection from "./InventorySection";

const Inventory = () => {
  const params = useParams();
  const [menuData, setMenuData] = useState([]);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getData = () => {
    fetchData(`/restaurant/get-restraunt-menu/${params?.restaurantId}`, {
      reportCrash: true,
      screenName: "MENU_GET",
    });
  };

  useEffect(() => {
    getData();
  }, [params?.restaurantId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getdata res", res);
      setMenuData(res?.data?.data);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <InventorySection
          categories={menuData}
          getData={getData}
          isLoading={isLoading}
        />
      </div>
    </AdminWrapper>
  );
};

export default Inventory;
