import { Navigate } from 'react-router'
import Loading from '../components/shared/Loading/Loading'
import useRole from '../hooks/useRole'

const PremiumRoutes = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  console.log('I was here, in SellerRoute')
  if (isRoleLoading) return <Loading />
  if (role === 'premiumUser') return children
  return <Navigate to='/' replace='true' />
}

export default PremiumRoutes