import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { FaArrowRight } from "react-icons/fa";

// Breadcrumb Component
export default function DynamicBreadcrumb() {
  const [pathSegments, setPathSegments] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const segments = pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => ({
        name: decodeURIComponent(segment[0].toUpperCase() + segment.slice(1)),
        href: "/" + array.slice(0, index + 1).join("/"),
      }));
    setPathSegments(segments);
  }, [pathname]);

  return (
    <Breadcrumb className="flex items-center   space-x-2 ">
      <BreadcrumbList>
        <BreadcrumbItem className="text-lg;">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => (
          <BreadcrumbItem
            key={segment.href}
            className="flex items-center truncate capitalize justify-center text-md"
          >
            <BreadcrumbSeparator />
            {index === pathSegments.length - 1 ? (
              <span className="text-gray-500  truncate line-clamp-1">
                {segment.name}
              </span>
            ) : (
              <Link to={segment.href} className="">
                {segment.name}
              </Link>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
