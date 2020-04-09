/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const DlRowAddress = (props: {
  leftSideClassName?: string;
  rightSideClassName?: string;
}) => (
  <React.Fragment>
    <dl className="row">
      <dt className={`col-sm-3 ${props.leftSideClassName}`}>Adress</dt>
      <dd className={`col-sm-9 ${props.rightSideClassName}`}>
        700 Zemlak Glen
      </dd>
      <dt className={`col-sm-3 ${props.leftSideClassName}`}>City</dt>
      <dd className={`col-sm-9 ${props.rightSideClassName}`}>Jacobiton</dd>
      <dt className={`col-sm-3 ${props.leftSideClassName}`}>State</dt>
      <dd className={`col-sm-9 ${props.rightSideClassName}`}>
        <a href="#">West Virginia</a>
      </dd>
      <dt className={`col-sm-3 ${props.leftSideClassName}`}>ZIP</dt>
      <dd className={`col-sm-9 ${props.rightSideClassName}`}>87032</dd>
    </dl>
  </React.Fragment>
);

DlRowAddress.defaultProps = {
  leftSideClassName: "",
  rightSideClassName: "",
};

export { DlRowAddress };
