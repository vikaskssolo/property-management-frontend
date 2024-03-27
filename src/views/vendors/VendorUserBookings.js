import React, { useEffect, useState } from "react";
import VendorNavbar from "../../components/VendorNavbar";
import toast from "react-hot-toast";
import { getServices, putServices } from "../../apiServices/apiServices";
import BookingsList from "../../components/tables/vendor/BookingsList";

const TABLE_HEAD = [
  "Property",
  "Price",
  "Property Status",
  "Vendor",
  "Booked on",
  "Status",
  "Actions",
];

function VendorUserBookings() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_vendor_access_token");

  useEffect(() => {
    fetchBookingsList();
  }, []);

  const fetchBookingsList = async () => {
    try {
      const res = await getServices(
        `/api/property/bookings/list`,
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

  const handleAcceptBooking = async (id) => {
    if (window.confirm("Do you want to accept this booking?")) {
      try {
        const res = await putServices(
          `/api/property/bookings/accept/${id}`,
          null,
          access_token
        );
        if (res.responseCode === 200) {
          toast.success("Booking accepted");
          fetchBookingsList();
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div>
      <VendorNavbar>
        <div className="w-full pl-3 pr-3 mb-10 mt-3">
          <p className="text-4xl font-semibold mb-3">Bookings</p>
          {data.length > 0 ? (
            <BookingsList
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={data}
              // fetchVendorRequestList={fetchVendorRequestList}
              handleAcceptBooking={handleAcceptBooking}
            />
          ) : (
            <div className="text-center font-bold">
              <p>No Bookings found...</p>
            </div>
          )}
        </div>
      </VendorNavbar>
    </div>
  );
}

export default VendorUserBookings;
