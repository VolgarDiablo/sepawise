import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../../pages/Main/Main";
import Rules from "../../pages/Rules/Rules";
import NotFound from "../../pages/NotFound/NotFound";
import SetTitle from "../../utils/SetTitle";

const Content = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SetTitle title="Sepa Wise" />
            <Main />
          </>
        }
      />
      <Route
        path="rules/*"
        element={
          <>
            <SetTitle title="Sepa Wise | Rules" />
            <Rules />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <SetTitle title="Sepa Wise | Page Not Found" />
            <NotFound />
          </>
        }
      />
    </Routes>
  );
};

export default Content;
