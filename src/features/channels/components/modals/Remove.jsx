import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAPI } from '../../../../services/api.jsx';
import { useLogger } from '../../../../services/logger.jsx';
import { useModal } from './ChannelsModalProvider.jsx';

const Remove = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hideModal, modal } = useModal();
  const { t } = useTranslation();
  const API = useAPI();
  const logger = useLogger();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { channel } = modal;
    setIsSubmitting(true);
    try {
      await API.removeChannel(channel);
      hideModal();
    } catch (err) {
      setIsSubmitting(false);
      logger.error(err);
    }
  };

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
            <Button
              data-testid="remove-button"
              disabled={isSubmitting}
              variant="danger"
              type="submit"
            >
              {t('buttons.remove')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
