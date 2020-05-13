import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { HeaderPanel } from "~/app/HeaderPanel";
import { useLayoutConfig } from "~/components/Layout/LayoutService";

export const Error404 = () => {
  let { pathname } = useLocation();
  useLayoutConfig({});
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <HeaderPanel
        title="- ERROR 404 -"
        text={
          <>
            <div>Sorry, have you been lost?</div>
            <div className="text-sm mt-3">You are at {pathname}</div>
          </>
        }
      />
      <Link
        className="py-2 px-2 text-sm font-semibold text-gray-700 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        to="/"
      >
        <i className="fa fa-home mr-2"></i>Back to Home
      </Link>
    </div>
  );
};
