import React from "react";
import { Link } from "react-router-dom";
import { useLocalStore, observer } from "mobx-react";
import { AuthService } from "./AuthService";
import { useLayoutConfig } from "~/components/Layout/LayoutService";
import { HeaderPanel } from "~/components/Blocks/HeaderPanel";
import { FooterText } from "../Layout/FooterText";

export const AuthScreen = observer(() => {
  const store = useLocalStore(() => ({
    password: "",
  }));
  const authService = React.useContext(AuthService);

  const onPasswordChange = React.useCallback(
    (e) => {
      store.password = e.currentTarget.value;
    },
    [store]
  );

  const onSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      await authService.authorize(store.password);
      authService.redirectToFrom();
    },
    [store, authService]
  );
  useLayoutConfig({
    pageTitle: "Login",
    sidebar: window.isElectron,
    topbar: false,
    footer: false,
    breadcrumbs: [
      {
        name: "Login",
      },
    ],
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-screen">
      <HeaderPanel
        title="- LOGIN -"
        text={
          <>
            <div>Your Session is Blocked</div>
            <div className="text-sm mt-3">
              Please provide the correct password to unlock the session
            </div>
          </>
        }
      />

      <form className="w-full md:w-3/5 lg:w-2/5 mb-6 mt-6" onSubmit={onSubmit}>
        <div>Password</div>
        <input
          autoComplete={"new-password"}
          className="ellipsis no-print text-base shadow-sm appearance-none border rounded py-2 px-3 mt-3 w-full text-grey-darker leading-none focus:outline-none  dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800"
          value={store.password}
          onChange={onPasswordChange}
          type="password"
          name="password"
          placeholder="Enter the password to continue..."
        />
        <button
          type="submit"
          className={
            "text-base w-full mt-6 font-semibold py-2 px-3 rounded-lg bg-blue-500 active:bg-blue-700 text-white hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          }
        >
          Unlock
        </button>
      </form>

      {!!window.isElectron && (
        <div className="flex mt-3">
          <Link to="/logs" className="ml-auto text-decoration-none">
            <i className="fa fa-file-text-o mr-2"></i> Open Logs
          </Link>
        </div>
      )}

      <div className="text-gray-600 dark-mode:text-gray-300 text-center text-xs pb-2 pt-5 mx-auto mt-6">
        <FooterText />
      </div>
    </div>
  );
});
