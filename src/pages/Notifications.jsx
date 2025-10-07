import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import NotificationCard from "@/components/notifications/NotificationCard";
import NotificationTable from "@/components/notifications/NotificationTable";
import SendNotificationModal from "@/components/notifications/SendNotificationModal";
import ReactPagination from "@/components/pagination/ReactPagination";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import SendBehaviouralNotificationModal from "@/components/notifications/SendBehaviouralNotificationModal";

const Notifications = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [
    isSendBehaviouralNotificationModalOpen,
    setIsSendBehaviouralNotificationModalOpen,
  ] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("system");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getNotifications = () => {
    fetchData(
      `/notification/get?page=${page}&type=${type === "all" ? "" : type}`
    );
  };

  useEffect(() => {
    getNotifications();
  }, [page, type]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      setNotifications(res?.data?.notifications);
      setTotalPage(res?.data?.pagination?.totalPages);
      console.log("getNotifications res", res);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Notifications
          </h2>
          <div className="flex gap-5 items-center">
            {/* {type === "system" && ( */}
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="w-auto px-4"
              variant="capsico"
            >
              <span className="text-xl">+</span> Send{" "}
              <span className="capitalize">System</span> Notification
            </Button>
            {/* )} */}
            {/* {type === "promotional" && ( */}
            <Button asChild className="w-auto px-4" variant="capsico">
              <Link to="/admin/notifications/promotional">
                <span className="text-xl">+</span> Send{" "}
                <span className="capitalize">Promotional</span> Notification
              </Link>
            </Button>
            <Button
              onClick={() => setIsSendBehaviouralNotificationModalOpen(true)}
              className="w-auto px-4"
              variant="capsico"
            >
              <span className="text-xl">+</span> Send{" "}
              <span className="capitalize">Behavioural</span> Notification
            </Button>
            {/* )} */}

            <Select onValueChange={(value) => setType(value)} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="Select Notification Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="behavioural">Behavioural</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="Unable to Locate">
                    Unable to Locate
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              key={notification._id}
            />
          ))}
        </div> */}

        <NotificationTable notifications={notifications} />

        <ReactPagination totalPage={totalPage} setPage={setPage} />

        {isAddModalOpen && (
          <SendNotificationModal
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            getNotifications={getNotifications}
          />
        )}
        {isSendBehaviouralNotificationModalOpen && (
          <SendBehaviouralNotificationModal
            isAddModalOpen={isSendBehaviouralNotificationModalOpen}
            setIsAddModalOpen={setIsSendBehaviouralNotificationModalOpen}
            getNotifications={getNotifications}
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default Notifications;
