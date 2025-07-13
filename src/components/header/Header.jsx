import usePostApiReq from "@/hooks/usePostApiReq";
import { readCookie } from "@/utils/readCookie";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FiBell, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal";
import Spinner from "../Spinner";
import Cookies from "js-cookie";

const Header = () => {
  const userInfo = readCookie("userInfo");
  console.log("userInfo", userInfo);
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { res, fetchData, isLoading } = usePostApiReq();

  const logout = () => {
    fetchData(`/admin/logout-all`, {
      role: userInfo?.role || "admin",
      phone: userInfo?.phone,
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("logout res", res);
      localStorage.setItem("admin-status", false);
      Cookies.remove("userInfo");
      Cookies.remove("admin-status");
      navigate("/");
      setIsLogoutModalOpen(false);
    }
  }, [res, setIsLogoutModalOpen]);

  return (
    <header className="h-20 bg-white ps-4 pe-10 py-5 flex justify-end items-center">
      {/* <div className='flex items-center gap-6'>
                <img src={logo} className='w-[51px] h-[48px]' alt="de9to" />
                <img src={logo} className='w-[132px] h-[48px]' alt="de9to" />
            </div> */}
      <div className="flex items-center gap-4">
        <FiBell className="text-lg text-[#397FFE]" />
        <FiSettings className="text-lg text-[#397FFE]" />

        {!userInfo?.userImage ? (
          <button
            onClick={() => navigate("/admin/sub-admin/update-admin-profile")}
            className="w-14 cursor-pointer h-14 rounded-full bg-gray-100 flex justify-center items-center"
          >
            <FaUser className="text-3xl text-gray-500" />
          </button>
        ) : (
          <img
            onClick={() => navigate("/admin/sub-admin/update-admin-profile")}
            src={userInfo?.userImage}
            className="object-cover border p-[1px] w-14 h-14 rounded-full cursor-pointer"
            alt="profile-img"
          />
        )}
        {isLoading ? (
          <Spinner size={20} className="w-auto text-gray-500" />
        ) : (
          <LogOutIcon
            className="text-gray-500 cursor-pointer"
            onClick={() => setIsLogoutModalOpen(true)}
          />
        )}
      </div>

      {isLogoutModalOpen && (
        <AlertModal
          isAlertModalOpen={isLogoutModalOpen}
          setIsAlertModalOpen={setIsLogoutModalOpen}
          header="Logout"
          description="Are you sure you want to logout?"
          onConfirm={logout}
          disabled={isLoading}
        />
      )}
    </header>
  );
};

export default Header;
