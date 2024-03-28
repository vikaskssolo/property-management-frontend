import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { getServices } from "../../apiServices/apiServices";
import toast from "react-hot-toast";
import { Avatar } from "@material-tailwind/react";
import { Carousel } from "@mantine/carousel";

function UserDashboard() {
  const [recommendedData, setRecommendedData] = useState([]);
  const [latestUpcomingData, setLatestUpcomingData] = useState([]);
  const [latestReadyData, setLatestReadyData] = useState([]);

  useEffect(() => {
    fetchRecommendedPropertiesList();
    fetchLatestUpcomingPropertiesList();
    fetchLatestReadyPropertiesList();
  }, []);

  const fetchRecommendedPropertiesList = async () => {
    try {
      const res = await getServices(`/api/properties/user/list?properties=3`);
      if (res.responseCode === 200) {
        setRecommendedData(res.responseData);
      } else {
        setRecommendedData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchLatestUpcomingPropertiesList = async () => {
    try {
      const res = await getServices(`/api/properties/user/list?properties=2`);
      if (res.responseCode === 200) {
        setLatestUpcomingData(res.responseData);
      } else {
        setLatestUpcomingData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchLatestReadyPropertiesList = async () => {
    try {
      const res = await getServices(`/api/properties/user/list?properties=1`);
      if (res.responseCode === 200) {
        setLatestReadyData(res.responseData);
      } else {
        setLatestReadyData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // const handlePropertySearch = async (e) => {
  //   // try {
  //   //   const res = await getServices(
  //   //     `/api/properties/seach/filter?property_name=${e.target.value}&city=&locality=`
  //   //   );
  //   //   if (res.responseCode === 200) {
  //   //     setData(res.responseData);
  //   //   } else {
  //   //     setData([]);
  //   //   }
  //   // } catch (error) {
  //   //   toast.error(error);
  //   // }
  // };

  return (
    <div>
      <UserNavbar>
        <div className="w-full pl-3 pr-3 mb-10 mt-3">
          <div className="flex items-center justify-between">
            <p className="text-lg sm:text-4xl font-semibold">
              Recommended{" "}
              {recommendedData.length > 1 ? "Properties" : "Property"}
            </p>
            {/* <div className="w-fit max-w-56">
              <Input
                label="Enter the Property name"
                onChange={handlePropertySearch}
                icon={
                  <IoSearch className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                }
              />
            </div> */}
          </div>
          {recommendedData.length > 0 ? (
            // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
            <Carousel
              className="mt-3"
              slideSize="33.33%"
              // height={200}
              // slideGap={"md"}
              dragFree
              withControls={false}
              align="start"
              loop={true}
              breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "50%" },
              ]}
            >
              {recommendedData.map((property, i) => (
                <Carousel.Slide
                  key={i}
                  className="mx-2 bg-[#FFFAEF] flex flex-col justify-center rounded relative"
                >
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
                </Carousel.Slide>
              ))}
              {/* </div> */}
            </Carousel>
          ) : (
            <div className="text-center font-bold">
              <p>No Property found...</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <p className="text-lg sm:text-4xl font-semibold">
              Latest Upcoming{" "}
              {latestUpcomingData.length > 1 ? "Properties" : "Property"}
            </p>
          </div>
          {latestUpcomingData.length > 0 ? (
            // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
            <Carousel
              className="mt-3"
              slideSize="33.33%"
              // height={200}
              // slideGap={"md"}
              dragFree
              withControls={false}
              align="start"
              loop={true}
              breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "50%" },
              ]}
            >
              {latestUpcomingData.map((property, i) => (
                <Carousel.Slide
                  key={i}
                  className="mx-2 bg-[#FFFAEF] flex flex-col justify-center rounded relative"
                >
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
                </Carousel.Slide>
              ))}
              {/* </div> */}
            </Carousel>
          ) : (
            <div className="text-center font-bold">
              <p>No Property found...</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <p className="text-lg sm:text-4xl font-semibold">
              Latest Ready to Buy{" "}
              {latestReadyData.length > 1 ? "Properties" : "Property"}
            </p>
          </div>
          {latestReadyData.length > 0 ? (
            // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
            <Carousel
              className="mt-3"
              slideSize="33.33%"
              // height={200}
              // slideGap={"md"}
              dragFree
              withControls={false}
              align="start"
              loop={true}
              breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "50%" },
              ]}
            >
              {latestReadyData.map((property, i) => (
                <Carousel.Slide
                  key={i}
                  className="mx-2 bg-[#FFFAEF] flex flex-col justify-center rounded relative"
                >
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
                </Carousel.Slide>
              ))}
              {/* </div> */}
            </Carousel>
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

export default UserDashboard;
