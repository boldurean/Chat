import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, ButtonGroup, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useAPI from '../../hooks/useAPI.js';

const MessagesField = () => {
  const API = useAPI();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const { currentChannelId } = useSelector((state) => state.channels);
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const { resetForm } = formik;
      try {
        API.newMessage({ text: values.body, channelId: currentChannelId, username }, resetForm);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  useEffect(() => {
    inputRef.current.focus();
    const timer = setTimeout(() => formik.setSubmitting(false), 2000);
    return () => clearTimeout(timer);
  }, [formik.isSubmitting]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            required
            ref={inputRef}
            name="body"
            disabled={formik.isSubmitting}
            value={formik.values.body}
            onChange={formik.handleChange}
            placeholder="Message"
          />
          <InputGroup.Text>
            <ButtonGroup size="sm">
              <Button
                disabled={formik.isSubmitting || !formik.dirty}
                type="submit"
                bsPrefix="btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </ButtonGroup>
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesField;
