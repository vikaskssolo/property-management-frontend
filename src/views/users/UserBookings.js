import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";
import { Avatar } from "@material-tailwind/react";

function UserBookings() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_user_access_token");

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

  return (
    <div>
      <UserNavbar>
        {access_token ? (
          <div className="w-full pl-3 pr-3 mb-10 mt-3">
            {data.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.map((property, i) => (
                  <div className="bg-gray-100 p-3 rounded-lg" key={i}>
                    <div className="flex justify-between mb-2">
                      <Avatar src={property.propertyInfo.images[0]} alt="" />
                      <p
                        className={`bg-red-300 text-white px-3 py-1 rounded-full h-fit ${
                          property.isaccepted === 0
                            ? "bg-red-300"
                            : "bg-green-300"
                        }`}
                      >
                        {property.isaccepted === 0
                          ? "Pending"
                          : property.isaccepted === 1
                          ? "Accepted"
                          : ""}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-xl">
                          {property.propertyInfo.property_name}
                        </p>
                      </div>
                      <p>Booked on: {property.booked_on}</p>
                    </div>
                    {property.propertyInfo && (
                      <p>
                        City: <span>{property.propertyInfo.city}</span>
                      </p>
                    )}
                    {property.propertyInfo && (
                      <p>
                        Locality: <span>{property.propertyInfo.locality}</span>
                      </p>
                    )}
                    <div className="flex justify-end items-center hover:underline">
                      <Link
                        to={"/user/property/details"}
                        className="flex items-center gap-2"
                        state={{
                          property_id: property.propertyInfo.property_id,
                        }}
                      >
                        Read more <IoIosArrowDropright title="Go to Details" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center font-bold">
                <p>No Bookings found...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[65vh] flex-col">
            <p className="font-semibold mb-4">Please login to continue.</p>
            <Link to="/login">
              <button className="bg-blue-gray-900 font-semibold text-white py-2 px-10 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">
                Login
              </button>
            </Link>
          </div>
        )}
      </UserNavbar>
    </div>
  );
}

export default UserBookings;
