import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { login } from '../actions/userActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const renderInput = ({ input, labelContent, id, type, meta, placeholder }) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="invalid-feedback">
          {error}
        </div>
      )
    }
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{labelContent}</label>
      <input
        autoComplete="off"
        type={type}
        className={`form-control${meta.error && meta.touched ? ' is-invalid' : ''}`}
        id={id}
        placeholder={placeholder}
        {...input}
      />
      {renderError(meta)}
    </div>
  )
}

const validate = ({ email, password }) => {
  const errors = {}
  if (!email) {
    errors.email = '請填入Email欄位'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Email格式有誤'
  }
  if (!password) {
    errors.password = '請填入密碼欄位'
  }
  return errors
}

const LoginScreen = (props) => {
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
  const { loading, currentUser, error } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (currentUser) {
      props.history.push(redirect)
    }
  }, [currentUser, props.history, redirect])

  const dispatch = useDispatch()
  const onSubmit = ({ email, password }) => {
    dispatch(login(email, password))
  }

  const renderApiError = (err) => {
    if (typeof err !== 'string') {
      return err.map((e, i) => (<Message type="danger" key={i}>{e}</Message>))
    }
    return <Message type="danger">{err}</Message>
  }

  return (
    <section id="login">
      {error && renderApiError(error)}
      <div className="container">
        <h1>登入</h1>
        {loading && <Spinner />}
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field name="email" component={renderInput} labelContent="Email" id="email" type="email" placeholder="請輸入Email" />
          <Field name="password" component={renderInput} labelContent="密碼" id="password" type="password" placeholder="請輸入密碼" />
          <button type="submit" className="btn btn-primary">登入</button>
          <span>沒有會員?</span><Link to={`/register?redirect=${redirect}`} className="btn btn-link">註冊</Link>
        </form>
      </div>
    </section >
  )
}

export default reduxForm({
  form: 'login',
  validate
})(LoginScreen)