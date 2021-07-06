import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAPI from '../../../hooks/useAPI.js';

const Remove = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hideModal, modal } = props;
  const { t } = useTranslation();
  const API = useAPI();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { channel } = modal;
    setIsSubmitting(true);
    try {
      API.removeChannel(channel);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => setIsSubmitting(false), 2000);
    return () => clearTimeout(timerId);
  }, [isSubmitting]);

  return (
    <Modal show onHide={hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('channels.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('channels.removeConfirmation')}</p>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-end">
            <Button disabled={isSubmitting} className="btn btn-secondary mx-2" onClick={hideModal}>
              {t('buttons.cancel')}
            </Button>
            <Button disabled={isSubmitting} variant="danger" type="submit">
              {t('buttons.remove')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
// END
