import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import DeliveryChargeComp from "@/components/delivery-charges/DeliveryChargeComp";
import ReactPagination from "@/components/pagination/ReactPagination";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryCharges = () => {
  const navigate = useNavigate();
  const { res, fetchData, isLoading } = useGetApiReq();
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const handleAdd = () => {
    navigate("/admin/delivery-charges/add");
  };

  const getDeliveryCharges = () => {
    fetchData(`/delivery-charges/get?page=${page}&limit=${LIMIT}`);
  };

  useEffect(() => {
    getDeliveryCharges();
  }, [page]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getDeliveryCharges res", res);
      setDeliveryCharges(res?.data?.deliveryCharges);
      setTotalPage(res?.data?.pagination?.totalPages);
      setPage(res?.data?.pagination?.page);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Delivery Charges Citywise
          </h2>
          <Button onClick={handleAdd} variant="capsico" size="lg">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="bg-white rounded-lg mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-10">
                  <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
                </TableHead> */}
                <TableHead className="text-[#ABABAB] whitespace-nowrap text-xs font-normal font-roboto">
                  City
                </TableHead>
                <TableHead className="text-[#ABABAB] whitespace-nowrap text-xs font-normal font-roboto">
                  Pincodes
                </TableHead>
                <TableHead className="text-[#ABABAB] whitespace-nowrap text-xs font-normal font-roboto">
                  Base ₹
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Per Km ₹
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Day ₹
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Night ₹
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Rain ₹
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Extreme Weather ₹
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Surge On?
                </TableHead>
                <TableHead className="w-24 whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Status
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryCharges.map((deliveryCharge) => (
                <DeliveryChargeComp
                  key={deliveryCharge._id}
                  deliveryCharge={deliveryCharge}
                  getDeliveryCharges={getDeliveryCharges}
                />
              ))}
            </TableBody>
          </Table>

          {isLoading && <Spinner />}
          {deliveryCharges.length === 0 && !isLoading && (
            <DataNotFound name="Delivery Charges" />
          )}
        </div>

        <ReactPagination totalPage={totalPage} setPage={setPage} />
      </section>
    </AdminWrapper>
  );
};

export default DeliveryCharges;
