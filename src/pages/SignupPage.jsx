import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Card, Container, Form, Row,
} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { routes } from '../services/api.jsx';
import { useAuth } from '../services/auth.jsx';
import logo from '../img/register.jpg';

const SignupPage = () => {
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
        .min(3, t('errors.range', { min: 3, max: 20 }))
        .max(20, t('errors.range', { min: 3, max: 20 }))
        .required(),
      password: yup
        .string()
        .min(6, t('errors.minLength', { min: 6 }))
        .required(),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], t('errors.matchPassword'))
        .required(),
    }),
    onSubmit: async (values) => {
      setUserExisting(false);
      try {
        await auth.signUp(values);
        const { from } = location.state || { from: { pathname: routes.chatPath } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setUserExisting(true);
          formik.errors.passwordConfirmation = t('errors.userExists');
          return;
        }
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
                    autocomplete="username"
                    isInvalid={!!formik.errors.username || userExisting}
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
                    autocomplete="new-password"
                    isInvalid={!!formik.errors.password || userExisting}
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
                    autocomoplete="new-password"
                    isInvalid={!!formik.errors.passwordConfirmation || userExisting}
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
