import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import socket from '../../client/socket.js';

const Remove = (props) => {
  const { hideModal, modal } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { channel } = modal;
    try {
      setIsSubmitting(true);
      socket.emit('removeChannel', channel, (response) => {
        if (response.status === 'ok') {
          hideModal();
        }
      });
      setTimeout(() => setIsSubmitting(false));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <Modal
      show
      onHide={hideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to remove this channel?</p>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-end">
            <Button
              className="btn btn-secondary mx-2"
              onClick={hideModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="submit"
            >
              Remove
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
// END
