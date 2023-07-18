import { useState } from 'react'
import { Input } from '../ui'
import { logo } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth'
import AuthService from '../service/auth'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.auth)

  const registerUserHandler = async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = { username: name, email, password }
    try {
      const response = await AuthService.userRegister(user)
      dispatch(signUserSuccess(response.user))
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }


  return (
    <div>
      <form className="w-25 container text-center">
        <img className="mb-4" src={logo} alt="logo" height="72" />
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <Input label={'Username'} state={name} setState={setName} />
        <Input label={'Email address'} state={email} setState={setEmail} />
        <Input label={'Password'} type={'password'} state={password} setState={setPassword} />
        <button className="btn btn-primary w-100 py-2" type="submit" disabled={isLoading} onClick={registerUserHandler}>
          {isLoading ? 'loading...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register