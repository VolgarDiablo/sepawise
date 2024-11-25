import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../../ErrorBoundary";
import Main from "../../pages/Main/Main";
// import Changer from "../../pages/Changer/Changer";
// import Contacts from "../../pages/Contacts/Contacts";
// import Support from "../../pages/Support/Support";
import NotFound from "../../pages/NotFound/NotFound";

const Content = () => {
  return (
    <div>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/changer" element={<Changer />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/support" element={<Support />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default Content;
