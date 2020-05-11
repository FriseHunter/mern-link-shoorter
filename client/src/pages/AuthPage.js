import React, {useState, useEffect, useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: "", password: ""
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    }catch (e) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
      message(data.message)
    }catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten Link.</h1>
        <div className="card ">
          <div className="card-content white-text">
            <span className="card-title deep-orange-text" style={{padding: "15px 0 30px"}}><b>Login</b></span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  className="orange-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                  <label htmlFor="email" className="orange-text">E-mail</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  className="orange-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password" className="orange-text">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action" style={{textAlign: "center"}}>
            <button
              className="btn orange darken-4 push-m7"
              style={{marginRight: "10px"}}
              onClick={loginHandler}
              disabled={loading}
            >SignIn</button>
            <button
              className="btn grey lighten-5 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}