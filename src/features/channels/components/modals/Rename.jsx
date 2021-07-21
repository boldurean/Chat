import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useAPI } from '../../../../services/api.jsx';
import { useLogger } from '../../../../services/logger.jsx';
import { channelsSelectors } from '../../Slice.js';
import { useModal } from './ChannelsModalProvider.jsx';

const Rename = () => {
  const { modal: { channel }, hideModal } = useModal();
  const { t } = useTranslation();
  const channelNames = useSelector(channelsSelectors.getChannelNames);
  const API = useAPI();
  const logger = useLogger();

  const formik = useFormik({
    initialValues: {
      body: channel.name,
    },
    validationSchema: yup.object().shape({
      body: yup
        .string().min(3).max(20)
        .notOneOf(channelNames, t('errors.notOneOf'))
        .trim()
        .required(),
    }),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => API.renameChannel({ id: channel.id, name: values.body })
      .then(hideModal)
      .catch((err) => {
        logger.error(err);
        return err;
      }),
  });

  const inputElementRef = useRef();

  useEffect(() => {
    inputElementRef.current.select();
  }, [formik.isSubmitting]);

  return (
    <Modal show onHide={hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('channels.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="body"
              data-testid="rename-channel"
              ref={inputElementRef}
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.body}
              type="text"
              placeholder="Enter new name"
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback
              type="invalid"
              data-testid="invalid-feedback"
            >
              {formik.errors.body}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="btn btn-secondary mx-2" onClick={hideModal}>
              {t('buttons.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('buttons.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
