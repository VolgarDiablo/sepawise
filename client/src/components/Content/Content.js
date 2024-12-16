import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../../pages/Main/Main";
import Rules from "../../pages/Rules/Rules";
import Terms from "../../pages/Rules/Components/Terms/Terms";
import Cookie from "../../pages/Rules/Components/Cookie/Cookie";
import Policy from "../../pages/Rules/Components/Policy/Policy";
import Aml from "../../pages/Rules/Components/Aml/Aml";
import NotFound from "../../pages/NotFound/NotFound";

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="rules" element={<Rules />}>
        <Route path="terms" element={<Terms />} />
        <Route path="cookie" element={<Cookie />} />
        <Route path="policy" element={<Policy />} />
        <Route path="aml" element={<Aml />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Content;
