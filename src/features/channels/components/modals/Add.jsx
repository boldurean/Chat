import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useAPI } from '../../../../services/api.jsx';
import { useLogger } from '../../../../services/logger.jsx';
import { actions, channelsSelectors } from '../../Slice.js';
import { useModal } from './ChannelsModalProvider.jsx';

const Add = () => {
  const { hideModal } = useModal();
  const API = useAPI();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const logger = useLogger();
  const existingChannelNames = useSelector(channelsSelectors.getChannelNames);
  const { switchChannel } = actions;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .min(3, t('errors.range', { min: 3, max: 20 }))
        .max(20, t('errors.range', { min: 3, max: 20 }))
        .notOneOf(existingChannelNames, t('errors.notOneOf'))
        .trim()
        .required(),
    }),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => {
      try {
        const { id } = await API.newChannel({ name: values.body });
        hideModal();
        return dispatch(switchChannel(id));
      } catch (err) {
        logger.error(err);
        return err;
      }
    },
  });

  const inputElementRef = useRef();

  useEffect(() => {
    inputElementRef.current.focus();
  }, []);

  useEffect(() => {
    inputElementRef.current.select();
  }, [formik.isSubmitting]);

  return (
    <Modal show onHide={hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('channels.addNew')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="body"
              data-testid="add-channel"
              ref={inputElementRef}
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.body}
              disabled={formik.isSubmitting}
              type="text"
              placeholder={t('channels.channelName')}
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

export default Add;
