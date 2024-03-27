import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminNavbar";
import TableList from "../../components/tables/admin/VendorsRequestList";
import { CardHeader, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";

const TABLE_HEAD = ["Vendor", "Phone", "Actions"];

function ManageVendor() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_admin_access_token");

  useEffect(() => {
    fetchVendorRequestList();
  }, []);

  const fetchVendorRequestList = async () => {
    try {
      const res = await getServices(
        `/api/admin/vendor/list?status=1`,
        access_token
      );
      if (res.responseCode === 200) {
        setData(res.responseData);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <AdminSidebar>
        <div className="w-full pl-3 pr-10 mb-10 mt-3">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Vendors Requests
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all vendor requests
                </Typography>
              </div>
              {/* <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div> */}
            </div>
          </CardHeader>
          {data.length > 0 ? (
            <TableList
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={data}
              fetchVendorRequestList={fetchVendorRequestList}
            />
          ) : (
            <div className="text-center font-bold">
              <p>No Requests found...</p>
            </div>
          )}
        </div>
      </AdminSidebar>
    </div>
  );
}

export default ManageVendor;
