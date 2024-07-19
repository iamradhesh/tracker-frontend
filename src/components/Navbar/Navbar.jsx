import React from 'react';
import { CiWifiOn } from "react-icons/ci";
import { IoBatteryDeadOutline } from "react-icons/io5";
import { GiNetworkBars } from "react-icons/gi";

const Navbar = ({color}) => {
  return (
    <div className={`text-black z-50 h-[44px] w-full flex absolute bg-transparent justify-between px-7 mt-1`}>
      <div className={`text-${color} h-full font-bold flex items-center`}>
        <p>9:41</p>
      </div>
      <div className={`text-${color} h-full font-bold flex items-center gap-1`}>
        <CiWifiOn size={20} />
        <IoBatteryDeadOutline size={20} />
        <GiNetworkBars size={20} />
      </div>
    </div>
  );
}

export default Navbar;
