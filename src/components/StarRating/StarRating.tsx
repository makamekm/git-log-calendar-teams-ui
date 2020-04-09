/* eslint-disable no-script-url */
import React from "react";
import classNames from "classnames";
import classes from "./StarRating.scss";

export const StarRating = (props: {
  className: string;
  max: number;
  at: number;
  starColor: string;
  onSelect: (index: number) => void;
}) => {
  const {
    className,
    max: maxStars,
    at: currentStars,
    starColor,
    onSelect,
    ...otherProps
  } = props;

  const starRatingClass = classNames(classes.starRating, className);

  const isInterctive = !!onSelect;
  const StartElement = isInterctive ? "a" : "i";

  return (
    <div className={starRatingClass} {...otherProps}>
      {(() => {
        const stars = [];

        for (let i = 1; i <= maxStars; i++) {
          const starProps = {
            key: i,
            className: classNames("fa fa-fw", {
              "fa-star": i <= currentStars,
              "fa-star-o": i > currentStars,
              [`text-${starColor}`]: i <= currentStars,
            }),
            onClick: () => isInterctive && onSelect(i),
          };

          if (isInterctive) {
            starProps["href"] = "javascript:;";
          }

          stars.push(<StartElement {...starProps} key={i}></StartElement>);
        }

        return stars;
      })()}
    </div>
  );
};

StarRating.defaultProps = {
  max: 5,
  at: 0,
  starColor: "warning",
};
