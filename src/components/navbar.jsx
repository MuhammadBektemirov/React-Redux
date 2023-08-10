import { Link, useNavigate } from "react-router-dom"
import { logo } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { removeItem } from "../helpers/persistance-storage"
import { logoutUser } from "../slice/auth"

const Navbar = () => {
    const { loggedIn, user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutUser())
        removeItem('token')
        navigate('/login')
    }

    return (
        <div className="container py-3" >
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <Link to={'/'}>
                    <img src={logo} alt="logo" height={50} />
                </Link>
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    {
                        loggedIn ? (
                            <>
                                <p className="me-3 py-2 link-body-emphasis text-decoration-none m-0">{user.username}</p>
                                <Link to={'/create-article'} className="me-3 py-2 link-body-emphasis text-decoration-none">
                                    Create article
                                </Link>
                                <button className="btn btn-outline-danger" onClick={logoutHandler}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to={'/login'} className="me-3 py-2 link-body-emphasis text-decoration-none">
                                    Login
                                </Link>
                                <Link to={'/register'} className="me-3 py-2 link-body-emphasis text-decoration-none">
                                    Register
                                </Link>
                            </>
                        )
                    }
                </nav>
            </div>
        </div>

    )
}

export default Navbar