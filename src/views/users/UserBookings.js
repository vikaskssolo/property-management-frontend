import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";

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
        <div className="w-full pl-3 pr-3 mb-10 mt-3">
          {data.length > 0 ? (
            <div className="flex flex-col gap-3">
              {data.map((property, i) => (
                <div className="bg-gray-100 p-3 rounded-lg" key={i}>
                  <div className="flex justify-end mb-2">
                    <p
                      className={`bg-red-300 text-white px-3 py-1 rounded-full ${
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
                      {/* <img src={property.propertyInfo.images[0]} /> */}
                      {/* {property.propertyInfo.images[0] && (
                        <video width="320" height="240" controls>
                          <source
                            src={property.propertyInfo.images[0]}
                            type="video/mp4"
                          />
                          <source
                            src={property.propertyInfo.images[0]}
                            type="video/ogg"
                          />
                        </video>
                      )} */}

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
                      state={{ property_id: property.propertyInfo.property_id }}
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
      </UserNavbar>
    </div>
  );
}

export default UserBookings;
