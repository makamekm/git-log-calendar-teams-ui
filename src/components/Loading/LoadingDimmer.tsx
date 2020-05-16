import React from "react";
import classNames from "classnames";
import { useLocalStore, observer } from "mobx-react";

const Dimmer = ({
  text,
  hideDimmer,
}: {
  text?: string;
  hideDimmer?: boolean;
}) => {
  const reload = React.useCallback(() => {
    window.location.reload();
  }, []);
  return (
    <div className="initial-loader-wrap">
      <div className="initial-loader">
        <div className="initial-loader__row">- GIT STATS MANAGER -</div>
        {!hideDimmer && (
          <div className="initial-loader__row">
            <svg
              version="1.1"
              id="loader-circle"
              x="0px"
              y="0px"
              width="50px"
              height="50px"
              viewBox="0 0 40 40"
              enableBackground="new 0 0 40 40"
              xmlSpace="preserve"
            >
              <g>
                <path
                  fill="transparent"
                  d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                />
                <path
                  fill="currentColor"
                  d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"
                ></path>
              </g>
            </svg>
          </div>
        )}
        <div
          className={classNames("initial-loader__row", {
            big: hideDimmer,
          })}
        >
          {text || "The application is loading..."}
        </div>
        <div className="initial-loader__subrow" onClick={reload}>
          FORCE RELOAD
        </div>
      </div>
    </div>
  );
};

export const LoadingDimmer: React.FC<{
  show?: boolean;
  hideDimmer?: boolean;
  text?: string;
}> = observer(({ show, text, hideDimmer, children }) => {
  const [staticState] = React.useState({
    timeout: null,
    prevState: false,
  });

  const store = useLocalStore(() => ({
    show: false,
  }));

  React.useEffect(() => {
    if (staticState.prevState === show) {
      return;
    }
    staticState.prevState = show;

    if (show) {
      clearTimeout(staticState.timeout);
      store.show = true;
    } else {
      clearTimeout(staticState.timeout);
      document.body.classList.add("loaded");
      staticState.timeout = setTimeout(() => {
        document.body.classList.remove("loaded");
        store.show = false;
      }, 200);
    }
  }, [show, staticState, store]);

  return (
    <>
      {children}
      {store.show && <Dimmer text={text} hideDimmer={hideDimmer} />}
    </>
  );
});
