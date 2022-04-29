import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {
  const { loggedIn, loggedAuth }  = useAuthStatus()


  if (loggedAuth) {
    return "no"
  }
  return loggedIn ? <Outlet /> : <Navigate to='/signin' />
  }

export default PrivateRoute