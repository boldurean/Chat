import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Card, Container, Form, Row,
} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import routes from '../routes.js';
import { useAuth } from '../services/auth.jsx';
import { useLogger } from '../services/logger.jsx';
import logo from '../img/login.jpg';

const LoginPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const inputRef = useRef();
  const logger = useLogger();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        await auth.logIn(values);
        const { from } = location.state || { from: { pathname: routes.chatPage } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        logger.error(err);
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row bsPrefix="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center rounded-circle justify-content-center">
                <img className="rounded-circle h-auto" src={logo} alt="signin logo" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('texts.login')}</h1>
                <FloatingLabel
                  controlId="floatingInput"
                  label={t('forms.nickname')}
                  className="mb-3"
                >
                  <Form.Control
                    name="username"
                    ref={inputRef}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder={t('forms.nickname')}
                    isInvalid={authFailed}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-4"
                  controlId="floatingPassword"
                  label={t('forms.password')}
                >
                  <Form.Control
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type="password"
                    placeholder={t('forms.password')}
                    isInvalid={authFailed}
                  />
                  {authFailed && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('errors.auth')}
                  </Form.Control.Feedback>
                  )}
                </FloatingLabel>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">
                  {t('buttons.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('texts.withoutAccount')}
                  {' '}
                </span>
                <Link to="signup">{t('texts.register')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default LoginPage;
