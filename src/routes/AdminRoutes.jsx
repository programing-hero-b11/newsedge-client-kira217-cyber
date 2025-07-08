import { Navigate, useLocation } from 'react-router'
import useRole from '../hooks/useRole'
import Loading from '../components/shared/Loading/Loading'


const AdminRoutes = ({ children }) => {
  const [role, isRoleLoading] = useRole()
  const location = useLocation()
  console.log(location)
  console.log('I was here, in Admin route')
  if (isRoleLoading) return <Loading />
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoutes