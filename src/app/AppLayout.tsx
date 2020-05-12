import React from "react";
import classNames from "classnames";
import { LayoutService } from "../components/Layout/LayoutService";
import { observer } from "mobx-react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { LogoThemed } from "./LogoThemed";
import { NavbarCollect } from "./NavbarCollect";
import { NavbarPrint } from "./NavbarPrint";
import { NavbarUser } from "./NavbarUser";

export const SidebarMenuItem = ({ to, title, icon }) => {
  const active = !!useRouteMatch({
    path: to,
  });
  const service = React.useContext(LayoutService);
  return (
    <Link
      className={classNames(
        "flex py-2 mt-2 text-sm font-semibold text-gray-700 rounded-lg",
        {
          "bg-gray-200 dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600": active,
          "dark-mode:hover:bg-gray-600": !active,
          "px-4": !service.sidebarCollapsed,
          "px-3": service.sidebarCollapsed,
        },
        "dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      )}
      to={to}
    >
      <div
        className={classNames({
          "px-2": !service.sidebarCollapsed,
        })}
      >
        {icon}
      </div>
      <div
        className={classNames({
          "lg:hidden": service.sidebarCollapsed,
        })}
      >
        {title}
      </div>
    </Link>
  );
};

const MenuItems = () => {
  return (
    <>
      <SidebarMenuItem
        icon={<i className="fa fa-th"></i>}
        title="Dashboard"
        to="/dashboard"
      />

      <SidebarMenuItem
        icon={<i className="fa fa-cog"></i>}
        title="Configuration"
        to="/configuration"
      />

      <SidebarMenuItem
        icon={<i className="fas fa-cogs"></i>}
        title="Settings"
        to="/settings"
      />

      <SidebarMenuItem
        icon={<i className="fas fa-file"></i>}
        title="Logs"
        to="/logs"
      />
    </>
  );
};

const SideMenu: React.FC = observer(() => {
  const service = React.useContext(LayoutService);
  return (
    <div className="lg:flex flex-none flex-col lg:flex-row lg:min-h-screen no-print">
      <div
        onClick={() => {
          service.sidebarOpened = !service.sidebarOpened;
        }}
        className={classNames(
          "flex flex-col w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0",
          {
            "lg:w-64": !service.sidebarCollapsed,
            "lg:w-16": service.sidebarCollapsed,
          }
        )}
      >
        <div
          className={classNames(
            "flex-shrink-0 py-3 flex flex-row items-center justify-between",
            {
              "px-8": !service.sidebarCollapsed,
              "lg:px-4 px-8": service.sidebarCollapsed,
            }
          )}
        >
          <Link
            className={classNames(
              "text-lg font-semibold text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            )}
            to="/"
          >
            <LogoThemed
              titleClassName={classNames({
                "lg:hidden": service.sidebarCollapsed,
              })}
            />
          </Link>
          <button
            className="rounded-lg lg:hidden rounded-lg focus:outline-none focus:shadow-outline"
            onClick={(e) => {
              e.stopPropagation();
              service.sidebarOpened = !service.sidebarOpened;
            }}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {!service.sidebarOpened && (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              )}
              {service.sidebarOpened && (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              )}
            </svg>
          </button>
        </div>
        <nav
          className={classNames(
            "flex-grow lg:block pb-4 lg:pb-0 lg:overflow-y-auto",
            {
              block: service.sidebarOpened,
              hidden: !service.sidebarOpened,
              "px-4": !service.sidebarCollapsed,
              "px-2": service.sidebarCollapsed,
            }
          )}
        >
          <MenuItems />
        </nav>
      </div>
    </div>
  );
});

const TopMenu: React.FC = observer(() => {
  const service = React.useContext(LayoutService);
  return (
    <div className="w-full antialiased bg-gray-100 dark-mode:bg-gray-900 no-print mb-3 py-2 px-2">
      <div className="w-full text-gray-700 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div
            onClick={() =>
              (service.sidebarCollapsed = !service.sidebarCollapsed)
            }
            className="px-3 py-2 cursor-pointer text-sm font-semibold rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            <i className="fas fa-bars"></i>
          </div>
          <div>
            {service.breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <span className="text-sm px-2 py-2 text-gray-600">
                  <i className="fa fa-angle-right"></i>
                </span>
                {breadcrumb.url ? (
                  <span className="px-2 py-2 text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <Link to={breadcrumb.url}>{breadcrumb.name}</Link>
                  </span>
                ) : (
                  <span className="px-2 py-2 text-sm text-gray-600">
                    {breadcrumb.name}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <nav className="flex flex-row items-center justify-end">
          <NavbarCollect className="px-3 py-2 cursor-pointer text-sm font-semibold rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" />
          <NavbarPrint className="px-3 py-2 cursor-pointer text-sm font-semibold rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" />
          <NavbarUser className="px-3 py-2 cursor-pointer text-sm font-semibold rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" />
        </nav>
      </div>
    </div>
  );
});

export const AppLayout: React.FC = observer(({ children }) => {
  const service = React.useContext(LayoutService);
  return (
    <div className="min-h-screen">
      <div className="lg:flex">
        <SideMenu />
        <div className="flex-1">
          <TopMenu />
          <div className="container">{children}</div>
          {service.footer && (
            <div className="text-gray-600 dark-mode:text-gray-300 text-center text-xs pb-2 pt-3 pl-2 pr-2 no-print">
              Designed & implemented by{" "}
              <a className="link" href="https://github.com/makamekm">
                github.com/makamekm
              </a>{" "}
              in 2020
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        :global(body) {
          max-height: ${service.scrollable ? "unset" : "100vh"};
          overflow-y: ${service.scrollable ? "visible" : "hidden"};
        }
      `}</style>
    </div>
  );
});
