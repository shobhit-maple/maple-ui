import React from "react";
import "./Page.css";

const Page = ({header, actions, content}) => {
  return (
      <div className="page-container">
        <div>
          <span className="page-header">
          {header}&nbsp;
            <div className="page-actions-container">
              {actions}
            </div>
        </span>
        </div>
        <div className="page-content-container">
          {content}
        </div>
      </div>
  )
};

export default Page;