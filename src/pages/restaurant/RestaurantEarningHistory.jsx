import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import DatePicker from "@/components/DatePicker";
import ReactPagination from "@/components/pagination/ReactPagination";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { EarningRow } from "./EarningRow";

const RestaurantEarningHistory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    ownerType: "MERCHANT",
    type: "CREDIT",
    referenceType: "",
    ownerId: params.restaurantId,
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [meta, setMeta] = useState(null);
  const { res, fetchData, isLoading } = useGetApiReq();

  const fetchLedger = async () => {
    fetchData("/payout/earning-ledger", {
      params: {
        ...filters,
        page,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    });
  };

  useEffect(() => {
    fetchLedger();
  }, [page, filters]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("fetchLedger res", res);
      setData(res?.data?.data);
      setPageCount(res?.data?.meta?.totalPages);
      setMeta(res?.data?.meta);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          <ArrowLeftIcon className="text-2xl" />
          <h1 className="text-2xl font-semibold text-left">Earnings History</h1>
        </button>

        <Card className="w-full mt-5">
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="flex justify-end gap-3 mt-5">
              {/* <Select
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, referenceType: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Reference Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORDER">Order</SelectItem>
                  <SelectItem value="PAYOUT">Payout</SelectItem>
                </SelectContent>
              </Select> */}

              <div>
                <Label>StartDate</Label>

                <DatePicker
                  value={filters.startDate}
                  onChange={(value) => {
                    console.log("value", value);

                    setFilters((f) => ({ ...f, startDate: value }));
                  }}
                />
              </div>

              <div>
                <Label>EndDate</Label>

                <DatePicker
                  value={filters.endDate}
                  onChange={(value) =>
                    setFilters((f) => ({ ...f, endDate: value }))
                  }
                />
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Owner Type</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission Amount</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Remark</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <EarningRow.Skeleton />
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>No records found</TableCell>
                  </TableRow>
                ) : (
                  data.map((row) => <EarningRow key={row._id} row={row} />)
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <ReactPagination setPage={setPage} totalPage={pageCount} />

            {/* {meta && (
              <div className="flex justify-between items-center pt-4">
                <span>
                  Page {meta.page} of {meta.totalPages}
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    disabled={page >= meta.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>
    </AdminWrapper>
  );
};

export default RestaurantEarningHistory;
