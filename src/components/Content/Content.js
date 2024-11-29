import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../../ErrorBoundary";
import Main from "../../pages/Main/Main";
import NotFound from "../../pages/NotFound/NotFound";

const Content = () => {
  return (
    <div>
      {/* <ErrorBoundary> */}
      <Routes>
        <Route path="*" element={<Main />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default Content;
