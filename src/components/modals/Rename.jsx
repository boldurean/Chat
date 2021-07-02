import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import socket from '../../client/socket.js';

const Rename = (props) => {
  const { modal, hideModal } = props;
  const { channels } = useSelector((state) => state);
  const existingChannelNames = channels.map((c) => c.name);
  const { channel } = modal;
  const formik = useFormik({
    initialValues: {
      body: channel.name,
    },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .notOneOf(existingChannelNames, 'Channel with this name already exists')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const data = { id: channel.id, name: values.body };
      try {
        socket.emit('renameChannel', data, (response) => {
          if (response.status === 'ok') {
            hideModal();
            return;
          }
          setTimeout(() => formik.setSubmitting(false));
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  const refEl = useRef();

  useEffect(() => {
    refEl.current.select();
  }, []);

  return (
    <Modal
      show
      onHide={hideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rename channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="body"
              ref={refEl}
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.body}
              type="text"
              placeholder="Enter email"
              disabled={formik.isSubmitting}
            />
            <Form.Text className="text-muted">
              Please enter channel name
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {formik.errors.body}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="btn btn-secondary mx-2" onClick={hideModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            >
              Rename
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
