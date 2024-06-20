import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/about": "About Us",
  "/profile": "User Profile",
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink to="/" unstable_viewTransition>
            Dashboard
          </NavLink>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = breadcrumbNameMap[to] || value;
          const isActive = index === pathnames.length - 1;
          return (
            <li
              key={to}
              className={
                isActive ? "active breadcrumb-item" : "breadcrumb-item"
              }
            >
              {isActive ? (
                <span>{label}</span>
              ) : (
                <NavLink to={to} unstable_viewTransition>
                  {label}
                </NavLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
