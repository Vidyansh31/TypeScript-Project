import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext'

const ProtectedRoutes = () => {
    const auth = useAuth();
    const isAuth = auth.isLoggedIn();
    return (
      isAuth ? <Outlet /> : <Navigate to = "/" />
    )
}

export default ProtectedRoutes