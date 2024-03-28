import React, { useEffect, useState } from "react";
import VendorNavbar from "../../components/VendorNavbar";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { Avatar, Button } from "@material-tailwind/react";

function VendorProperties() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_vendor_access_token");
  const decoded_token = jwtDecode(access_token);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPropertiesList();
  }, []);

  const fetchPropertiesList = async () => {
    try {
      const res = await getServices(
        `/api/properties/manage/list?prop_status=&vendor_id=${decoded_token.id}`,
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

  const handleCreateProperty = () => {
    navigate("/vendor/manage_property", { state: { add_property: true } });
  };

  return (
    <div>
      <VendorNavbar>
        <div className="w-full pl-3 pr-3 mb-10 mt-3">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-semibold">
              {data.length > 1 ? "Properties" : "Property"}
            </p>
            <Button onClick={handleCreateProperty}>Add Property</Button>
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
                  <Link
                    to={"/vendor/property/details"}
                    className="font-semibold text-xl"
                    state={{ property_id: property._id }}
                  >
                    {property.property_name}
                  </Link>
                  {/* {property.age && <p>Age: {property.age}</p>} */}
                  {property.city && <p>City: {property.city}</p>}
                  {property.locality && <p>Locality: {property.locality}</p>}
                  <div className="flex justify-end items-center hover:underline">
                    <Link
                      to={"/vendor/property/details"}
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
      </VendorNavbar>
    </div>
  );
}

export default VendorProperties;
