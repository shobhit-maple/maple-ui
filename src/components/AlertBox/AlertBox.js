import React from "react";
import "./AlertBox.css";
import {Alert} from "react-bootstrap";

const AlertBox = ({error, closeAction, variant}) => {
  return (
      error &&
      <div className="error-box-container">
        <Alert className="error-box"
               key={variant}
               variant={variant}
               onClose={closeAction}
               dismissible>
          <div className="error-message">{error.message}</div>
          {error.details && <div>{error.details}</div>}
        </Alert>
      </div>
  )
};

export default AlertBox;