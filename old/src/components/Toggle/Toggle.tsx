import React from "react";
import classNames from "classnames";

export const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
}) => {
  return (
    <div className="inline-flex justify-center items-center focus-within:shadow-outline p-1 rounded-full">
      <div
        className={classNames(
          "relative rounded-full w-12 h-6 transition duration-200 ease-linear",
          {
            "bg-green-400 dark-mode:border-green-200": checked,
            "bg-gray-400 dark-mode:border-gray-200": !checked,
          }
        )}
      >
        <label
          className={classNames(
            "absolute left-0 bg-white dark-mode:bg-gray-700 border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear pointer-events-none",
            {
              "translate-x-full border-green-400 dark-mode:border-green-200": checked,
              "translate-x-0 border-gray-400 dark-mode:border-gray-200": !checked,
            }
          )}
        ></label>
        <input
          type="checkbox"
          id="toggle"
          name="toggle"
          className="appearance-none w-full h-full active:outline-none focus:outline-none cursor-pointer"
          checked={!!checked}
          onChange={() => {
            onChange && onChange(!checked);
          }}
        />
      </div>
    </div>
  );
};
