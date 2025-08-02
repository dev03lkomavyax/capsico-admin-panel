import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DeliveryChargeComp from "@/components/delivery-charges/DeliveryChargeComp";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

const DeliveryCharges = () => {
  return (
    <AdminWrapper>
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Delivery Charges Citywise
          </h2>
          <Button
            //   onClick={onEdit}
            variant="capsico"
            size="lg"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="bg-white rounded-lg mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
                </TableHead>
                <TableHead className="text-[#ABABAB] text-xs font-normal font-roboto">
                  City
                </TableHead>
                <TableHead className="text-[#ABABAB] text-xs font-normal font-roboto">
                  Base ₹
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Per Km ₹
                </TableHead>
                <TableHead className=" text-[#ABABAB] text-xs font-normal font-roboto">
                  Night ₹
                </TableHead>
                <TableHead className=" text-[#ABABAB] text-xs font-normal font-roboto">
                  Rain ₹
                </TableHead>
                <TableHead className=" text-[#ABABAB] text-xs font-normal font-roboto">
                  Surge On?
                </TableHead>
                <TableHead className=" text-[#ABABAB] text-xs font-normal font-roboto">
                  Last Updated
                </TableHead>
                <TableHead className=" text-[#ABABAB] text-xs font-normal font-roboto">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <DeliveryChargeComp />
            </TableBody>
          </Table>
        </div>

        {/* <ReactPagination totalPage={totalPage} setPage={setPage} /> */}
      </section>
    </AdminWrapper>
  );
};

export default DeliveryCharges;
