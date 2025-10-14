import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import ManualWalletAdjustmentDialog from "@/components/customer-wallet/ManualWalletAdjustment";
import TransactionHistory from "@/components/customer-wallet/TransactionHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetApiReq from "@/hooks/useGetApiReq";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const CustomerWalletDetails = () => {
  const { state } = useLocation();
  const user = state?.user || {};
  const navigate = useNavigate();
  const { customerId } = useParams();

  const [walletDetails, setWalletDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getWalletDetails = () => {
    fetchData(`/wallet/balance/${customerId}`);
  };

  useEffect(() => {
    getWalletDetails();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getWalletDetails res", res);
      setWalletDetails(res?.data?.data);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center gap-5">
          <Link
            to={`/admin/customer/${customerId}`}
            className="inline-flex gap-1 items-center"
          >
            <ChevronLeft />
            <h2 className="text-[#111928] text-xl font-semibold font-inter">
              Customer Wallet Details
            </h2>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(
                `/admin/customer/${customerId}/wallet/transaction-history`,
                { state: { user } }
              )
            }
          >
            View All
          </Button>
        </div>

        {/* <div className="w-full">
          <div className="relative mb-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant-light dark:text-on-surface-variant-dark">
              search
            </span>
            <input
              className="w-full rounded-full border-outline-light/50 dark:border-outline-dark/50 bg-surface-light dark:bg-surface-dark h-12 pl-12 pr-4 text-on-surface-light dark:text-on-surface-dark placeholder:text-on-surface-variant-light dark:placeholder:text-on-surface-variant-dark focus:border-primary focus:ring-primary"
              placeholder="Search by User ID / Name / Phone Number"
              type="text"
            />
          </div>
        </div> */}

        <div className="grid grid-cols-1 gap-6 lg:gap-8 mt-5">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Wallet Summary */}
            <Card className="shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Wallet Summary</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHlzzsycYcoW1e5RrTfmBUl7tBwSQHlE2OJMT35i635vTrV9P2TNu7XkALLvdDKpGjtYGB41DFpaH4_hm3YkNlHSIlCxmZ7-rMbJvlXDwq7kcvD188D6y5n_Eev38oqZzQ-W3bKtiXZb04Delph3TuGg2Em1cJxh-ntDSrTEhqKbulvJ8up_bYJ836Yefiaim1N8KFFOUcHtvUjJj1RjDOhU6Xajb-qdPDrSuk3tDAF6RWPhttdnJsvWCUefyLIYqv5-7ls94pIKhM')",
                    }}
                  />
                  <div>
                    <p className="font-bold text-base">{user?.name}</p>
                    <p className="text-sm text-on-surface-variant-light dark:text-on-surface-variant-dark">
                      ID: {user?.id}
                    </p>
                    <p className="text-sm text-on-surface-variant-light dark:text-on-surface-variant-dark">
                      Phone: {user?.phone || "-"}
                    </p>
                    <p className="text-sm text-on-surface-variant-light dark:text-on-surface-variant-dark">
                      Last Updated:{" "}
                      {walletDetails?.lastUpdated
                        ? format(
                            new Date(walletDetails?.lastUpdated),
                            "dd MMM, yyyy"
                          )
                        : "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant-light dark:text-on-surface-variant-dark">
                    Current Balance
                  </p>
                  <p className="text-3xl font-bold text-green-500">
                    ₹ {walletDetails?.balance || "00.00"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {/* <Card className="bg-surface-light dark:bg-surface-dark shadow-sm">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined">search</span>
                  <span>Search User</span>
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-sm font-bold text-on-surface-light dark:text-on-surface-dark hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">edit_note</span>
                  <span>Manual Adjust</span>
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-sm font-bold text-on-surface-light dark:text-on-surface-dark hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">refresh</span>
                  <span>Refresh</span>
                </button>
              </CardContent>
            </Card> */}
          </div>

          {/* Right Column - Transaction History */}
          <div>
            <Card className="bg-white shadow-sm overflow-hidden">
              <CardHeader className="p-6 flex justify-between flex-row">
                <CardTitle>Transaction History</CardTitle>
                <Button
                  className="w-auto px-4"
                  onClick={() => setIsModalOpen(true)}
                  variant="capsico"
                >
                  Manual Wallet Adjustment
                </Button>
              </CardHeader>
              <TransactionHistory
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </Card>
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default CustomerWalletDetails;
