import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import useAPI from '../../../hooks/useAPI.js';
import rollbar from '../../../Rollbar.js';
import { actions } from '../../../slices';

const Add = (props) => {
  const { hideModal } = props;
  const API = useAPI();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channelsList } = useSelector((state) => state.channels);
  const existingChannelNames = channelsList.map((c) => c.name);
  const { switchChannel } = actions;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .min(3, t('errors.fromTo', { min: 3, max: 20 }))
        .max(20, t('errors.fromTo', { min: 3, max: 20 }))
        .notOneOf(existingChannelNames, t('errors.notOneOf'))
        .required(t('errors.required')),
    }),

    onSubmit: (values) => API.newChannel({ name: values.body })
      .then(({ id }) => {
        dispatch(switchChannel(id));
        hideModal();
      }).catch((err) => {
        console.error(err);
        rollbar.error(err);
        return err;
      }),
  });

  const refEl = useRef();

  useEffect(() => {
    refEl.current.focus();
    const timer = setTimeout(() => formik.setSubmitting(false), 2000);
    return () => clearTimeout(timer);
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
              ref={refEl}
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.body}
              disabled={formik.isSubmitting}
              type="text"
              placeholder={t('channels.channelName')}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.body}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="btn btn-secondary mx-2" onClick={hideModal}>
              {t('buttons.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
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
