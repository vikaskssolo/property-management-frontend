import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { getServices } from "../../apiServices/apiServices";
import toast from "react-hot-toast";

function UserManageSubCategories() {
  const [data, setData] = useState([]);
  const location = useLocation().state;

  useEffect(() => {
    fetchSubCategoriesList();
  }, []);

  const fetchSubCategoriesList = async () => {
    try {
      const res = await getServices(
        `/api/subcategory/manage/list?category_id=${location.category_id}`
      );
      if (res.responseCode === 200) {
        setData(res.responseData[0]);
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
          <p className="text-4xl font-semibold">Sub-Categories</p>
          {data.subCategories?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 my-4">
              {data.subCategories?.map((sub_category, i) => (
                <div
                  key={i}
                  className="bg-blue-gray-50 p-3 rounded-md hover:drop-shadow-xl transition-all duration-300 flex justify-between items-center"
                >
                  <Link
                    to={"/user/categories/sub_categories/list_properties"}
                    state={{
                      category_id: location.category_id,
                      subcategory_id: sub_category._id,
                    }}
                  >
                    {sub_category.name}
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      to={"/user/categories/sub_categories/list_properties"}
                      state={{
                        category_id: location.category_id,
                        subcategory_id: sub_category._id,
                      }}
                    >
                      <IoIosArrowDropright
                        className="cursor-pointer text-2xl"
                        title="Go to properties"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold">
              <p>No Sub-Categories found...</p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserManageSubCategories;
