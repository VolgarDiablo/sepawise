import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Terms from "./Components/Terms/Terms";
import Cookie from "./Components/Cookie/Cookie";
import Policy from "./Components/Policy/Policy";
import Aml from "./Components/Aml/Aml";
import NotFound from "../../pages/NotFound/NotFound";

const Rules = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-8 pt-6 pb-8 max-w-[1200px] w-full">
        <h2 className="font-medium text-[20px] leading-[1.3] text-[#3e3e3e]">
          Terms of Exchange
        </h2>
        <div className="grid gap-8 md:grid-flow-col">
          {/* Боковая панель */}
          <nav className="">
            <ul className="flex flex-col gap-6 max-w-[345px] items-start">
              <li>
                <NavLink
                  to="terms"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-[#4E83B9] opacity-[0.8]"
                  }
                >
                  Terms and Conditions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="cookie"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-[#4E83B9]"
                  }
                >
                  Cookie Use Agreement
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="policy"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-[#4E83B9]"
                  }
                >
                  Personal Data Processing Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="aml"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-[#4E83B9]"
                  }
                >
                  AML/KYC
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Основной контент */}
          <div className=" bg-white p-8 rounded-[12px] shadow-md">
            <Routes>
              <Route index element={<Navigate to="terms" replace />} />
              <Route path="terms" element={<Terms />} />
              <Route path="cookie" element={<Cookie />} />
              <Route path="policy" element={<Policy />} />
              <Route path="aml" element={<Aml />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
