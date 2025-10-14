import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import ReactPagination from "@/components/pagination/ReactPagination";
import CreateSpotlightModal from "@/components/spotlight/CreateSpotlightModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  PlusIcon,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Spotlight = () => {
  const navigate = useNavigate();
  const [isCreateSpotlightModalOpen, setIsCreateSpotlightModalOpen] =
    useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center gap-5">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Spotlight
          </h2>
          <div className="flex gap-3 items-center">
            {/* <Button
              onClick={() => setIsCreateSpotlightModalOpen(true)}
              className="px-4"
              variant="capsico"
            >
              <PlusIcon />
              Add Spotlight
            </Button> */}
            <Button
              className="px-4"
              variant="capsico"
              asChild
            >
              <Link to="/admin/spotlight/create">
              <PlusIcon />
              Add Spotlight
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <Table className="w-full border shadow-sm bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>Spotlight Items</TableHead>
                <TableHead>Cuisines</TableHead>
                <TableHead>Created On</TableHead>
                {/* <TableHead className="text-center">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  restaurant: "La Pino'z Pizza",
                  items: "Veg Margherita, Garlic Bread",
                  cuisines: "Pizza, Snacks",
                  date: "14 Oct 2025",
                },
                {
                  restaurant: "Cafe99",
                  items: "Chicken Burger",
                  cuisines: "Fast Food",
                  date: "12 Oct 2025",
                },
              ].map((row) => (
                <TableRow key={row.restaurant}>
                  <TableCell className="font-medium">
                    {row.restaurant}
                  </TableCell>
                  <TableCell>{row.items}</TableCell>
                  <TableCell>{row.cuisines}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  {/* <TableCell className="text-center">
                            <div className="flex justify-center gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="hover:text-primary"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="hover:text-primary"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ReactPagination totalPage={totalPage} setPage={setPage} />
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
