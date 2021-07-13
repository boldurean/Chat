import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Card, Container, Form, Row,
} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../services/auth/useAuth.js';
import rollbar from '../services/logger/Rollbar.js';
import routes from '../services/api/routes.js';
import logo from '../img/register.jpg';

const SignupPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [userExisting, setUserExisting] = useState(false);
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(3, t('errors.fromTo', { min: 3, max: 20 }))
        .max(20, t('errors.fromTo', { min: 3, max: 20 }))
        .required(t('errors.required')),
      password: yup
        .string()
        .min(6, t('errors.from', { min: 6 }))
        .required(t('errors.required')),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], t('errors.matchPassword'))
        .required(t('errors.required')),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      setUserExisting(false);
      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        if (err.isAxiosError && err.response.status === 409) {
          setUserExisting(true);
          formik.errors.passwordConfirmation = t('errors.userExists');
          rollbar.error(err);
          console.error(err);
          return;
        }
        rollbar.error(err);
        console.error(err);
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container fluid className="h-100">
      <Row bsPrefix="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={logo} alt="signup logo" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('texts.register')}</h1>
                <FloatingLabel
                  controlId="floatingInput"
                  label={t('forms.username')}
                  className="mb-3"
                >
                  <Form.Control
                    name="username"
                    ref={inputRef}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder={t('forms.username')}
                    isInvalid={!!formik.errors.username || authFailed || userExisting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  className="mb-4"
                  controlId="floatingPassword1"
                  label={t('forms.password')}
                >
                  <Form.Control
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type="password"
                    placeholder={t('forms.password')}
                    isInvalid={!!formik.errors.password || authFailed || userExisting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  className="mb-4"
                  controlId="floatingPassword2"
                  label={t('forms.passwordConfirmation')}
                >
                  <Form.Control
                    name="passwordConfirmation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                    type="password"
                    placeholder={t('forms.passwordConfirmation')}
                    isInvalid={!!formik.errors.passwordConfirmation || authFailed || userExisting}
                  />
                  {formik.errors.passwordConfirmation && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.passwordConfirmation}
                  </Form.Control.Feedback>
                  )}
                </FloatingLabel>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">
                  {t('buttons.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default SignupPage;