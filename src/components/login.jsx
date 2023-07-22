import { Input } from '../ui'
import { logo } from "../constants"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth'
import AuthService from '../service/auth'
import { ValidationError } from './'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isLoading, loggedIn } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const submitLoginHandler = async (e) => {
    e.preventDefault(),
      dispatch(signUserStart())
    const user = { email, password }
    try {
      const response = await AuthService.userLogin(user)
      console.log(response)
      console.log(user)
      dispatch(signUserSuccess(response.user))
      navigate('/')
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }

  useEffect(() => {
    if(loggedIn){
      navigate('/')
    }
  }, [loggedIn])

  return (
    <div>
      <form className="w-25 container text-center">
        <img className="mb-4" src={logo} alt="logo" height="72" />
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>
        <ValidationError />

        <Input label={'Email address'} state={email} setState={setEmail} />
        <Input label={'Password'} type={'password'} state={password} setState={setPassword} />
        <button className="btn btn-primary w-100 py-2" type="submit" onClick={submitLoginHandler} disabled={isLoading}>
          {isLoading ? 'loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login