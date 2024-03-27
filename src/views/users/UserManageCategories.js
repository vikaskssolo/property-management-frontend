import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
import { getServices } from "../../apiServices/apiServices";
import toast from "react-hot-toast";
import { IoIosArrowDropright } from "react-icons/io";

function UserManageCategories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const fetchCategoriesList = async () => {
    try {
      const res = await getServices(`/api/category/manage/list`);
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
          <p className="text-4xl font-semibold">Categories</p>
          {data.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 my-4 ">
              {data.map((category, i) => (
                <div
                  key={i}
                  className="bg-blue-gray-50 p-3 rounded-md hover:drop-shadow-xl transition-all duration-300 flex justify-between items-center"
                >
                  <Link
                    to={"/user/categories/manage_sub_categories"}
                    state={{ category_id: category._id }}
                  >
                    {category.name}
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      to={"/user/categories/manage_sub_categories"}
                      state={{ category_id: category._id }}
                    >
                      <IoIosArrowDropright
                        className="cursor-pointer text-2xl"
                        title="Go to sub-categories"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold">
              <p>No Categories found...</p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserManageCategories;
