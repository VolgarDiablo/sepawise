import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Terms from "./Components/Terms/Terms";
import Cookie from "./Components/Cookie/Cookie";
import Policy from "./Components/Policy/Policy";
import Aml from "./Components/Aml/Aml";
import NotFound from "../../pages/NotFound/NotFound";
import SetTitle from "../../utils/SetTitle";

const Rules = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-8 pt-6 pb-8 max-w-[1200px] w-full text-custom-main-text">
        <h2 className="font-medium text-[20px] leading-[1.3] ">
          Terms of Exchange
        </h2>
        <div className="grid gap-8 md:grid-flow-col">
          {/* Боковая панель */}
          <nav>
            <ul className="flex flex-col gap-6 max-w-[345px] items-start">
              <li>
                <NavLink
                  to="/rules/terms"
                  className={({ isActive }) =>
                    isActive ? "text-custom-active-text-navigation-rules" : ""
                  }
                >
                  Terms and Conditions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rules/cookie"
                  className={({ isActive }) =>
                    isActive ? "text-custom-active-text-navigation-rules" : ""
                  }
                >
                  Cookie Use Agreement
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rules/policy"
                  className={({ isActive }) =>
                    isActive ? "text-custom-active-text-navigation-rules" : ""
                  }
                >
                  Personal Data Processing Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rules/aml"
                  className={({ isActive }) =>
                    isActive ? "text-custom-active-text-navigation-rules" : ""
                  }
                >
                  AML/KYC
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Основной контент */}
          <div className="bg-custom-bg-card text-custom-main-text p-8 rounded-[12px] shadow-md">
            <Routes>
              <Route
                path="terms"
                element={
                  <>
                    <SetTitle title="Sepa Wise | Terms and Conditions" />
                    <Terms />
                  </>
                }
              />
              <Route
                path="cookie"
                element={
                  <>
                    <SetTitle title="Sepa Wise | Cookie Use Agreement" />
                    <Cookie />
                  </>
                }
              />
              <Route
                path="policy"
                element={
                  <>
                    <SetTitle title="Sepa Wise | Personal Data Processing Policy" />
                    <Policy />
                  </>
                }
              />
              <Route
                path="aml"
                element={
                  <>
                    <SetTitle title="Sepa Wise | AML/KYC Procedure" />
                    <Aml />
                  </>
                }
              />
              <Route index element={<Navigate to="/rules/terms" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
