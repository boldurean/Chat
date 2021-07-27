import React, { useEffect, useRef } from 'react';
import {
  Button, ButtonGroup, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useAPI } from '../../../services/api.jsx';
import { useAuth } from '../../../services/auth.jsx';
import { useLogger } from '../../../services/logger.jsx';
import { selectors } from '../../channels';

const MessageField = () => {
  const API = useAPI();
  const auth = useAuth();
  const currentChannelId = useSelector(selectors.getCurrentChannelId);
  const { t } = useTranslation();
  const inputElementRef = useRef();
  const logger = useLogger();

  const { user: { username } } = auth;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      try {
        await API.newMessage({ text: values.body, channelId: currentChannelId, username });
        formik.resetForm();
        inputElementRef.current.focus();
      } catch (err) {
        formik.setSubmitting(false);
        logger.error(err);
      }
    },
  });

  useEffect(() => {
    inputElementRef.current.focus();
  }, [currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            required
            autoComplete="off"
            data-testid="new-message"
            ref={inputElementRef}
            name="body"
            disabled={formik.isSubmitting}
            value={formik.values.body}
            onChange={formik.handleChange}
            placeholder={t('messages.enterMessage')}
          />
          <InputGroup.Text>
            <ButtonGroup size="sm">
              <Button
                disabled={formik.isSubmitting || !formik.dirty}
                type="submit"
                bsPrefix="btn btn-group-vertical"
              >
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{t('buttons.send')}</span>
              </Button>
            </ButtonGroup>
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageField;
