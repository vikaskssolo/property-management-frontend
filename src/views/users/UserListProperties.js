import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { Avatar, Input } from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";

function UserListProperties() {
  const [data, setData] = useState([]);
  const location = useLocation().state;

  useEffect(() => {
    fetchPropertiesList();
  }, []);

  const fetchPropertiesList = async () => {
    try {
      const res = await getServices(
        `/api/properties/list/bycat?prop_status=&cattegory_id=${location.category_id}&subcat_id=${location.subcategory_id}`
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

  const handlePropertySearch = async (e) => {
    try {
      const res = await getServices(
        `/api/properties/seach/filter?property_name=${e.target.value}&city=&locality=`
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
          <div className="flex justify-between items-center">
            <p className="text-4xl font-semibold">Property list by Category</p>
            <div className="w-fit max-w-56">
              <Input
                label="Enter the Property name"
                onChange={handlePropertySearch}
                icon={
                  <IoSearch className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                }
              />
            </div>
          </div>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
              {data.map((property, i) => (
                <div
                  key={i}
                  className="bg-blue-gray-50 p-3 rounded-md hover:drop-shadow-xl transition-all duration-300 flex justify-between flex-col gap-2"
                >
                  <div className="flex items-center justify-between w-full">
                    <Avatar src={property.images[0]} alt="" />
                    <p className="text-red-500 bg-red-100 px-2 rounded">
                      {property.prop_status === 1
                        ? "Ready To Buy"
                        : property.prop_status === 2
                        ? "Upcoming"
                        : property.prop_status === 3
                        ? "Sold"
                        : property.prop_status === 4
                        ? "Rented"
                        : ""}
                    </p>
                  </div>
                  <p className="font-semibold text-xl">
                    {property.property_name}
                  </p>
                  {property.age && <p>Age: {property.age}</p>}
                  {property.city && <p>City: {property.city}</p>}
                  {property.locality && <p>Locality: {property.locality}</p>}
                  <div className="flex justify-end items-center hover:underline">
                    <Link
                      to={"/user/property/details"}
                      className="flex items-center gap-2"
                      state={{ property_id: property._id }}
                    >
                      Read more <IoIosArrowDropright title="Go to Details" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold">
              <p>No Property found...</p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserListProperties;
