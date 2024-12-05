import React from "react";

const CopiedNotification = ({ isVisible }) => {
  return (
    <div
      className={`fixed bottom-[14px] left-4 p-[24px] bg-[#4E83B9] text-white rounded-lg shadow-md transition-transform duration-500 w-[92%] w-[calc(100% - 32px);] sm:min-w-[228px] sm:w-auto ${
        isVisible ? "translate-x-0" : "-translate-x-[calc(110%)]"
      }`}
    >
      Copied
    </div>
  );
};

export default CopiedNotification;
