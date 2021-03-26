import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { register } from '../actions/userActions'
import { USER_REGISTER_RESET } from '../constants/userConstants'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const renderInput = ({ input, meta, labelContent, id, type, placeholder }) => {
  const renderError = ({ touched, error }) => {
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

const validate = ({ name, email, password, confirmPassword }) => {
  const errors = {}
  if (!name) errors.name = '姓名欄位不可空白'
  if (!email) {
    errors.email = 'Email欄位不可空白'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Email格式有誤'
  }
  if (!password) {
    errors.password = '密碼欄位不可空白'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = '兩次密碼不相符'
  }
  return errors
}

const RegisterScreen = (props) => {
  const dispatch = useDispatch()
  const onSubmit = ({ name, email, phone, password, confirmPassword }) => {
    dispatch(register({ name, email, phone, password, confirmPassword }))
  }

  const { loading, success, error } = useSelector(state => state.userRegister)
  useEffect(() => {
    if (success) {
      if (props.location.state && props.location.state.from) {
        props.history.replace(props.location.state.from)
      } else {
        props.history.replace('/')
      }
      dispatch({ type: USER_REGISTER_RESET })
    }
  }, [success, dispatch, props.history, props.location.state])

  const renderApiError = (err) => {
    if (typeof err !== 'string') {
      return err.map((e, i) => (<Message key={i} type="danger">{e}</Message>))
    }
    return <Message type="danger">{err}</Message>
  }

  return (
    <section id="register">
      {error && renderApiError(error)}
      <div className="container">
        <h1>註冊</h1>
        {loading && <Spinner />}
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <span>*必填欄位</span>
          <Field name="name" component={renderInput} labelContent="*姓名" id="name" type="text" placeholder="請輸入姓名" />
          <Field name="email" component={renderInput} labelContent="*Email" id="email" type="email" placeholder="請輸入Email" />
          <Field name="phone" component={renderInput} labelContent="聯絡電話" id="phone" type="text" placeholder="請輸入聯絡電話" />
          <Field name="password" component={renderInput} labelContent="*密碼" id="password" type="password" placeholder="請輸入密碼" />
          <Field name="confirmPassword" component={renderInput} labelContent="*請再輸入一次密碼" id="confirmPassword" type="password" placeholder="請輸入請再輸入一次密碼" />
          <button type="submit" className="btn btn-primary">註冊</button>
          <span>已經有帳號?</span>
          <Link
            to={{
              pathname: '/login',
              state: props.location.state ? props.location.state : null
            }}
            className="btn btn-link"
          >登入
          </Link>
        </form>
      </div>
    </section >
  )
}

export default reduxForm({
  form: 'register',
  validate
})(RegisterScreen)