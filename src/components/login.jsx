import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import cn from 'classnames';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .min(3, 'Name must be 3 characters or more')
        .max(25, 'Name must be less than 25 characters')
        .required('Required'),
      password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    }),
    onSubmit: (values) => console.log(values),
  });

  const nameClasses = cn('form-control', {
    'is-invalid': !!(formik.errors.name && formik.touched.name),
    'is-valid': formik.touched.name,
  });
  const passwordClasses = cn('form-control', {
    'is-invalid': !!(formik.errors.password && formik.touched.password),
    'is-valid': formik.touched.password,
  });
  const valid = <div className="valid-feedback">Looks good!</div>;
  const invalid = (error) => <div className="invalid-feedback">{error}</div>;

  return (
    <div className="row justify-content-center d-flex">
      <div className="col-10">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              id="name"
              type="text"
              placeholder="name"
              className={nameClasses}
            />
            {!(formik.errors.name && formik.touched.name) ? valid : null}
            {invalid(formik.errors.name)}
          </div>
          <div className="form-group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              id="password"
              name="password"
              placeholder="password"
              type="password"
              className={passwordClasses}
            />
            {!(formik.errors.password && formik.touched.password) ? valid : null}
            {invalid(formik.errors.password)}
          </div>
          <button type="submit" disabled={!formik.isValid || !formik.dirty} className="btn btn-primary">SignIn</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
