import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { login } from '../actions/userActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const renderInput = ({ input, labelContent, id, type, meta, placeholder, selector }) => {
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
        className={`login-${selector} form-control${meta.error && meta.touched ? ' is-invalid' : ''}`}
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
  const { loading, currentUser, error } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (currentUser) {
      if (props.location.state && props.location.state.from) {
        props.history.replace(props.location.state.from)
      } else {
        props.history.replace('/')
      }
    }
  }, [currentUser, props.history, props.location])

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
        {loading && <Spinner />}
        <div className="login-wrapper">
          <img src="https://i.imgur.com/6uM0AVv.jpg" alt="" className="login-img" />
          <form onSubmit={props.handleSubmit(onSubmit)} className="login-form">
            <h3 className="login-title">會員登入</h3>
            <Field name="email" component={renderInput} labelContent="Email" id="email" type="email" selector="email" placeholder="請輸入Email" />
            <Field name="password" component={renderInput} labelContent="密碼" id="password" type="password" selector="password" placeholder="請輸入密碼" />
            <button type="submit" className="login-btn default-btn btn">登入</button>
            <div className="login-reminder">
              <span>沒有會員? </span>
              <Link
                to={{
                  pathname: '/register',
                  state: props.location.state ? props.location.state : null
                }}
              >註冊</Link>
            </div>
          </form>
        </div>
      </div>
    </section >
  )
}

export default reduxForm({
  form: 'login',
  validate
})(LoginScreen)