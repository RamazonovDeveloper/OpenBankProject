// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'

export const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else return '/home'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  console.log('index router ', router)

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (localStorage.getItem(authConfig.storageTokenKeyName)) {
      // const homeRoute = getHomeRoute(auth.user.role)
      let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

      // Redirect user to Home URL
      router.replace(`/${companyInfo.slug}/home`)
    } else {
      router.replace('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
