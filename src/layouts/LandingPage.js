import React from "react";
import Logo from "../assets/logo.svg";
import UserHero from "../assets/user-hero.jpg";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="h-24 bg-blue-gray-100 flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" />
          <p className="text-xl font-semibold text-[#1C274C]">
            Property management system
          </p>
        </div>
        <div>
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        </div>
      </div>

      <div className="md:grid grid-cols-2 justify-center items-center gap-5">
        <img src={UserHero} alt="" className="w-full" />
        <div className="flex flex-col justify-end gap-4 items-center md:items-end px-4">
          <p className="text-[#59617d] capitalize font-semibold border border-[#1C274C] px-4 rounded-full">
            For User
          </p>
          <p className="md:text-3xl lg:text-5xl xl:text-7xl font-bold text-center md:text-right text-[#1C274C] capitalize">
            Welcome to Property management system! Your journey begins here
          </p>
          <Link to={"/user_registration"}>
            <Button>Know more</Button>
          </Link>
        </div>
      </div>

      <div className="text-center text-[#59617d] capitalize font-semibold flex flex-col gap-3 items-center mb-4 mt-4 md:mt-0">
        <p className="border border-[#1C274C] px-4 rounded-full">For Vendor</p>
        <p className="text-2xl font-bold text-center text-[#1C274C] capitalize">
          Welcome aboard, valued vendor! Together, let's shape excellence and
          redefine possibilities.
        </p>
        <Link to={"/vendor_registration"}>
          <Button>Know more</Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
