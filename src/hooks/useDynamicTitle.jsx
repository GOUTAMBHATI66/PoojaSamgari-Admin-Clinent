import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const title =
      path === "/"
        ? "Shree Swastik"
        : `${path
            .replace("/", "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())} - Shree-Swastik`;

    document.title = title;
  }, [location]);
};

export default useDynamicTitle;
