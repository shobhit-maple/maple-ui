import React from "react";
import "./CustomModal.css";
import {Button, Modal} from "react-bootstrap";

const CustomModal = ({enable, modalBody, closeAction, header, primaryBtnLabel, primaryBtnAction}) => {
  return (
      <Modal show={enable} onHide={closeAction} dialogClassName="custom-modal-container">
        <Modal.Header closeButton>
          <Modal.Title>
            <span  className="custom-modal-header">
              {header}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          {modalBody}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAction}>
            Close
          </Button>
          <Button variant="primary" onClick={primaryBtnAction}>
            {primaryBtnLabel}
          </Button>
        </Modal.Footer>
      </Modal>
  )
};

export default CustomModal;