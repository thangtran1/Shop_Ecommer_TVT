import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "ultils/icons";
const { IoIosArrowForward } = icons;
const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title },
    { path: "/blogs", breadcrumb: "Blogs" },
    { path: "/blogs/:id", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center gap-4">
      {breadcrumbs
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className={`flex items-center hover:text-main transition duration-300 ${
              index === self.length - 1
                ? "text-main font-normal"
                : "hover:underline"
            }`}
            key={match.pathname}
            to={match.pathname}
          >
            <span className="capitalize">{breadcrumb}</span>
            {index !== self.length - 1 && (
              <IoIosArrowForward className="mx-2 text-gray-400" />
            )}
          </Link>
        ))}
    </div>
  );
};
export default Breadcrumb;
