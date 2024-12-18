import { useEffect } from "react";

const SetTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default SetTitle;
