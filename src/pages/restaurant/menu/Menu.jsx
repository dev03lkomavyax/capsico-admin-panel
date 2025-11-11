import useGetApiReq from "@/hooks/useGetApiReq";
import MenuSection from "./MenuCategory";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";

const categories = [
  {
    id: 1,
    name: "Breakfast",
    items: [
      {
        id: 1,
        name: "Test Butter Masala",
        price: 150,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD3w36T0LcbX5DQkrE3_ZQwaI7I3o6IOlJMSEk2Q4KdHf0466icpy5h-ruLXg34nKZtXKOX3wb7ySXVvLAvOYG8fbKHNRn6msGz-xYl8evfhuqZGmf-2jhEpPDchFms6JIJ0_fagdUXHdHnFbQ-JdiFRmeb7qfeiSonNrnkD19Hy4pMwiqXhyIC_wQP8wjMPALaefBgfMUIwWqk__TCX8MQqYbG51coO9SIQjcXkItMdPFqtpucphuXDIa8itjQ1QMabxWqlOV_vMI",
        recommended: false,
        available: true,
      },
      {
        id: 2,
        name: "Test Dish 1",
        price: 120,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD9LV_74s1GbHKF8U5ZaW9j_B_W-u_szxsmcbpdW3PpkTwQMnOEPcRCkmd37-c_F5SS3h7OVSy97OEkNsmS9Dr-zAQKqumZVd3UKTEYYn7bnOAqB8vWA21OU2H7AgzN9zyl5-cHQFX8b_WZrlsjj9G6bwJp8k88DtTDrNVQ42or1GJY4vHYqhiiCEXVUm1jzpVdzJsbAGkYJ_Lgg8_Xmzo5clQCbySmBHY0EuFWs3-IXECos927Pyi0OtxuzoxtDpHznqL3SD5lWPE",
        recommended: true,
        available: true,
      },
      {
        id: 3,
        name: "Idli Sambar",
        price: 80,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAvWcwm41acghISDlou4eJkjIods0q5ccIxmsULrBeBpdIMGKVUMGmVtoWegsSZG3GY0sJKm_RRx9WABEmax6CH8Ae8xG2hergO4ndisLURD_zPBc26ZouDhQerH4q9UBETZzTKOUf97JX6dJVEV-AOE5-jFdsaNFREFKcrSvFGZEiKxqozKmCv2EXn3JYsVi_PRZ425tBHi2qblHZNR44vKyNcmh6zrIYONn_mqk4ewQqrzNIHMnxlF0Sn85vCAdJKfzrSs192MSY",
        recommended: false,
        available: false,
      },
    ],
  },
  {
    id: 2,
    name: "Lunch",
    items: [],
  },
];

const MenuPage = () => {
  const params = useParams();
  const [menuData, setMenuData] = useState([...categories]);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getData = () => {
    fetchData(`/restaurant/get-restraunt-menu/${params?.restaurantId}`);
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
      <div className="">
        <MenuSection categories={menuData} getData={getData} />
      </div>
    </AdminWrapper>
  );
};

export default MenuPage;
