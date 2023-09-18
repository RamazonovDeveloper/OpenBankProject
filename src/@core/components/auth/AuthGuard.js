// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      console.log('router ', router)
      console.log('auth ', auth)
      if (!router.isReady) {
        return
      }
      if (
        !window.localStorage.getItem('companyInfo') &&
        router.pathname !== '/register' &&
        !window.localStorage.getItem('access_token')
      ) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  // if (auth.loading || auth.user === null) {
  //   return fallback
  // }

  return <>{children}</>
}

export default AuthGuard
